// Source entry. Build main.js with: node .obsidian/build-plugins.cjs
"use strict";
const { Plugin, MarkdownRenderChild, parseYaml } = require("obsidian");
const Widget = require("./widget.js");

class DiceChild extends MarkdownRenderChild {
  constructor(container, config) {
    super(container);
    this.config = config;
  }
  onload() {
    try {
      this.widget = Widget.mount(this.containerEl, this.config);
    } catch (error) {
      this.containerEl.textContent = "W6-Poolrechner: " + error.message;
      this.containerEl.setAttribute("role", "alert");
    }
  }
  onunload() {
    if (this.widget) this.widget.destroy();
  }
}

module.exports = class MadanDicePlugin extends Plugin {
  onload() {
    const render = (source, element, context) => {
      let config;
      try {
        config = source.trim() ? parseYaml(source) : {};
        if (!config || typeof config !== "object" || Array.isArray(config)) config = {};
      } catch {
        element.textContent = "Die Einstellungen des W6-Poolrechners konnten nicht gelesen werden.";
        element.setAttribute("role", "alert");
        return;
      }
      context.addChild(new DiceChild(element, config));
    };
    this.registerMarkdownCodeBlockProcessor("w6-pool", render);
    this.registerMarkdownCodeBlockProcessor("madan-wuerfel", render);
  }
};
