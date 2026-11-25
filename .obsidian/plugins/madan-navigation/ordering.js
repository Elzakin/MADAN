"use strict";

function numeric(value) {
  if (typeof value !== "number" && typeof value !== "string") return Infinity;
  if (typeof value === "string" && !value.trim()) return Infinity;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Infinity;
}

function metadataFor(file, app) {
  if (!file) return {};
  const note = Array.isArray(file.children)
    ? app.vault.getAbstractFileByPath(file.path + "/" + file.name + ".md")
    : file;
  return note ? app.metadataCache.getFileCache(note)?.frontmatter ?? {} : {};
}

function compareNumber(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}

function sortItems(items, readMetadata) {
  if (!Array.isArray(items) || items.length < 2) return items;
  const rows = items.map((item, index) => {
    const properties = readMetadata(item.file ?? item) ?? {};
    return { item, index, chapter: numeric(properties.chapter), subchapter: numeric(properties.subchapter) };
  });
  if (rows.every(row => row.chapter === Infinity && row.subchapter === Infinity)) return items;
  rows.sort((a, b) => compareNumber(a.chapter, b.chapter) || compareNumber(a.subchapter, b.subchapter) || a.index - b.index);
  return rows.map(row => row.item);
}

function patchView(view, readMetadata, isActive = () => true) {
  const original = view.getSortedFolderItems;
  if (typeof original !== "function") return null;
  const own = Object.getOwnPropertyDescriptor(view, "getSortedFolderItems");
  function wrapped(folder, ...args) {
    const items = original.call(this, folder, ...args);
    return isActive() ? sortItems(items, readMetadata) : items;
  }
  Object.defineProperty(view, "getSortedFolderItems", { configurable: true, writable: true, value: wrapped });
  return () => {
    // Preserve later wrappers installed by another extension.
    if (view.getSortedFolderItems !== wrapped) return;
    if (own) Object.defineProperty(view, "getSortedFolderItems", own);
    else delete view.getSortedFolderItems;
  };
}

module.exports = { numeric, metadataFor, sortItems, patchView };
