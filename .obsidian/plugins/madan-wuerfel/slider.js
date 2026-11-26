"use strict";

// Gemeinsame Ganzzahleingabe: Schieberegler und Zahlenfeld bedienen denselben Wert.
function create(doc, parent, prefix, options, listen) {
  const { name, label, max, min = 0, onInput } = options;
  const wrapper = doc.createElement("div");
  wrapper.className = "madan-dice-field";
  parent.appendChild(wrapper);
  const caption = doc.createElement("label");
  caption.className = "madan-dice-label";
  caption.textContent = label;
  caption.setAttribute("for", prefix + "-" + name);
  wrapper.appendChild(caption);
  const row = doc.createElement("div");
  row.className = "madan-dice-slider-row";
  wrapper.appendChild(row);
  const range = doc.createElement("input");
  range.type = "range";
  range.id = prefix + "-" + name;
  range.dataset.slider = name;
  range.setAttribute("aria-label", label);
  row.appendChild(range);
  const input = doc.createElement("input");
  input.type = "number";
  input.id = prefix + "-" + name + "-zahl";
  input.dataset.control = name;
  input.setAttribute("aria-label", label + " als Zahl");
  row.appendChild(input);
  for (const control of [range, input]) {
    control.min = String(min);
    control.max = String(max);
    control.step = "1";
    listen(control, "input", () => {
      if (control.value.trim() === "") return;
      const value = Number(control.value);
      if (Number.isFinite(value)) onInput(value);
    });
    // Ein geleertes Zahlenfeld kehrt beim Verlassen zum letzten gültigen Wert zurück.
    listen(control, "change", () => {
      input.value = range.value;
    });
  }
  function set(value, maximum = max) {
    for (const control of [range, input]) {
      control.max = String(maximum);
      control.value = String(value);
    }
  }
  set(options.value ?? min);
  return { wrapper, input, range, set };
}

module.exports = { create };
