---
type: source-analysis
source-path: C:/Development/ProjMadan/project-madan
---

# Website-Quellenauswertung: Projekt Madan

## Geprüfte Dateien

- project-madan/resources/js/Pages/Spacer.jsx: Charakterbogen, Beschriftungen und Beispielwerte.
- project-madan/routes/web.php: enthält die Route /Spacer.
- project-madan/app/Http/Controllers/PostController.php: liefert die Inertia-Seite Spacer.
- Die drei Quelldateien wurden als Kopien unter Website/project-madan im Quellenordner abgelegt.

Die Route /Spacer liefert laut Controller die React-Seite Spacer. Im geprüften lokalen Quellstand ist dies überwiegend ein statischer Charakterbogen-Prototyp; Felder und Beispielwerte sind direkt in der Komponente hinterlegt.

## Charakter und Ausrüstung

- Portraitfeld mit Platzhalter „Portrait / Bild hier einfügen“.
- Namensfeld mit Platzhalter „John Geary“.
- Leere Felder für Spezies und Herkunft.
- Ausrüstungsfelder für Helm, Gürtel und Hände.
- Modul 2: Korvax Defence Schildemitter — Schild +5.
- Modul 3: Adidas Space Mag Boots — Bewegung auf magnetischen Oberflächen in Schwerelosigkeit.
- Modul 4: Supreme Health Anti Poison — Antitoxin (1/Schiff-Rest), 3 AP.

## Beispielwerte des Bogens

### Mittlerer Bereich

- Ausweichen 1; Beschriftung daneben: „Schild / Rüstung“.
- Speed 1, Memory 1, Körper 1, Bewegung 1, Fähigkeiten 1.
- Stabilität 2 / 2.
- Brustpanzer „Korrellion Kampfpanzer III“.
- Energie 7, Kinetik 5, Ladungen 10.
- Tool 1 und Tool 2: Platzhalter „Granate“.
- Tool 3: Platzhalter „Med Kit (3 Use)“.
- Tool 4: leer.

### Rechter Bereich

- Speed 1, bezeichnet als Initiative.
- Memory 1, bezeichnet als Skills.
- Körper 1, bezeichnet als Stabilität.
- Wille 1, bezeichnet als Psyche.
- Vita 5, bezeichnet als Leben.
- Energie aktuell 7 und maximal 7.
- Kinetik aktuell 5 und maximal 5.
- Credits 1360; Masse 5.
- Inventartabelle mit fünf leeren Zeilen.

Diese Zahlen und Ausrüstungsbeispiele sind im Quelltext fest eingetragene Beispielwerte. Sie werden nicht automatisch als verbindliche Regeln gewertet.

## Skills im Bogen

Die Tabelle enthält jeweils Spalten für Bonus und Level.

- Wissen: Archäologie, Biochemie, Geist Kontrolle, Geschichte, Medizin, Mystizismus, Naturwissensch., Psionik, Recherchieren, Religion, Taktik, Wirtschaft, Xenologie.
- Soziales: Bluffen, Diebeskunst, Einschüchtern, Gassenwissen, Inspirieren, Motive erkennen, Tierführung, Überzeugen, Kunstformen.
- Technik: Elektronik, Gerätesteuerung, Hacking, Informatik, Maschinenbau, Navigieren, Robotik, Sprache: Unix.
- Körper: Athletik, Ausweichen, Fernkampf, Körperkontrolle, Landfahrzeuge, Nahkampf, Raumschiffe, Spähen, Tarnung, Überleben, Verborgenes suchen, Verteidigung.

## Bilder, Konzept und Quellenhinweise

Im geprüften Projektordner wurden keine separaten Charakterportraits oder Rüstungsillustrationen gefunden. Die React-Komponente enthält nur Platzhalter für Portrait und Silhouette/Rüstungs-Artwork und lädt dort keine Bilddatei.

Der Charakterbogen enthält Eingabefelder für Name, Spezies und Herkunft, aber keine ausgefüllte Biografie oder narrative Charakterbeschreibung. In den geprüften charakterbogenrelevanten Dateien wurden keine externen Quellenangaben oder Links gefunden.

Diese Beobachtung bezieht sich nur auf den lokalen Quellstand in C:/Development/ProjMadan/project-madan. Falls eine veröffentlichte Website Inhalte aus einer Datenbank, einem anderen Branch oder einer separaten Quelle lädt, sind sie hier nicht erfasst.

## Klärungspunkte

1. Der Bogen ordnet Körper sichtbar der Stabilität zu. Im DOCX bestimmt Körper auf Seite 26 den Abschirmungswert; auf Seite 29 steht zugleich „Maximale Stabilität = 2*Körper + Stabilität-Bonus“.
2. Der Bogen nennt „Korrellion Kampfpanzer III“, im DOCX steht „Karelion - Kampfpanzer III“.
3. Der Bogen führt „Kunstformen“ unter Soziales und „Sprache: Unix“ unter Technik. Das DOCX führt Kunstform und Sprachen als eigene Gruppen.

Die Punkte stehen in [[06_Widersprueche/Widerspruchsuebersicht]].
