"use strict";
const Dice = require("./engine.js");
let instance = 0;
function mount(container, initial = {}) {
  const doc = container.ownerDocument;
  let state = Dice.normalize(initial);
  const cleanup = [];
  const prefix = "dice-pool-" + (++instance);
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
  const root = el("section", null, "madan-dice", container);
  root.setAttribute("aria-label", "Konfigurierbarer W6-Poolrechner");
  const modes = el("fieldset", null, "madan-dice-target", root);
  el("legend", "Auswertung", null, modes);
  const modeButtons = [];
  for (const [value, label] of [["zielwert", "Mit Zielwert"], ["abzug", "Nur Würfelabzug"]]) {
    const button = el("button", label, null, modes);
    button.type = "button";
    button.dataset.mode = value;
    listen(button, "click", () => { state.modus = value; update(); });
    modeButtons.push(button);
  }
  const controls = el("div", null, "madan-dice-controls", root);
  const inputs = {};
  function number(name, label, max, min = 0) {
    const wrapper = el("div", null, "madan-dice-field", controls);
    const caption = el("label", label, "madan-dice-label", wrapper);
    const id = prefix + "-" + name;
    caption.setAttribute("for", id);
    const input = el("input", null, null, wrapper);
    input.id = id;
    input.type = "number";
    input.min = String(min);
    input.max = String(max);
    input.step = "1";
    input.dataset.control = name;
    inputs[name] = input;
    listen(input, "input", () => { state[name] = Number(input.value); update(); });
    return wrapper;
  }
  number("pool", "Hauptpool insgesamt", Dice.MAX_POOL);
  number("fokus", "Davon Fokuswürfel", Dice.MAX_POOL);
  number("erschwerung", "Schwierigkeit · Würfelabzug", Dice.MAX_POOL);
  number("risiko", "Verfügbare Risikowürfel", Dice.MAX_RISK);
  const targetWrapper = number("zielwert", "Zielwert · benötigte Nettoerfolge", Dice.MAX_TARGET, 1);
  const riskLabel = el("label", null, "madan-dice-check", root);
  const risk = el("input", null, null, riskLabel);
  risk.type = "checkbox";
  risk.dataset.control = "risiko_aktiv";
  inputs.risiko_aktiv = risk;
  el("span", "Risikowürfel hinzufügen", null, riskLabel);
  listen(risk, "change", () => { state.risiko_aktiv = risk.checked; update(); });
  const profileWrap = el("div", null, "madan-dice-table-wrap", root);
  const profiles = el("table", null, "madan-dice-table madan-dice-profiles", profileWrap);
  el("caption", "Erfolge je Augenzahl · ganze Zahlen oder C", null, profiles);
  const profileHeader = el("tr", null, null, el("thead", null, null, profiles));
  el("th", "Würfeltyp", null, profileHeader).setAttribute("scope", "col");
  for (let face = 1; face <= 6; face++) el("th", String(face), null, profileHeader).setAttribute("scope", "col");
  const profileBody = el("tbody", null, null, profiles);
  const profileInputs = [];
  for (const [kind, label] of [["standard", "Standard"], ["fokus", "Fokus"], ["risiko", "Risiko"]]) {
    const row = el("tr", null, null, profileBody);
    el("th", label, null, row).setAttribute("scope", "row");
    for (let face = 0; face < 6; face++) {
      const input = el("input", null, null, el("td", null, null, row));
      input.type = "text";
      input.inputMode = "text";
      input.value = String(state.wertung[kind][face]);
      input.dataset.control = "face-" + kind + "-" + (face + 1);
      input.setAttribute("aria-label", label + ": Wertung der " + (face + 1));
      listen(input, "input", () => { state.wertung[kind][face] = input.value; update(); });
      profileInputs.push({ input, kind, face });
    }
  }
  el("p", "C bedeutet: Der gesamte Wurf scheitert, unabhängig von Erfolgen auf allen anderen Würfeln.", "madan-dice-footnote", root);
  const error = el("p", null, "madan-dice-error", root);
  error.setAttribute("role", "alert");
  error.hidden = true;
  const summary = el("div", null, "madan-dice-summary", root);
  summary.setAttribute("aria-live", "polite");
  const equation = el("p", null, "madan-dice-equation", summary);
  const requirement = el("p", null, "madan-dice-requirement", summary);
  const result = el("p", null, "madan-dice-result", summary);
  const detail = el("p", null, "madan-dice-detail", summary);
  const tableWrap = el("div", null, "madan-dice-table-wrap", root);
  const table = el("table", null, "madan-dice-table", tableWrap);
  const caption = el("caption", null, null, table);
  const head = el("thead", null, null, table);
  const body = el("tbody", null, null, table);
  const reset = el("button", "Standardwerte wiederherstellen", "madan-dice-example", root);
  reset.type = "button";
  listen(reset, "click", () => { state = Dice.normalize({}); update(); });
  el("p", "Fokuswürfel ersetzen Standardwürfel im Hauptpool. Schwierigkeit entfernt zuerst Standard-, danach Fokuswürfel. Der Hauptpool fällt höchstens auf 0; zugeschaltete Risikowürfel bleiben verfügbar.", "madan-dice-footnote", root);
  function update() {
    for (const { input, kind, face } of profileInputs) {
      try { Dice.parseFace(state.wertung[kind][face]); input.setAttribute("aria-invalid", "false"); }
      catch { input.setAttribute("aria-invalid", "true"); }
    }
    let outcome;
    try { outcome = Dice.calculate(state); }
    catch (problem) {
      error.textContent = problem.message;
      error.hidden = false;
      result.textContent = "Bitte Seitenwertungen korrigieren.";
      equation.textContent = "";
      requirement.textContent = "";
      detail.textContent = "";
      head.textContent = "";
      body.textContent = "";
      caption.textContent = "";
      return;
    }
    state = outcome.state;
    error.hidden = true;
    error.textContent = "";
    for (const name of ["pool", "fokus", "erschwerung", "risiko", "zielwert"]) inputs[name].value = String(state[name]);
    inputs.fokus.max = String(state.pool);
    inputs.risiko_aktiv.checked = state.risiko_aktiv;
    targetWrapper.hidden = state.modus !== "zielwert";
    for (const button of modeButtons) button.setAttribute("aria-pressed", String(button.dataset.mode === state.modus));
    for (const { input, kind, face } of profileInputs) input.value = String(state.wertung[kind][face]);
    const left = outcome.counts;
    equation.textContent = state.pool + " Hauptwürfel − " + state.erschwerung + " Schwierigkeit → " + left.standard + " Standard + " + left.fokus + " Fokus" + (state.erschwerung > state.pool ? " (auf 0 begrenzt)" : "") + " + " + left.risiko + " Risiko = " + outcome.dice + " W6";
    requirement.textContent = state.modus === "zielwert" ? "Benötigt: mindestens " + state.zielwert + " Nettoerfolge." : "Ohne Zielwert: mindestens 1 Nettoerfolg notwendig.";
    result.textContent = Dice.percent(outcome.success) + " Erfolgschance";
    detail.textContent = "Normaler Misserfolg: " + Dice.percent(outcome.failure) + " · C: gesamter Wurf gescheitert: " + Dice.percent(outcome.critical);
    caption.textContent = "Vergleich für 1–10 Hauptwürfel vor Abzug · Schwierigkeit " + state.erschwerung + " · bis zu " + state.fokus + " Fokuswürfel";
    const matrix = Dice.table(state);
    const labels = matrix.targets ? matrix.targets.map(value => "Zielwert " + value) : ["Erfolg ohne Risiko", "Erfolg mit Risiko", "C mit Risiko"];
    head.textContent = "";
    const header = el("tr", null, null, head);
    el("th", "Hauptpool", null, header).setAttribute("scope", "col");
    for (const label of labels) el("th", label, null, header).setAttribute("scope", "col");
    body.textContent = "";
    for (const row of matrix.rows) {
      const tr = el("tr", null, null, body);
      tr.dataset.pool = String(row.pool);
      const selectedRow = row.pool === state.pool;
      tr.classList.toggle("is-pool", selectedRow);
      el("th", String(row.pool), null, tr).setAttribute("scope", "row");
      for (const [index, chance] of row.chances.entries()) {
        const cell = el("td", Dice.percent(chance), null, tr);
        const selected = selectedRow && (matrix.targets ? matrix.targets[index] === state.zielwert : index === (state.risiko_aktiv ? 1 : 0));
        cell.classList.toggle("is-selected", selected);
        if (selected) cell.setAttribute("aria-current", "true");
      }
    }
  }
  update();
  return {
    getState: () => JSON.parse(JSON.stringify(state)),
    setState: input => { state = Dice.normalize(input); for (const { input, kind, face } of profileInputs) input.value = String(state.wertung[kind][face]); update(); },
    destroy: () => { cleanup.forEach(remove => remove()); root.remove(); }
  };
}
module.exports = { mount };
