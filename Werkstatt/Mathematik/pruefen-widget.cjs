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
const textOf = (root, cls) => find(root, node => node.classList.contains(cls)).textContent;
const host = doc.createElement("main");
const widget = Widget.mount(host);
const input = (name, value) => { const node = control(host, name); node.value = String(value); node.dispatch("input"); };
const toggle = (name, value) => { const node = control(host, name); node.checked = value; node.dispatch("change"); };
const result = () => textOf(host, "madan-dice-result");
const selected = () => find(host, node => node.getAttribute("aria-current") === "true");

assert.equal(result(), "55,56 % Erfolgschance");
assert.equal(nodes(host).filter(node => node.dataset.control?.startsWith("face-")).length, 18);
assert.equal(selected().parent.dataset.pool, "6");
const mode = value => find(host, node => node.dataset.mode === value).dispatch("click");
mode("zielwert");
assert.equal(result(), "27,78 % Erfolgschance");
assert.equal(control(host, "zielwert").parent.hidden, false);
input("zielwert", 3);
assert.equal(result(), "8,64 % Erfolgschance");
mode("abzug");
assert.equal(result(), "55,56 % Erfolgschance");
assert.equal(control(host, "zielwert").parent.hidden, true);
assert.match(textOf(host, "madan-dice-requirement"), /mindestens 1 Nettoerfolg/);
input("pool", 8);
input("fokus", 3);
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
console.log("18 Seitenfelder, globale C-Wertung, Moduswechsel, Fokus-Ersatz, geschützte Risiken und Eingabefehler geprüft.");
console.log("Mehrere Rechner, eindeutige Labels und Entfernen der Ereignisse geprüft; keine visuelle Layout-Prüfung.");
