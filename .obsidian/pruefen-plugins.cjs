"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

class Plugin {
  constructor(app) { this.app = app; this.commands = []; this.processors = new Map(); }
  async loadData() { return null; }
  register() {}
  registerEvent() {}
  addCommand(command) { this.commands.push(command); }
  registerMarkdownCodeBlockProcessor(language, callback) { this.processors.set(language, callback); }
}
class MarkdownRenderChild {
  constructor(container) { this.containerEl = container; }
}
const obsidian = { Plugin, MarkdownRenderChild, Notice: class {}, parseYaml: JSON.parse };

async function check() {
  const failures = [];
  for (const id of ["madan-navigation", "madan-wuerfel"]) {
    try {
      const source = fs.readFileSync(path.join(__dirname, "plugins", id, "main.js"), "utf8");
      const requested = [];
      const externalRequire = name => {
        requested.push(name);
        if (name === "obsidian") return obsidian;
        // Obsidian does not resolve relative imports against the plugin folder.
        throw new Error("Unaufgelöster externer Import im Obsidian-Paket: " + name);
      };
      const exported = { exports: {} };
      new Function("require", "module", "exports", source)(externalRequire, exported, exported.exports);
      const app = { workspace: { onLayoutReady() {}, on() {}, getLeavesOfType: () => [] } };
      const plugin = new exported.exports(app);
      assert.ok(plugin instanceof Plugin);
      await plugin.onload();
      assert.deepEqual([...new Set(requested)], ["obsidian"]);
      if (id === "madan-navigation") {
        assert.equal(plugin.commands[0].id, "refresh-order");
      } else {
        const processor = plugin.processors.get("w6-pool");
        assert.equal(typeof processor, "function");
        assert.equal(plugin.processors.get("madan-wuerfel"), processor);
        for (const [source, expected] of [["", {}], ['{"fertigkeit":6,"viererfolg":true}', { fertigkeit: 6, viererfolg: true }], ["[]", {}]]) {
          const children = [];
          processor(source, {}, { addChild: child => children.push(child) });
          assert.equal(children.length, 1);
          assert.ok(children[0] instanceof MarkdownRenderChild);
          assert.deepEqual(children[0].config, expected);
        }
        const element = { setAttribute(name, value) { this[name] = value; } };
        processor("invalid", element, { addChild() { assert.fail("Ungültige Einstellungen dürfen keinen Renderer starten."); } });
        assert.equal(element.role, "alert");
      }
      console.log(id + ": gebündelte main.js unter Obsidian-Ladebedingungen gestartet.");
    } catch (error) {
      failures.push(id + ": " + error.message);
    }
  }
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
  }
}
check().catch(error => { console.error(error); process.exitCode = 1; });
