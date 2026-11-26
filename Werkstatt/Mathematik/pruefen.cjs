"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Dice = require("../../.obsidian/plugins/madan-wuerfel/engine.js");
const python = JSON.parse(fs.readFileSync(process.argv[2] || 0, "utf8"));
const referenceFaces = {
  basis: [-1, 0, 0, 0, 1, 1],
  viererfolg: [-1, 0, 0, 1, 1, 1],
  meisterschaft: [-1, 0, 0, 0, 1, 2],
  viererfolg_meisterschaft: [-1, 0, 0, 1, 1, 2]
};
for (const [mode, standard] of Object.entries(referenceFaces)) {
  for (let n = 0; n <= 10; n++) {
    const actual = Dice.distribution({ ...Dice.DEFAULT_FACES, standard }, { standard: n });
    const reference = python[mode][n];
    assert.deepEqual(Object.fromEntries(actual.counts.map(row => [row.score, Number(row.count)])), reference.counts);
    assert.equal(actual.total, BigInt(reference.denominator));
  }
}
// Independent enumeration of actual die faces; C is a global absorbing failure.
function enumerate(input) {
  const state = Dice.normalize(input);
  const standard = state.pool - state.fokus;
  const remainingStandard = Math.max(0, standard - state.erschwerung);
  const remainingFocus = Math.max(0, state.fokus - Math.max(0, state.erschwerung - standard));
  const dice = [
    ...Array.from({ length: remainingStandard }, () => state.wertung.standard),
    ...Array.from({ length: remainingFocus }, () => state.wertung.fokus),
    ...Array.from({ length: state.risiko_aktiv ? state.risiko : 0 }, () => state.wertung.risiko)
  ];
  let won = 0n, critical = 0n, total = 0n;
  function visit(index, score, c) {
    if (index === dice.length) {
      total++;
      if (c) critical++;
      else if (score >= (state.modus === "zielwert" ? state.zielwert : 1)) won++;
      return;
    }
    for (const value of dice[index]) visit(index + 1, score + (value === "C" ? 0 : value), c || value === "C");
  }
  visit(0, 0, false);
  return { success: won, critical, failure: total - won - critical, total };
}
for (let pool = 0; pool <= 3; pool++) {
  for (let fokus = 0; fokus <= pool; fokus++) {
    for (let erschwerung = 0; erschwerung <= pool + 1; erschwerung++) {
      for (const modus of ["abzug", "zielwert"]) {
        for (let risiko = 0; risiko <= 2; risiko++) {
          const input = { pool, fokus, erschwerung, modus, zielwert: 2, risiko, risiko_aktiv: true };
          assert.deepEqual(Dice.calculate(input).exact, enumerate(input));
        }
      }
    }
  }
}
assert.deepEqual(Dice.pools({ pool: 8, fokus: 3, erschwerung: 0 }), { standard: 5, fokus: 3, risiko: 0 });
assert.deepEqual(Dice.pools({ pool: 8, fokus: 3, erschwerung: 2, risiko_aktiv: true }), { standard: 3, fokus: 3, risiko: 2 });
assert.deepEqual(Dice.pools({ pool: 8, fokus: 3, erschwerung: 7 }), { standard: 0, fokus: 1, risiko: 0 });
assert.deepEqual(Dice.pools({ pool: 8, fokus: 3, erschwerung: 30, risiko_aktiv: true }), { standard: 0, fokus: 0, risiko: 2 });
assert.equal(Dice.normalize({ pool: 3, fokus: 8 }).fokus, 3);
const allWins = [99, 99, 99, 99, 99, 99];
for (const kind of Dice.KINDS) {
  const input = { pool: 2, fokus: 1, erschwerung: 0, risiko: 1, risiko_aktiv: true, wertung: { standard: allWins, fokus: allWins, risiko: allWins, [kind]: ["C", "C", "C", "C", "C", "C"] } };
  const result = Dice.calculate(input);
  assert.equal(result.success, 0, kind + ': C dominiert auch 198 andere Erfolge');
  assert.equal(result.critical, 1);
}
const riskOnly = Dice.calculate({ pool: 0, erschwerung: 30, risiko_aktiv: true });
assert.equal(riskOnly.counts.risiko, 2);
assert.equal(riskOnly.critical, 11 / 36);
assert.equal(riskOnly.exact.total, 36n);
assert.equal(Dice.calculate({ pool: 0, erschwerung: 30 }).success, 0);
assert.equal(Dice.calculate({ pool: 1, erschwerung: 0, zielwert: 30, modus: "abzug" }).threshold, 1);
const negative = Dice.calculate({ pool: 1, erschwerung: 0, wertung: { standard: [-1, -1, -1, -1, -1, -1] } });
assert.equal(negative.failure, 1);
assert.equal(negative.critical, 0);
const large = Dice.calculate({ pool: 30, fokus: 20, erschwerung: 0, risiko: 10, risiko_aktiv: true });
assert.equal(large.exact.total, 6n ** 40n);
assert.equal(large.exact.critical, 6n ** 40n - (6n ** 30n) * (5n ** 10n));
assert.equal(large.exact.success + large.exact.failure + large.exact.critical, large.exact.total);
const almostCertain = Dice.calculate({ pool: 30, erschwerung: 0, wertung: { standard: [0, 99, 99, 99, 99, 99] } });
assert.equal(almostCertain.exact.failure, 1n);
assert.equal(Dice.percent(almostCertain.success), ">99,99 %", "Fast sichere Chancen werden nicht als garantiert angezeigt.");
assert.equal(Dice.parseFace(" c "), "C");
assert.equal(Dice.parseFace("−2"), -2);
assert.throws(() => Dice.parseFace(""));
assert.throws(() => Dice.parseFace("critical"));
assert.throws(() => Dice.parseFace(0.5));
assert.throws(() => Dice.normalize({ wertung: { standard: [1] } }));
for (const modus of ["abzug", "zielwert"]) {
  const matrix = Dice.table({ pool: 8, fokus: 3, modus, risiko_aktiv: true });
  assert.equal(matrix.rows.length, 10);
  assert.ok(matrix.rows.every(row => row.chances.length === (modus === "abzug" ? 3 : 5)));
}
console.log("Alle vier Referenzwertungen für 0–10 Würfel stimmen exakt mit Python überein.");
console.log("Gemischte Pools unabhängig durchgezählt; globales C, Nettoerfolg, beide Modi, Fokus-Ersatz und geschützte Risikowürfel geprüft.");
console.log("40 Würfel mit BigInt, Eingabevalidierung und Vergleichstabellen geprüft.");
