// Source entry. Build main.js with: node .obsidian/build-plugins.cjs
"use strict";
const { Plugin, Notice } = require("obsidian");
const { metadataFor, patchView } = require("./ordering.js");

module.exports = class MadanNavigation extends Plugin {
  onload() {
    this.active = true;
    this.patches = new Map();
    this.register(() => {
      this.active = false;
      this.removePatches();
    });
    this.app.workspace.onLayoutReady(() => this.refresh());
    this.registerEvent(this.app.workspace.on("layout-change", () => this.refresh()));
    const metadata = this.app.metadataCache;
    if (metadata?.on) {
      this.registerEvent(metadata.on("changed", () => this.refresh(true)));
      this.registerEvent(metadata.on("resolved", () => this.refresh(true)));
    }
    this.addCommand({
      id: "refresh-order",
      name: "Kapitelsortierung aktualisieren",
      callback: () => this.refresh(true)
    });
  }

  refresh(resort = false) {
    if (!this.active) return;
    const views = new Set(this.app.workspace.getLeavesOfType("file-explorer").map(leaf => leaf.view));
    for (const [view, restore] of this.patches) {
      if (!views.has(view)) {
        restore();
        this.patches.delete(view);
      }
    }
    for (const view of views) {
      if (this.patches.has(view)) {
        if (resort) view.requestSort?.();
        continue;
      }
      const restore = patchView(view, file => metadataFor(file, this.app), () => this.active);
      if (!restore) {
        new Notice("Kapitel-Sortierung: Diese Version des Datei-Explorers unterstützt die Sortierung nicht.");
        continue;
      }
      this.patches.set(view, restore);
      view.requestSort?.();
    }
  }

  removePatches() {
    for (const [view, restore] of this.patches) {
      restore();
      view.requestSort?.();
    }
    this.patches.clear();
  }
};
