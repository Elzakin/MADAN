---
type: werkstatt
status: entwurf
chapter: 3
subchapter: 0
---

# Navigation und Sortierung

Die Erweiterung **Kapitel-Sortierung** ordnet Dokumente und Ordner im Obsidian-Dateibaum nach zwei numerischen Properties:

```yaml
chapter: 2
subchapter: 3
```

Zuerst wird aufsteigend nach **chapter**, danach nach **subchapter** sortiert. Die Sortierung erfolgt jeweils zwischen den Einträgen desselben Ordners. Dateien und Unterordner werden gemeinsam eingeordnet. Die Angaben sind lokale Sortierwerte und keine globalen Pfadnummern.

## Dokumente und Ordner

Bei einem Dokument stehen die Properties direkt in seiner Notiz. Bei einem Ordner werden die Properties seiner **gleichnamigen Folder Note** verwendet: Der Ordner `Beispiele` erhält seine Angaben über `Beispiele/Beispiele.md`.

Beispiel für die vier Bereiche im Kapitel Charakter:

| Eintrag | chapter | subchapter |
|---|---:|---:|
| Primärwerte | 1 | 0 |
| Sekundärwerte | 2 | 0 |
| Fertigkeiten | 3 | 0 |
| Fähigkeiten und Talente | 4 | 0 |

Einzelne Einträge innerhalb eines Kapitels können denselben chapter-Wert und unterschiedliche subchapter-Werte bekommen, zum Beispiel `chapter: 3` mit `subchapter: 1`, `2`, `3`.

Fehlende oder ungültige Angaben werden nachgeordnet. Bei gleichen Angaben bleibt die bisherige Obsidian-Sortierung erhalten. Die Erweiterung enthält keine festgelegten Dokumentnamen oder Ordnerpfade.

## Bedienung

Die Properties können direkt in Obsidian geändert werden. Änderungen werden automatisch übernommen. Bei Bedarf lässt sich der Befehl **Kapitel-Sortierung: Kapitelsortierung aktualisieren** ausführen.

Die bisherige Projektstruktur wurde in chapter/subchapter übertragen. Originalquellen unter `Archiv/Quellen` bleiben unverändert. Die alte Pfadliste in der Erweiterung wird nicht mehr verwendet.

## Technische Prüfung

Obsidian lädt die gebündelte `main.js`; die Quelldateien sind `plugin.js` und `ordering.js` unter `.obsidian/plugins/madan-navigation/`. Die bestehende Erweiterungs-ID bleibt für bereits aktivierte Installationen erhalten. Beim Deaktivieren wird die ursprüngliche Sortierung wiederhergestellt.

Bauen und Prüfen vom Repository-Verzeichnis aus:

```bash
node .obsidian/build-plugins.cjs
node .obsidian/build-plugins.cjs --check
node .obsidian/pruefen-plugins.cjs
node .obsidian/plugins/madan-navigation/pruefen.cjs
```

Die Kontrollen prüfen Properties, beliebige Ordnerpfade, Folder Notes, laufende Metadatenänderungen und das Entladen unter Obsidian-Ladebedingungen. Sie ersetzen keine visuelle Kontrolle im laufenden Obsidian.
