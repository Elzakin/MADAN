# Projekt Madan

Projekt Madan verbindet ein spielbares Pen-&-Paper-Regelwerk mit einem dazugehörigen Universum. Inhalte führen von Übersichten zu ausführlichen Einzeleinträgen.

## Inhaltsstruktur

**Regelwerk**:
Die buchartig aufgebaute, spielbare Darstellung der Regeln mit den Kapiteln Kernregeln, Charakter und Ausrüstung. Unter `Regelwerk/Charakter` führt die Folder Note in dieser Reihenfolge durch Primärwerte, Sekundärwerte, Fertigkeiten sowie Fähigkeiten und Talente. Die Fertigkeiten liegen mit ihrer Folder Note und den einzelnen Skills unter `Regelwerk/Charakter/Fertigkeiten`, die Sekundärwerte mit ihren Einträgen unter `Regelwerk/Charakter/Sekundärwerte`. Start und Verteilung sowie Verletzungen und Heilung gehören zu `Regelwerk/Kernregeln`.

**Glossar**:
Der Nachschlagebereich für ausführliche Einzeleinträge, auf die Übersichts- und Regelseiten verweisen.

**Welt**:
Der Bereich für das Universum des Spiels, darunter Geschichte, Orte, Kulturen, Fraktionen und Personen.

**Werkstatt**:
Der aktive Arbeitsbereich für Entwürfe, Auswertungen, Vorlagen und noch zu klärende Widersprüche, die noch keine gültigen Spielinhalte darstellen.
_Avoid_: Systemdesign

**Archiv**:
Der Aufbewahrungsbereich für unveränderte Quellen, Bilder und nicht mehr zur aktiven Arbeit gehörende Unterlagen.

**Widerspruch**:
Zwei oder mehr belegte Aussagen, die sich ohne gemeinsame Klärung nicht zu einer gültigen Regel zusammenführen lassen.

**Folder Note**:
Eine gleichnamige Übersichtsseite innerhalb eines Ordners, die als dessen Einstieg und Inhaltsverzeichnis dient.
_Avoid_: Index Page

**Reihenfolge im Dateibaum**:
Die Erweiterung Kapitel-Sortierung sortiert Dokumente numerisch nach `chapter`, danach `subchapter`. Ordner verwenden dafür ihre gleichnamige Folder Note. Die bisherige Reihenfolge ist in den Notiz-Properties hinterlegt. Die Pflege ist unter [[Werkstatt/Navigation-und-Sortierung]] beschrieben.

## Regelbegriffe

**Primärwert**:
Physis, Motorik, Vitalität, Willenskraft und Kognition (Cognition), jeweils 0–10. Realistischer Mindestwert: Spielercharaktere 1, Commoner 2. Die aktuellen Zuordnungen und Formeln stehen im Entwurf unter [[Regelwerk/Charakter/Primärwerte]]. Stabilität und Ausdauer sind vorläufig zwei Namen für denselben von Physis beeinflussten Wert.

**Sekundärwert**:
Ein aus einem Primärwert abgeleiteter Wert: Stabilität / Ausdauer, Bewegung, Lebenspunkte, Psyche oder aktive Fähigkeitenplätze. Übersicht und Einträge stehen unter [[Regelwerk/Charakter/Sekundärwerte/Sekundärwerte]]. Beide Ebenen sind miteinander verlinkt; die noch offenen Umrechnungen bleiben als solche gekennzeichnet.

**Fertigkeit**:
Ein grundlegender Kompetenzbereich eines Charakters, dem konkrete Domains zugeordnet werden können.
_Avoid_: Skill

**Domain**:
Eine Spezialisierung innerhalb einer Fertigkeit. Eine Domäne allein ändert die Würfelwertung nicht; eine daran gebundene Meisterschaft lässt die 6 zwei Erfolge zählen. Ihre Rolle als Zugang zu Skill Trees und die Abgrenzung zu gewöhnlichen Anwendungsfällen bleiben offen.

**Meisterschaft**:
Eine an eine Domäne gebundene Erweiterung, durch die bei passenden Proben die 6 zwei Erfolge zählt. Die 4 als Erfolg ist eine separate Freischaltung ab Fertigkeitsstufe 5. Beide Freischaltungen werden im aktuellen Arbeitsentwurf unabhängig betrachtet.

**Freischaltung der 4**:
Ab Fertigkeitsstufe 5 kann „4 zählt als Erfolg“ separat freigeschaltet werden. Die Stufe gewährt den Bonus nicht automatisch; Kosten und Erwerbsweg sind noch offen. Maßgeblich ist die ursprüngliche Fertigkeitsstufe vor Erschwerungen; diese ziehen ausschließlich Würfel ab und heben eine vorhandene Freischaltung nicht auf.

**Fokuswürfel (neuer Entwurf)**:
Fokuswürfel repräsentieren Spezialisierungen und ersetzen einen Teil des Standardpools: Fertigkeit 8, Fokus 3 ergibt 5 Standard- und 3 Fokuswürfel. Schwierigkeit entfernt zuerst Standard-, danach Fokuswürfel bis mindestens 0; optionale Risikowürfel werden separat hinzugefügt und nicht abgezogen. Der frei konfigurierbare Rechner unter [[Werkstatt/Mathematik/Würfelrechner]] vergleicht diesen Ansatz mit und ohne variable Zielwerte. Ohne Zielwert ist mindestens ein Nettoerfolg nötig. Ein C auf irgendeinem Würfel lässt den gesamten Wurf scheitern.
