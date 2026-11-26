"use strict";

const MIN_SKILL = 1;
const MAX_SKILL = 5;
const MAX_SPECIALIZATION = 5;
const MAX_EQUIPMENT = 10;
const MAX_PENALTY = 10;
const MAX_CONDITION = 10;
const MAX_POOL = MAX_SKILL + MAX_SPECIALIZATION + MAX_EQUIPMENT + MAX_CONDITION;

function integer(value, fallback, max, min = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(min, Math.trunc(number))) : fallback;
}

function normalize(input = {}) {
  return {
    variante: "sechser",
    skill: integer(input.skill ?? MIN_SKILL, MIN_SKILL, MAX_SKILL, MIN_SKILL),
    spezialisierung: integer(input.spezialisierung ?? 5, 5, MAX_SPECIALIZATION),
    ausruestung: integer(input.ausruestung ?? 0, 0, MAX_EQUIPMENT),
    schwierigkeit: integer(input.schwierigkeit ?? 0, 0, MAX_PENALTY),
    zustaende: integer(input.zustaende ?? 0, 0, MAX_CONDITION, -MAX_CONDITION)
  };
}

function chance(dice) {
  if (!Number.isInteger(dice) || dice < 0 || dice > MAX_POOL) throw new RangeError("Ungültige Würfelanzahl.");
  const total = 6n ** BigInt(dice);
  const failure = 5n ** BigInt(dice);
  const success = total - failure;
  return { dice, success: Number(success) / Number(total), failure: Number(failure) / Number(total), exact: { success, failure, total } };
}

function calculate(input = {}) {
  const state = normalize(input);
  const before = state.skill + state.spezialisierung + state.ausruestung + Math.max(0, state.zustaende);
  const penalty = state.schwierigkeit + Math.max(0, -state.zustaende);
  const dice = Math.max(0, before - penalty);
  return { state, before, penalty, possible: dice > 0, ...chance(dice) };
}

module.exports = { MIN_SKILL, MAX_SKILL, MAX_SPECIALIZATION, MAX_EQUIPMENT, MAX_PENALTY, MAX_CONDITION, MAX_POOL, normalize, chance, calculate };
