"use strict";
const Six = require("./six-engine.js");
const { percent } = require("./engine.js");
const Slider = require("./slider.js");
let instance = 0;

function mount(container, initial = {}) {
  const doc = container.ownerDocument;
  let state = Six.normalize(initial);
  const defaults = Six.normalize(initial);
  const cleanup = [];
  const prefix = "dice-six-" + (++instance);
  function el(tag, text, cls, parent) {
    const node = doc.createElement(tag);
    if (text != null) node.textContent = text;
    if (cls) node.className = cls;
    if (parent) parent.appendChild(node);
    return node;
  }
  function listen(node, event, callback) {
    node.addEventListener(event, callback);
    cleanup.push(() => node.removeEventListener(event, callback));
  }
  const root = el("section", null, "madan-dice madan-dice-six", container);
  root.setAttribute("aria-label", "W6-Rechner: Skill und Spezialisierung addieren");
  el("p", "Erster Wurf · nur die 6 ist ein Erfolg", "madan-dice-faces", root);
  const controls = el("div", null, "madan-dice-controls", root);
  const sliders = {};
  for (const [name, label, max, min = 0] of [
    ["skill", "Skill", Six.MAX_SKILL, Six.MIN_SKILL],
    ["spezialisierung", "Spezialisierung · zusätzliche Würfel", Six.MAX_SPECIALIZATION],
    ["ausruestung", "Ausrüstung · Bonuswürfel", Six.MAX_EQUIPMENT],
    ["schwierigkeit", "Schwierigkeit · Würfelabzug", Six.MAX_PENALTY],
    ["zustaende", "Zustände · − Debuff / + Buff", Six.MAX_CONDITION, -Six.MAX_CONDITION]
  ]) {
    sliders[name] = Slider.create(doc, controls, prefix, {
      name, label, max, min, value: state[name],
      onInput: value => { state[name] = value; update(); }
    }, listen);
  }
  const summary = el("div", null, "madan-dice-summary", root);
  summary.setAttribute("aria-live", "polite");
  const equation = el("p", null, "madan-dice-equation", summary);
  const requirement = el("p", null, "madan-dice-requirement", summary);
  const result = el("p", null, "madan-dice-result", summary);
  const detail = el("p", null, "madan-dice-detail", summary);
  const table = el("table", null, "madan-dice-table", el("div", null, "madan-dice-table-wrap", root));
  el("caption", "Vergleich nach Boni und Abzügen · mindestens eine 6", null, table);
  const header = el("tr", null, null, el("thead", null, null, table));
  for (const label of ["Verbleibende W6", "Erfolg beim ersten Wurf"]) el("th", label, null, header).setAttribute("scope", "col");
  const body = el("tbody", null, null, table);
  const reset = el("button", "Startwerte wiederherstellen", "madan-dice-example", root);
  reset.type = "button";
  listen(reset, "click", () => { state = { ...defaults }; update(); });

  function update() {
    const outcome = Six.calculate(state);
    state = outcome.state;
    for (const [name, slider] of Object.entries(sliders)) slider.set(state[name]);
    const condition = state.zustaende < 0 ? " − " + Math.abs(state.zustaende) + " Zustände (Debuff)" : " + " + state.zustaende + " Zustände" + (state.zustaende > 0 ? " (Buff)" : "");
    equation.textContent = state.skill + " Skill + " + state.spezialisierung + " Spezialisierung + " + state.ausruestung + " Ausrüstung − " + state.schwierigkeit + " Schwierigkeit" + condition + " = " + outcome.dice + " W6" + (outcome.penalty > outcome.before ? " (auf 0 begrenzt)" : "");
    requirement.textContent = outcome.possible ? "Mindestens eine 6 besteht die Probe. Die Augenzahlen 1–5 geben keine Erfolge." : "0 verbleibende Würfel: Die Handlung ist nicht machbar.";
    result.textContent = outcome.possible ? percent(outcome.success) + " Erfolgschance beim ersten Wurf" : "Nicht machbar · 0 W6";
    detail.textContent = outcome.possible ? "Kein Erfolg beim ersten Wurf: " + percent(outcome.failure) : "Es wird kein Wurf ausgeführt.";
    body.textContent = "";
    const rows = Array.from({ length: 11 }, (_, i) => i);
    if (outcome.dice > 10) rows.push(outcome.dice);
    for (const dice of rows) {
      const tr = el("tr", null, null, body);
      tr.dataset.pool = String(dice);
      const selected = dice === outcome.dice;
      tr.classList.toggle("is-pool", selected);
      el("th", String(dice), null, tr).setAttribute("scope", "row");
      const cell = el("td", dice === 0 ? "Nicht machbar" : percent(Six.chance(dice).success), null, tr);
      cell.classList.toggle("is-selected", selected);
      if (selected) cell.setAttribute("aria-current", "true");
    }
  }
  update();
  return {
    getState: () => ({ ...state }),
    setState: input => { state = Six.normalize(input); update(); },
    destroy: () => { cleanup.forEach(remove => remove()); root.remove(); }
  };
}

module.exports = { mount };
