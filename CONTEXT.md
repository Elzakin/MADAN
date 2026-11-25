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
Eine mechanisch relevante Spezialisierung innerhalb einer Fertigkeit und der Zugang zu einem zugehörigen Skill Tree. Eine Domain gibt selbst keinen Würfelbonus; konkrete Boni und Sonderfähigkeiten stammen aus dem Skill Tree.

**Skill Tree**:
Die Fortschrittsstruktur einer Domain, über die konkrete Boni und Sonderfähigkeiten erworben werden.

**Crafting of Electronic Devices**:
Eine wählbare Electronics-Domain für das Entwerfen und Herstellen neuer elektronischer Geräte ohne vorliegenden Bauplan, einschließlich möglicher Energiewaffen. Reparatur und Zusammenbau nach bekanntem Aufbau gehören zur Grundfertigkeit; konkrete Herstellungsanforderungen sind noch offen.

**Mechanical Crafting**:
Eine wählbare Engineering-Domain für das Entwerfen und Herstellen neuer mechanischer Gegenstände ohne vorliegenden Bauplan, etwa Nahkampfwaffen. Reparatur und Zusammenbau nach bekanntem Aufbau gehören zur Grundfertigkeit.

**Psionics**:
Die Grundfertigkeit für die aktive Nutzung und Kontrolle psionischer Kräfte.
_Avoid_: Channel

**Psionic Phenomena**:
Die Mysteries-Domain für das Wissen über sowie das Erkennen und Untersuchen psionischer Phänomene.
_Avoid_: Psionics als Mysteries-Domain

**Piloting**:
Die Grundfertigkeit zum Fahren oder Fliegen eines Fahrzeugs, in dem sich die steuernde Figur befindet und mit dem sie sich bewegt.

**Control**:
Die Grundfertigkeit zur Fernsteuerung eines räumlich getrennten Objekts oder Systems. Die steuernde Figur bewegt sich nicht mit dem kontrollierten Objekt.

**Meisterschaft**:
Eine an eine Domäne gebundene Erweiterung, durch die bei passenden Proben die 6 zwei Erfolge zählt. Die 4 als Erfolg ist eine separate Freischaltung ab Fertigkeitsstufe 5. Beide Freischaltungen werden im aktuellen Arbeitsentwurf unabhängig betrachtet.

**Freischaltung der 4**:
Ab Fertigkeitsstufe 5 kann „4 zählt als Erfolg“ separat freigeschaltet werden. Die Stufe gewährt den Bonus nicht automatisch; Kosten und Erwerbsweg sind noch offen. Maßgeblich ist die ursprüngliche Fertigkeitsstufe vor Erschwerungen; diese ziehen ausschließlich Würfel ab und heben eine vorhandene Freischaltung nicht auf.

**Fokuswürfel (neuer Entwurf)**:
Fokuswürfel repräsentieren Spezialisierungen und ersetzen einen Teil des Standardpools: Fertigkeit 8, Fokus 3 ergibt 5 Standard- und 3 Fokuswürfel. Schwierigkeit entfernt zuerst Standard-, danach Fokuswürfel bis mindestens 0; optionale Risikowürfel werden separat hinzugefügt und nicht abgezogen. Der frei konfigurierbare Rechner unter [[Werkstatt/Mathematik/Würfelrechner]] vergleicht diesen Ansatz mit und ohne variable Zielwerte. Ohne Zielwert ist mindestens ein Nettoerfolg nötig. Ein C auf irgendeinem Würfel lässt den gesamten Wurf scheitern.
