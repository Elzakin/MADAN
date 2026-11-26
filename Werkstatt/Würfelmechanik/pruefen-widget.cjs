"use strict";
const assert = require("node:assert/strict");
const Widget = require("../../.obsidian/plugins/madan-wuerfel/widget.js");

// Kleine DOM-Testumgebung für Ereignisse, Zustände und Lebenszyklus; kein Layout-Renderer.
class Element {
  constructor(tag, doc) {
    this.tagName = tag;
    this.ownerDocument = doc;
    this.children = [];
    this.dataset = {};
    this.attributes = new Map();
    this.listeners = new Map();
    this.className = "";
    this.value = "";
    this.checked = false;
    this.classList = {
      contains: name => this.className.split(/\s+/).includes(name),
      toggle: (name, enabled) => {
        const values = new Set(this.className.split(/\s+/).filter(Boolean));
        if (enabled) values.add(name); else values.delete(name);
        this.className = Array.from(values).join(" ");
      }
    };
  }
  set textContent(value) { this.text = value; this.children = []; }
  get textContent() { return this.text ?? this.children.map(child => child.textContent).join(""); }
  setAttribute(key, value) { this.attributes.set(key, value); }
  getAttribute(key) { return this.attributes.get(key) ?? null; }
  removeAttribute(key) { this.attributes.delete(key); }
  appendChild(child) { this.children.push(child); child.parent = this; return child; }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter(child => child !== this); }
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
  }
  removeEventListener(type, callback) { this.listeners.get(type)?.delete(callback); }
  dispatch(type) { for (const callback of this.listeners.get(type) || []) callback({ target: this, type }); }
}
const doc = { createElement: tag => new Element(tag, doc) };
const nodes = root => [root, ...root.children.flatMap(nodes)];
const find = (root, predicate) => nodes(root).find(predicate);
const control = (root, name) => find(root, node => node.dataset.control === name);
const slider = (root, name) => find(root, node => node.dataset.slider === name);
const textOf = (root, cls) => find(root, node => node.classList.contains(cls)).textContent;
const host = doc.createElement("main");
const widget = Widget.mount(host);
const input = (name, value) => { const node = control(host, name); node.value = String(value); node.dispatch("input"); };
const toggle = (name, value) => { const node = control(host, name); node.checked = value; node.dispatch("change"); };
const result = () => textOf(host, "madan-dice-result");
const selected = () => find(host, node => node.getAttribute("aria-current") === "true");

assert.equal(result(), "55,56 % Erfolgschance");
assert.equal(nodes(host).filter(node => node.type === "range").length, 5);
assert.equal(nodes(host).filter(node => node.dataset.control?.startsWith("face-")).length, 18);
assert.equal(selected().parent.dataset.pool, "6");
const mode = value => find(host, node => node.dataset.mode === value).dispatch("click");
mode("zielwert");
assert.equal(result(), "27,78 % Erfolgschance");
assert.equal(control(host, "zielwert").parent.parent.hidden, false);
input("zielwert", 3);
assert.equal(result(), "8,64 % Erfolgschance");
mode("abzug");
assert.equal(result(), "55,56 % Erfolgschance");
assert.equal(control(host, "zielwert").parent.parent.hidden, true);
assert.match(textOf(host, "madan-dice-requirement"), /mindestens 1 Nettoerfolg/);
input("pool", 8);
input("fokus", 3);
assert.equal(slider(host, "pool").value, "8");
assert.equal(slider(host, "fokus").max, "8");
assert.match(textOf(host, "madan-dice-equation"), /3 Standard \+ 3 Fokus/);
input("erschwerung", 7);
assert.match(textOf(host, "madan-dice-equation"), /0 Standard \+ 1 Fokus/);
input("erschwerung", 30);
toggle("risiko_aktiv", true);
assert.match(textOf(host, "madan-dice-equation"), /0 Standard \+ 0 Fokus.*2 Risiko = 2 W6/);
for (let face = 1; face <= 6; face++) input("face-risiko-" + face, "C");
assert.equal(result(), "0 % Erfolgschance");
assert.match(textOf(host, "madan-dice-detail"), /C: gesamter Wurf gescheitert: 100 %/);
input("face-risiko-1", "banana");
assert.equal(control(host, "face-risiko-1").getAttribute("aria-invalid"), "true");
assert.equal(result(), "Bitte Seitenwertungen korrigieren.");
find(host, node => node.classList.contains("madan-dice-example")).dispatch("click");
assert.equal(result(), "55,56 % Erfolgschance");
assert.equal(control(host, "face-risiko-1").getAttribute("aria-invalid"), "false");
widget.setState({ pool: 0, erschwerung: 30, risiko: 1, risiko_aktiv: true, wertung: { risiko: [1, 1, 1, 1, 1, 1] } });
assert.equal(result(), "100 % Erfolgschance");
assert.equal(selected(), undefined);
toggle("risiko_aktiv", false);
assert.equal(result(), "0 % Erfolgschance");
const second = doc.createElement("main");
const another = Widget.mount(second, { pool: 3, fokus: 1, erschwerung: 0 });
assert.equal(another.getState().pool, 3);
assert.equal(widget.getState().pool, 0);
const ids = nodes(host).concat(nodes(second)).filter(node => node.id).map(node => node.id);
assert.equal(new Set(ids).size, ids.length);
const oldInput = control(second, "pool");
another.destroy();
oldInput.value = "7";
oldInput.dispatch("input");
assert.equal(another.getState().pool, 3);
assert.equal(second.children.length, 0);
widget.destroy();
assert.equal(host.children.length, 0);

// Neue additive Ansicht über denselben Einstieg wie in Obsidian.
const sixHost = doc.createElement("main");
const sixWidget = Widget.mount(sixHost, { variante: "sechser", skill: 5, spezialisierung: 5 });
const sixResult = () => textOf(sixHost, "madan-dice-result");
function sixInput(name, value, isSlider = false) {
  const node = isSlider ? slider(sixHost, name) : control(sixHost, name);
  node.value = String(value);
  node.dispatch("input");
}
assert.equal(sixResult(), "83,85 % Erfolgschance beim ersten Wurf");
assert.equal(nodes(sixHost).filter(node => node.type === "range").length, 5);
assert.equal(control(sixHost, "pool"), undefined);
assert.equal(control(sixHost, "fokus"), undefined);
assert.equal(control(sixHost, "risiko_aktiv"), undefined);
assert.equal(slider(sixHost, "skill").min, "1");
assert.equal(control(sixHost, "skill").min, "1");
for (const name of ["ausruestung", "schwierigkeit", "zustaende"]) {
  assert.equal(slider(sixHost, name).max, "10");
  assert.equal(control(sixHost, name).max, "10");
}
assert.equal(slider(sixHost, "zustaende").min, "-10");
assert.equal(control(sixHost, "zustaende").min, "-10");
sixInput("ausruestung", 2, true);
sixInput("schwierigkeit", 3);
sixInput("zustaende", -1, true);
assert.equal(sixResult(), "76,74 % Erfolgschance beim ersten Wurf");
assert.equal(control(sixHost, "ausruestung").value, "2");
assert.equal(slider(sixHost, "schwierigkeit").value, "3");
assert.match(textOf(sixHost, "madan-dice-equation"), /5 Skill \+ 5 Spezialisierung \+ 2 Ausrüstung − 3 Schwierigkeit − 1 Zustände \(Debuff\) = 8 W6/);
assert.equal(find(sixHost, node => node.getAttribute("aria-current") === "true").parent.dataset.pool, "8");
sixInput("zustaende", 1);
assert.equal(slider(sixHost, "zustaende").value, "1");
assert.equal(sixResult(), "83,85 % Erfolgschance beim ersten Wurf");
assert.match(textOf(sixHost, "madan-dice-equation"), /\+ 1 Zustände \(Buff\) = 10 W6/);
sixInput("zustaende", -999);
assert.equal(slider(sixHost, "zustaende").value, "-10");
sixInput("schwierigkeit", 30, true);
assert.equal(control(sixHost, "schwierigkeit").value, "10");
assert.equal(sixResult(), "Nicht machbar · 0 W6");
assert.match(textOf(sixHost, "madan-dice-requirement"), /nicht machbar/);
sixInput("skill", 999);
assert.equal(control(sixHost, "skill").value, "5");
sixInput("skill", -4);
assert.equal(slider(sixHost, "skill").value, "1");
sixInput("skill", "");
assert.equal(sixWidget.getState().skill, 1);
control(sixHost, "skill").dispatch("change");
assert.equal(control(sixHost, "skill").value, "1");
find(sixHost, node => node.classList.contains("madan-dice-example")).dispatch("click");
assert.equal(sixResult(), "83,85 % Erfolgschance beim ersten Wurf");
sixWidget.setState({ skill: 5, spezialisierung: 5, ausruestung: 999, zustaende: 999 });
assert.equal(control(sixHost, "ausruestung").value, "10");
assert.equal(slider(sixHost, "zustaende").value, "10");
assert.equal(find(sixHost, node => node.getAttribute("aria-current") === "true").parent.dataset.pool, "30");
const peerHost = doc.createElement("main");
const peer = Widget.mount(peerHost, { variante: "sechser", skill: 1, spezialisierung: 0 });
const combinedIds = nodes(sixHost).concat(nodes(peerHost)).filter(node => node.id).map(node => node.id);
assert.equal(new Set(combinedIds).size, combinedIds.length);
assert.equal(peer.getState().skill, 1);
assert.equal(sixWidget.getState().skill, 5);
const oldSlider = slider(sixHost, "skill");
sixWidget.destroy();
oldSlider.value = "2";
oldSlider.dispatch("input");
assert.equal(sixWidget.getState().skill, 5);
assert.equal(sixHost.children.length, 0);
peer.destroy();
assert.throws(() => Widget.mount(doc.createElement("main"), { variante: "unbekannt" }), /Variante/);
console.log("18 Seitenfelder, globale C-Wertung, Moduswechsel, Fokus-Ersatz, geschützte Risiken und Eingabefehler geprüft.");
console.log("Additive Sechser-Variante, synchrone Regler/Zahlenfelder, Buffs/Debuffs, Mindestskill, Nullpool und Eingabegrenzen geprüft.");
console.log("Mehrere Rechner, eindeutige Labels und Entfernen der Ereignisse geprüft; keine visuelle Layout-Prüfung.");
