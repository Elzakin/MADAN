"use strict";
const assert = require("node:assert/strict");
const Six = require("../../.obsidian/plugins/madan-wuerfel/six-engine.js");

// Unabhängige Aufzählung aller Einzelwürfe statt der Potenzformel des Rechners.
for (let dice = 0; dice <= 6; dice++) {
  let total = 0n;
  let success = 0n;
  function enumerate(left, won) {
    if (left === 0) { total++; if (won) success++; return; }
    for (let face = 1; face <= 6; face++) enumerate(left - 1, won || face === 6);
  }
  enumerate(dice, false);
  assert.deepEqual(Six.chance(dice).exact, { total, success, failure: total - success });
}

assert.equal(Six.calculate({ skill: 5, spezialisierung: 5 }).dice, 10);
const example = Six.calculate({ skill: 5, spezialisierung: 5, ausruestung: 2, schwierigkeit: 3, zustaende: -1 });
assert.equal(example.before, 12);
assert.equal(example.penalty, 4);
assert.equal(example.dice, 8);
assert.ok(example.possible);
assert.ok(Math.abs(example.success - 0.7674319606) < 1e-10);
const zero = Six.calculate({ skill: 1, spezialisierung: 1, schwierigkeit: 2 });
assert.equal(zero.possible, false);
assert.equal(zero.dice, 0);
assert.equal(zero.success, 0);
assert.equal(Six.calculate({ skill: 5, spezialisierung: 5, schwierigkeit: 30, zustaende: -30 }).dice, 0);
assert.equal(Six.calculate({ skill: 0, spezialisierung: 0 }).dice, 1);
assert.equal(Six.calculate({ skill: 0, spezialisierung: 0, ausruestung: 1 }).dice, 2);
assert.equal(Six.calculate({ skill: 1, spezialisierung: 5 }).dice, 6);
assert.deepEqual(Six.normalize({ skill: -1, spezialisierung: 999, ausruestung: 999, schwierigkeit: NaN, zustaende: -1 }), {
  variante: "sechser", skill: 1, spezialisierung: 5, ausruestung: 10, schwierigkeit: 0, zustaende: -1
});
assert.equal(Six.normalize().skill, 1);
assert.equal(Six.normalize({ schwierigkeit: 999 }).schwierigkeit, 10);
assert.equal(Six.normalize({ zustaende: 999 }).zustaende, 10);
assert.equal(Six.normalize({ zustaende: -999 }).zustaende, -10);
const buff = Six.calculate({ skill: 5, spezialisierung: 5, ausruestung: 2, schwierigkeit: 3, zustaende: 1 });
assert.equal(buff.dice, 10);
assert.ok(buff.success > example.success);
// Boni und Abzüge werden vor der Begrenzung auf 0 miteinander verrechnet.
assert.equal(Six.calculate({ skill: 1, spezialisierung: 0, schwierigkeit: 2, zustaende: 2 }).dice, 1);
assert.equal(Six.calculate({ skill: 5, spezialisierung: 5, ausruestung: 10, zustaende: 10 }).dice, 30);
for (let dice = 1; dice <= Six.MAX_POOL; dice++) {
  const result = Six.chance(dice);
  assert.ok(result.success > Six.chance(dice - 1).success);
  assert.equal(result.exact.success + result.exact.failure, result.exact.total);
  assert.ok(Math.abs(result.success + result.failure - 1) < 1e-14);
}
assert.throws(() => Six.chance(-1), RangeError);
assert.throws(() => Six.chance(1.5), RangeError);
assert.throws(() => Six.chance(31), RangeError);
console.log("Sechser-Variante: unabhängige Aufzählung, additive Spezialisierung, Buffs/Debuffs, Mindestskill, Nullpool und Grenzen geprüft.");
