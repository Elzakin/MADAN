---
type: werkstatt
status: entwurf
chapter: 3
subchapter: 0
---

# Mathematik

Der frei konfigurierbare [[Werkstatt/Mathematik/Würfelrechner|W6-Poolrechner]] untersucht Standard-, Fokus- und Risikowürfel in beiden Auswertungsmodi. Die festen Referenztabellen zum bisherigen Zielwertentwurf stehen unter [[Regelwerk/Kernregeln/Würfelmathematik|Würfelmathematik]].

## Feste Referenzmodelle

- Grundwertung ohne Freischaltungen: Augenzahlen 1–6 geben `−1, 0, 0, 0, 1, 1` Erfolge.
- Nur die 4 als Erfolg freigeschaltet: `−1, 0, 0, 1, 1, 1`.
- Nur Domänenmeisterschaft: `−1, 0, 0, 0, 1, 2`.
- Beide Freischaltungen: `−1, 0, 0, 1, 1, 2`.
- Die Domäne allein ändert die Wertung nicht. Ihre Meisterschaft verdoppelt die 6.
- Die Wertung der 4 muss separat freigeschaltet werden; Fertigkeitsstufe 5 ist die Voraussetzung, kein automatischer Erwerb. Kosten und Erwerbsweg bleiben offen. Maßgeblich ist die Stufe vor Erschwerungen, nicht die verbleibende Würfelzahl.
- Tatsächlicher Pool: `max(0, Fertigkeit − Erschwerung)`.
- Statische Tabellen: **1–10 Würfel und Zielwerte 1–5**.
- Diese Referenzmodelle enthalten keine Risikowürfel.

## Rechner in Obsidian

Die Erweiterung **W6-Poolrechner** rendert den Block `w6-pool` mit Zahlenfeldern, frei editierbaren Seitenwerten, einem Modusumschalter und einer Risiko-Checkbox. Der bisherige Blockname `madan-wuerfel` wird weiterhin erkannt. Die Erweiterung ist im aktiven Vault und im Repository installiert. Die Bedienung verändert keine Notizen und benötigt kein Internet.

Der Hauptpool enthält Standard- und Fokuswürfel zusammen. Fokus ersetzt Standard: Pool 8 mit Fokus 3 ergibt 5 Standard + 3 Fokus. Schwierigkeit entfernt zuerst Standard-, danach Fokuswürfel. Risikowürfel können separat hinzugeschaltet werden und werden nicht abgezogen, auch bei 0 verbleibenden Hauptwürfeln.

Jeder Würfeltyp hat sechs frei konfigurierbare Seitenwerte: ganze Zahlen oder C. Ein C auf irgendeinem geworfenen Würfel erzwingt den Fehlschlag des gesamten Wurfs. Ohne variable Zielwerte ist mindestens ein Nettoerfolg nötig; mit Zielwert muss die Nettoerfolgssumme diesen erreichen. Die Seitenwerte werden durch keine automatische Stufen- oder Meisterschaftsregel verändert.

## Referenztabellen pflegen

`berechnen.py` zählt ganzzahlige Ergebnisanzahlen und verwendet rationale Wahrscheinlichkeiten. Es benötigt nur die Python-Standardbibliothek.

Vom Repository-Verzeichnis aus:

```bash
python3 Werkstatt/Mathematik/berechnen.py --check
python3 Werkstatt/Mathematik/berechnen.py --write
python3 Werkstatt/Mathematik/berechnen.py --json | node Werkstatt/Mathematik/pruefen.cjs
node Werkstatt/Mathematik/pruefen-widget.cjs
```

`--write` ersetzt ausschließlich den markierten Tabellenbereich. `--check` prüft die Tabellen gegen die Rechnung. `--json` gibt exakte Ergebnisanzahlen für Modellvergleiche aus.

Das Obsidian-Widget liegt unter `.obsidian/plugins/madan-wuerfel/`. `engine.js` zählt die Ergebnisanzahlen mit BigInt und bildet erst für die Anzeige Wahrscheinlichkeiten daraus; `widget.js` stellt die Eingaben und Tabellen dar. Die vier Referenzwertungen werden für 0–10 Würfel gegen die unabhängige Python-Berechnung geprüft. Zusätzlich werden gemischte Pools durch Aufzählung aller Würfe kleiner Pools kontrolliert, einschließlich C als Fehlschlag des gesamten Wurfs und geschützter Risikowürfel. `pruefen-widget.cjs` kontrolliert die Bedienereignisse und den Lebenszyklus in einer DOM-Testumgebung; es ersetzt keine visuelle Prüfung im laufenden Obsidian.

Obsidian lädt die gebündelte `main.js`; der Plugin-Einstieg im Quellcode steht in `plugin.js`. Nach Änderungen an `plugin.js`, `engine.js` oder `widget.js` das Paket neu bauen und die Ladeprüfung ausführen:

```bash
node .obsidian/build-plugins.cjs
node .obsidian/pruefen-plugins.cjs
```

## Kontrollfälle

- 1 Würfel ohne Freischaltungen erreicht Zielwert 1 mit 2/6 und Zielwert 2 mit 0.
- 1 Würfel mit freigeschalteter 4, ohne Domänenmeisterschaft, erreicht Zielwert 1 mit 3/6 und Zielwert 2 mit 0.
- 1 Würfel mit Domänenmeisterschaft erreicht Zielwert 2 mit 1/6, unabhängig von der Freischaltung der 4.
- Derselbe Pool von 4 Würfeln gegen Zielwert 2 hat die Chancen 5/18 ohne beide Boni, 23/48 nur mit freigeschalteter 4, 97/216 nur mit Domänenmeisterschaft und 779/1296 mit beiden Boni.
- Ohne Erschwerung und ohne Freischaltungen ergibt Stufe 4 eine Chance von 5/18, Stufe 5 von 329/972 gegen Zielwert 2. Mit freigeschalteter 4 erreicht Stufe 5 die Chance 241/432.
- Eine Domäne allein hat bei allen Fertigkeitsstufen, Erschwerungen und Zielwerten keinen Einfluss auf die Wertung.
- Erfolg, gewöhnlicher Misserfolg und kritischer Misserfolg ergeben zusammen 100 %.
- Negative Würfelpools werden als 0 Würfel behandelt; die Tabellen ergänzen dadurch keine automatische Mindestanzahl an Würfeln.

Für die Referenzmodelle bleibt die Anwendung der alten Freischaltungen auf Risikowürfel offen. Im generischen Rechner wird die Wirkung ausschließlich über die drei Seitenprofile festgelegt. Die neue Ausgangsbelegung der Risikowürfel verwendet C auf der 1; sie lässt sich zum Vergleichen anderer Modelle ändern.
