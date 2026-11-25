"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { numeric, metadataFor, sortItems, patchView } = require("./ordering.js");
const a = { file: { name: "A.md", path: "A.md" } };
const b = { file: { name: "B.md", path: "B.md" } };
const c = { file: { name: "C.md", path: "C.md" } };
const d = { file: { name: "D.md", path: "D.md" } };
const meta = new Map([[a.file, { chapter: 2, subchapter: 0 }], [b.file, { chapter: "1", subchapter: 9 }], [c.file, { chapter: 1, subchapter: 2 }]]);
const read = file => meta.get(file) || {};
const input = [a, b, c, d];
assert.deepEqual(sortItems(input, read), [c, b, a, d]);
assert.deepEqual(input, [a, b, c, d]);
assert.equal(sortItems(input, () => ({})), input);
assert.deepEqual(sortItems([c, b], () => ({ chapter: 1, subchapter: 1 })), [c, b]);
for (const value of [null, "", " ", undefined, NaN, "abc", true, [], {}]) assert.equal(numeric(value), Infinity);
assert.equal(numeric("2.5"), 2.5);
assert.equal(numeric(0), 0);
const folder = { name: "Any Folder", path: "An arbitrary/path/Any Folder", children: [] };
const folderNote = { name: "Any Folder.md" };
const app = {
  vault: { getAbstractFileByPath: target => target === folder.path + "/Any Folder.md" ? folderNote : null },
  metadataCache: { getFileCache: note => ({ frontmatter: note === folderNote ? { chapter: 1, subchapter: 0 } : read(note) }) }
};
assert.deepEqual(metadataFor(folder, app), { chapter: 1, subchapter: 0 });
assert.deepEqual(metadataFor(a.file, app), { chapter: 2, subchapter: 0 });
assert.deepEqual(metadataFor({ name: "Missing", path: "Missing", children: [] }, app), {});
const inherited = { getSortedFolderItems() { return input; } };
const view = Object.create(inherited);
let active = true;
const restore = patchView(view, read, () => active);
assert.deepEqual(view.getSortedFolderItems(folder), [c, b, a, d]);
meta.set(a.file, { chapter: 0 });
assert.deepEqual(view.getSortedFolderItems(folder), [a, c, b, d], "Aktuelle Metadaten werden bei jeder Sortierung gelesen");
active = false;
assert.equal(view.getSortedFolderItems(folder), input);
restore();
assert.equal(Object.hasOwn(view, "getSortedFolderItems"), false);
assert.equal(patchView({}, read), null);
class Plugin {
  constructor(app) { this.app = app; this.cleanups = []; this.commands = []; }
  register(callback) { this.cleanups.push(callback); }
  registerEvent(ref) { this.register(() => ref.remove()); }
  addCommand(command) { this.commands.push(command); }
  unload() { this.cleanups.reverse().forEach(callback => callback()); }
}
const exported = { exports: {} };
const code = fs.readFileSync(path.join(__dirname, "main.js"), "utf8");
new Function("require", "module", "exports", code)(name => {
  if (name === "obsidian") return { Plugin, Notice: class {} };
  throw Error("Ungebündelter Import: " + name);
}, exported, exported.exports);
function eventSource() {
  const callbacks = new Map();
  return { callbacks, on: (name, callback) => { callbacks.set(name, callback); return { remove: () => callbacks.delete(name) }; } };
}
const workspace = eventSource();
const metadata = eventSource();
const secondView = Object.create(inherited);
let requests = 0;
secondView.requestSort = () => requests++;
workspace.getLeavesOfType = () => [{ view: secondView }];
let ready;
workspace.onLayoutReady = callback => { ready = callback; };
metadata.getFileCache = app.metadataCache.getFileCache;
const plugin = new exported.exports({ workspace, metadataCache: metadata, vault: app.vault });
plugin.onload();
ready();
assert.equal(plugin.patches.size, 1);
const once = secondView.getSortedFolderItems;
workspace.callbacks.get("layout-change")();
assert.equal(secondView.getSortedFolderItems, once);
const before = requests;
metadata.callbacks.get("changed")();
metadata.callbacks.get("resolved")();
assert.equal(requests, before + 2);
plugin.commands[0].callback();
plugin.unload();
assert.equal(Object.hasOwn(secondView, "getSortedFolderItems"), false);
assert.equal(metadata.callbacks.size, 0);
assert.equal(workspace.callbacks.size, 0);
ready();
assert.equal(plugin.patches.size, 0);
console.log("Chapter/Subchapter numerisch, beliebige Pfade, Folder Notes, fehlende Angaben und Gleichstände geprüft.");
console.log("Metadatenänderungen, sofortiges Neusortieren und rückstandsfreies Entladen unter Obsidian-Ladebedingungen geprüft.");
