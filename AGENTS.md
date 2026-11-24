# Arbeitsregeln für den TTRPG-Vault

## Sprache und Git

- Verwende Deutsch als Primärsprache für Vault-Inhalte, Dokumentation und Zusammenarbeit.
- Bewahre Originalquellen in ihrer jeweiligen Originalsprache unverändert auf.
- Formuliere Git-Commit-Nachrichten auf Englisch.
- Erstelle Commits ausschließlich auf ausdrücklichen Auftrag des Nutzers.

## Vollständigkeit und Quellentreue

1. Keine sachliche Information aus bereitgestellten Quellen darf stillschweigend ausgelassen werden.
2. Originaldateien und Originalexporte werden unverändert unter `Archiv/Quellen` abgelegt. Bearbeitete Fassungen ersetzen niemals die Quelle.
3. Jede inhaltliche Auswertung muss vollständig genug sein, dass alle Regeln, Beispiele, Zahlenwerte, Bedingungen, Ausnahmen, Begründungen, offenen Fragen und relevanten Randbemerkungen aus der Quelle erhalten bleiben.
4. Bei Google Docs und Sheets wird der gesamte relevante Inhalt erfasst. Bei Tabellen gehören dazu alle Tabellenblätter und Datenbereiche sowie Überschriften, Werte, Formeln, Kommentare und erkennbare Verknüpfungen, soweit sie in der gelieferten Datei verfügbar sind.
5. Bei Discord werden alle sachlichen Inhalte übernommen, nicht zwingend wortwörtlich. Begrüßungen, Smalltalk und rein zwischenmenschlicher Austausch ohne Bezug zum Spielsystem werden ausgelassen.
6. Unsichere Lesarten, fehlender Kontext oder nicht verfügbare Anhänge werden kenntlich gemacht. Nichts wird durch Vermutungen ergänzt.
7. Auswertungen nennen Quelle und Fundstelle so genau wie möglich: Dateiname und Abschnitt/Seite, Tabellenblatt und Zellbereich oder Discord-Kanal, Datum und Nachrichtenautor, sofern verfügbar.
8. Vor Abschluss eines Imports wird die Auswertung gegen die vollständige Quelle geprüft. Fehlende Teile werden nachgetragen; eine bloße Zusammenfassung reicht nicht als Vollständigkeitsnachweis.

## Aktualität und Widersprüche

- Neuere Discord-Aussagen gelten tendenziell als aktueller als ältere Dokumente, aber nicht automatisch als endgültige Entscheidung.
- Sammle widersprüchliche Aussagen mit beiden Fundstellen unter `Werkstatt/Widersprüche`.
- Löse Widersprüche nicht eigenmächtig auf. Halte die gemeinsame Klärung in der Widerspruchsübersicht fest.
- Bereits geklärte Fälle bleiben mit dem gemeinsam festgelegten Ergebnis nachvollziehbar.

## Ablagestruktur

- `Einstieg/`: zentraler Startpunkt und Navigation durch den Vault.
- `Regelwerk/`: buchartig aufgebaute, ausformulierte und spielbare Regeln. Übersichtsseiten führen von Grundkapiteln zu Detailthemen.
- `Welt/`: das Universum des Spiels mit Geschichte, Orten, Kulturen, Fraktionen und Personen.
- `Glossar/`: ausführliche Einzeleinträge zu nachschlagbaren Begriffen. Bestätigte einzelne Fertigkeiten liegen unter `Glossar/Fertigkeiten`.
- `Werkstatt/`: aktive Entwürfe, Auswertungen, Vorlagen und offene Widersprüche. Inhalte hier gelten nicht automatisch als beschlossene Regeln.
- `Archiv/Quellen/`: unveränderte Originale, Exporte und quellennahe Dokumente.
- `Archiv/Bilder/`: Bilder und andere visuelle Medien des Vaults.

## Navigation und Folder Notes

- Jeder strukturtragende Ordner erhält im selben Ordner eine gleichnamige Markdown-Datei als Folder Note, zum Beispiel `Regelwerk/Regelwerk.md`.
- Folder Notes dienen als Einstieg und Inhaltsverzeichnis ihres Ordners.
- Regelwerksseiten erklären Kategorien und Mechaniken. Sie verlinken für ausführliche Einzeleinträge in das Glossar.
- Glossareinträge verlinken zurück auf die Regelwerksseite, die ihre Anwendung erklärt.
- Aktualisiere bei Verschiebungen und Umbenennungen sämtliche Wikilinks, Markdown-Links und relevanten Frontmatter-Pfade.

## Importablauf

Sichere zuerst die unveränderte Quelle unter `Archiv/Quellen`, erstelle danach die vollständige Auswertung in der passenden Ablage und ergänze zuletzt die Querverweise. Die Auswertung darf die Quelle nicht ersetzen.
