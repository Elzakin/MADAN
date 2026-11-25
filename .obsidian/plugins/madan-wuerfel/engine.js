"use strict";
const KINDS = Object.freeze(["standard", "fokus", "risiko"]);
const MAX_POOL = 30;
const MAX_RISK = 10;
const MAX_TARGET = 30;
const MAX_FACE = 99;
const DEFAULT_FACES = Object.freeze({
  standard: Object.freeze([-1, 0, 0, 0, 1, 1]),
  fokus: Object.freeze([-1, 0, 0, 0, 1, 2]),
  risiko: Object.freeze(["C", 0, 0, 0, 1, 1])
});
const cache = new Map();
function fraction(numerator, denominator) {
  const value = Number(numerator) / Number(denominator);
  return value === 1 && numerator < denominator ? 1 - Number.EPSILON / 2 : value;
}
function integer(value, fallback, min, max) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(min, Math.trunc(number))) : fallback;
}
function boolean(value) { return value === true || value === 1 || value === "true" || value === "ja"; }
function parseFace(value) {
  if (typeof value === "string") {
    const text = value.trim().replace(/−/g, "-");
    if (text.toUpperCase() === "C") return "C";
    if (!/^[+-]?\d+$/.test(text)) throw new TypeError("Jede Würfelseite benötigt eine ganze Zahl oder C.");
    value = Number(text);
  }
  if (!Number.isSafeInteger(value) || Math.abs(value) > MAX_FACE) throw new RangeError("Erfolge müssen ganze Zahlen von −99 bis 99 oder C sein.");
  return value;
}
function faces(values) {
  if (!Array.isArray(values) || values.length !== 6) throw new TypeError("Für jeden W6 werden genau sechs Seitenwertungen benötigt.");
  return values.map(parseFace);
}
function normalize(input = {}) {
  const pool = integer(input.pool ?? input.fertigkeit ?? 6, 6, 0, MAX_POOL);
  const modus = input.modus ?? "abzug";
  if (modus !== "abzug" && modus !== "zielwert") throw new TypeError("Modus abzug oder zielwert erwartet.");
  return {
    pool,
    fokus: integer(input.fokus ?? 0, 0, 0, pool),
    risiko: integer(input.risiko ?? 2, 2, 0, MAX_RISK),
    risiko_aktiv: boolean(input.risiko_aktiv),
    erschwerung: integer(input.erschwerung ?? 2, 2, 0, MAX_POOL),
    modus,
    zielwert: integer(input.zielwert ?? 2, 2, 1, MAX_TARGET),
    wertung: Object.fromEntries(KINDS.map(kind => [kind, faces(input.wertung?.[kind] ?? DEFAULT_FACES[kind])]))
  };
}
function pools(input) {
  const state = normalize(input);
  const normal = state.pool - state.fokus;
  return {
    standard: Math.max(0, normal - state.erschwerung),
    fokus: Math.max(0, state.fokus - Math.max(0, state.erschwerung - normal)),
    risiko: state.risiko_aktiv ? state.risiko : 0
  };
}
function distribution(profiles, quantities) {
  const values = Object.fromEntries(KINDS.map(kind => [kind, faces(profiles[kind])]));
  const counts = Object.fromEntries(KINDS.map(kind => [kind, quantities[kind] ?? 0]));
  if (KINDS.some(kind => !Number.isInteger(counts[kind]) || counts[kind] < 0 || counts[kind] > (kind === "risiko" ? MAX_RISK : MAX_POOL)) || counts.standard + counts.fokus > MAX_POOL) {
    throw new RangeError("Ungültige Würfelanzahl.");
  }
  const key = JSON.stringify([values, counts]);
  if (cache.has(key)) return cache.get(key);
  let outcomes = new Map([[0, 1n]]);
  let dice = 0;
  for (const kind of KINDS) {
    const weights = new Map();
    for (const value of values[kind]) if (value !== "C") weights.set(value, (weights.get(value) || 0n) + 1n);
    for (let i = 0; i < counts[kind]; i++) {
      const next = new Map();
      for (const [score, count] of outcomes) {
        for (const [value, weight] of weights) next.set(score + value, (next.get(score + value) || 0n) + count * weight);
      }
      outcomes = next;
    }
    dice += counts[kind];
  }
  const total = 6n ** BigInt(dice);
  const nonCritical = [...outcomes.values()].reduce((sum, count) => sum + count, 0n);
  const result = Object.freeze({
    total, nonCritical, critical: total - nonCritical,
    counts: Object.freeze([...outcomes].sort((a, b) => a[0] - b[0]).map(([score, count]) => Object.freeze({ score, count })))
  });
  if (cache.size >= 64) cache.delete(cache.keys().next().value);
  cache.set(key, result);
  return result;
}
function calculate(input) {
  const state = normalize(input);
  const counts = pools(state);
  const threshold = state.modus === "zielwert" ? state.zielwert : 1;
  const results = distribution(state.wertung, counts);
  const won = results.counts.reduce((sum, entry) => sum + (entry.score >= threshold ? entry.count : 0n), 0n);
  const mean = results.counts.reduce((sum, entry) => sum + entry.score * Number(entry.count), 0);
  return {
    state, counts, threshold,
    dice: counts.standard + counts.fokus + counts.risiko,
    success: fraction(won, results.total),
    critical: fraction(results.critical, results.total),
    failure: fraction(results.nonCritical - won, results.total),
    expectedWithoutCritical: results.nonCritical === 0n ? null : mean / Number(results.nonCritical),
    distribution: results.counts.map(entry => ({ score: entry.score, probability: fraction(entry.count, results.total) })),
    exact: { success: won, critical: results.critical, failure: results.nonCritical - won, total: results.total }
  };
}
function table(input) {
  const state = normalize(input);
  const start = Math.max(1, Math.min(MAX_TARGET - 4, state.zielwert - 2));
  const targets = state.modus === "zielwert" ? Array.from({ length: 5 }, (_, i) => start + i) : null;
  const rows = Array.from({ length: 10 }, (_, i) => {
    const base = { ...state, pool: i + 1, fokus: Math.min(state.fokus, i + 1) };
    if (targets) return { pool: i + 1, chances: targets.map(zielwert => calculate({ ...base, zielwert }).success) };
    const without = calculate({ ...base, risiko_aktiv: false });
    const withRisk = calculate({ ...base, risiko_aktiv: true });
    return { pool: i + 1, chances: [without.success, withRisk.success, withRisk.critical] };
  });
  return { targets, rows };
}
function percent(value) {
  if (value === 0) return "0 %";
  if (value === 1) return "100 %";
  if (value < 0.00005) return "<0,01 %";
  if (value > 0.99995) return ">99,99 %";
  return (value * 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " %";
}
module.exports = { KINDS, MAX_POOL, MAX_RISK, MAX_TARGET, MAX_FACE, DEFAULT_FACES, parseFace, normalize, pools, distribution, calculate, table, percent };
