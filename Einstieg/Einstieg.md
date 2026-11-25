---
type: index
status: entwurf
chapter: 1
subchapter: 0
---

# Projekt Madan – Einstieg

Projekt Madan verbindet ein spielbares Pen-&-Paper-Regelwerk mit einem eigenen Universum. Die Hauptbereiche führen von Übersichten zu ausführlichen Einträgen.

## Hauptbereiche

- [[Regelwerk/Regelwerk|Regelwerk]] – Kernregeln, Charakter und Ausrüstung.
- [[Welt/Welt|Welt]] – Geschichte, Orte, Kulturen, Fraktionen und Personen des Universums.
- [[Glossar/Glossar|Glossar]] – ausführliche Einzeleinträge zum Nachschlagen.
- [[Werkstatt/Werkstatt|Werkstatt]] – Auswertungen, Vorlagen und offene Widersprüche.
- [[Archiv/Archiv|Archiv]] – unveränderte Quellen und Bilder.
- [[AGENTS|Arbeitsregeln]] – Ablage, Quellentreue, Sprache und Git-Konventionen.

## Importstand

| Quelle | Stand |
|---|---|
| DOCX-Regelentwurf | Vollständige Textextraktion vorhanden; thematische Aufteilung in Arbeit. |
| Website-Prototyp | Dateien und Auswertung vorhanden; als Prototyp gekennzeichnet. |
| Skill-Chats | Zwei vollständige Transkripte und quellennahe Auswertungen vorhanden. Veraltete Kandidatenseiten wurden entfernt. |
| Berechnungstabelle (XLSX) | Noch nicht ausgelesen; keine Inhalte daraus abgeleitet. |

Weitere Einzelheiten stehen unter [[Werkstatt/Importstatus-und-Lücken]].

## Notizstatus

Die Property `status` beschreibt den Bearbeitungs- und Entscheidungsstand. In den Properties kann sie mit Custom Selectors aus einer Liste gewaehlt werden.

| Status | Bedeutung |
|---|---|
| `vorschlag` | Idee oder Option, die noch nicht in den gemeinsamen Entwurf übernommen wurde. |
| `entwurf` | Arbeitsstand, der ausgearbeitet und noch abgestimmt wird. |
| `abgestimmter entwurf` | Gemeinsam vereinbarte Arbeitsgrundlage, die weiterentwickelt werden kann. |
| `finalisiert` | Fertig ausgearbeitete, geprüfte und ausdrücklich freigegebene Fassung. |

Dieselben Werte gelten für `domains-status`, damit eine Fertigkeit bereits abgestimmt sein kann, während ihre Domains noch Vorschläge sind. Quellenbezug und offene Fragen stehen im Inhalt und bilden keine zusätzlichen Statuswerte.

Die Property `type` beschreibt dagegen die Art der Notiz. Sie ist eine frei festgelegte Kategorie fuer Suche, Filter und Uebersichten und aendert allein keine Spielfunktion. Fuer die Uebersicht [[Regelwerk/Charakter/Fertigkeiten/Fertigkeiten|Fertigkeiten]] verwenden wir `regelwerk`, fuer die einzelnen Skills `skill`.
