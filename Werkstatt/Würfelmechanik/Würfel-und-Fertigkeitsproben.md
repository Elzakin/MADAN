---
type: werkstatt
status: entwurf
sources: ["[[Archiv/Quellen/Google-Docs/Projekt-Madan-Quelltranskription]]"]
chapter: 1
subchapter: 1
---

# Würfel- und Fertigkeitsproben

Diese Notiz sammelt **unfertige Arbeitsstände der Würfelmechanik**. Alle folgenden Wertungen, Schwellen und Abläufe haben den Status **Entwurf** und werden in der [[Werkstatt/Würfelmechanik/Würfelmechanik|Werkstatt]] weiterentwickelt.

Der interaktive Rechner und die Wahrscheinlichkeitstabellen für 1–10 Fertigkeitswürfel gegen Zielwerte 1–5 stehen unter [[Werkstatt/Würfelmechanik/Würfelmathematik|Würfelmathematik]].

Die folgenden Regeln beschreiben den bisherigen Zielwertentwurf. Seit dem Arbeitsgespräch vom 25. November 2026 wird zusätzlich ein gemischter Standard-/Fokuspool und ein Modell ohne variable Zielwerte untersucht. Der [[Werkstatt/Würfelmechanik/Würfelrechner-frei|frei konfigurierbare W6-Poolrechner]] bildet beide Modi, separate Risikowürfel und C als Fehlschlag des gesamten Wurfs ab; siehe [[Werkstatt/Widersprüche/Widersprüche#W-016|W-016]]. Die neueste additive Variante mit Erfolg nur auf der 6 und dem weiteren Push-/Chaosentwurf steht unter [[Werkstatt/Würfelmechanik/Würfelrechner|W6-Poolrechner]]; siehe [[Werkstatt/Widersprüche/Widersprüche#W-017|W-017]].

## W6-Ergebnisse

Fertigkeitsproben verwenden sechsseitige Würfel. Die Augenzahl wird je nach Kompetenz wie folgt in Erfolge umgerechnet:

| Augenzahl | Grundwertung | 4 als Erfolg freigeschaltet | Domänenmeisterschaft | Beide Freischaltungen |
|---:|---:|---:|---:|---:|
| 1 | −1 | −1 | −1 | −1 |
| 2 | 0 | 0 | 0 | 0 |
| 3 | 0 | 0 | 0 | 0 |
| 4 | 0 | +1 | 0 | +1 |
| 5 | +1 | +1 | +1 | +1 |
| 6 | +1 | +1 | +2 | +2 |

Ab Fertigkeitsstufe 5 kann „4 zählt als Erfolg“ separat freigeschaltet werden. Die Stufe erfüllt nur die Voraussetzung und gewährt den Bonus nicht automatisch. Kosten und Erwerbsweg sind noch offen.

Eine Meisterschaft ist an eine Domäne gebunden und lässt bei passenden Proben die 6 zwei Erfolge zählen. Die Domäne allein gibt keinen Bonus auf die Würfelwertung. Die Freischaltung der 4 und die Domänenmeisterschaft werden im aktuellen Arbeitsentwurf unabhängig voneinander betrachtet und können gemeinsam gelten.

## Erschwerungen

Im bisherigen Entwurf gibt jede Fertigkeitsstufe einen zusätzlichen Fertigkeitswürfel (W6), bis zu maximal 10 Fertigkeitswürfeln auf Stufe 10. Eine Erschwerung zieht die angegebene Anzahl Würfel ab:

**Würfelpool = max(0, Fertigkeitsstufe − Erschwerung)**.

Der Zielwert wird dadurch nicht erhöht. Die Voraussetzung für die Freischaltung der 4 richtet sich nach der ursprünglichen Fertigkeitsstufe; Würfelabzug hebt eine vorhandene Freischaltung nicht auf. Beispiel: Tür mit Zielwert 2, Beschuss mit Erschwerung 2 und Fertigkeitsstufe 6 ergeben **4 W6 gegen Zielwert 2**. Wurde die 4 als Erfolg freigeschaltet, gilt das weiterhin; ohne Freischaltung zählt sie 0 Erfolge.

Mit 0 verbleibenden Fertigkeitswürfeln ist die Summe dieses Pools 0. Gesondert ausdrücklich genannte Effekte auf die Erfolgssumme sind keine Erschwerungen im Sinne dieses Würfelabzugs.

## Skill-Wuerfel und Risiko-Wuerfel

Die Anzahl der Skill-Wuerfel entspricht der Skill-Stufe (0-10; siehe [[Regelwerk/Charakter/Fertigkeiten/Fertigkeiten|Fertigkeiten]]). Jeder Charakter hat zwei Risiko-Wuerfel. Risiko-Wuerfel koennen genutzt werden, wenn der Charakter keine Punkte im Skill hat oder zusaetzlich zu den Skill-Wuerfeln. Die Entscheidung ueber Risiko-Wuerfel darf nach Sichtung der Skill-Wuerfel fallen; ihr Einsatz muss erzählerisch als Risiko beschrieben werden.

## Ablauf einer Probe

1. Bestimme die Fertigkeitsstufe und ziehe Erschwerungen als Würfelabzug ab.
2. Bestimme die Wertung anhand der Freischaltungen: Die 4 zählt nur nach separater Freischaltung einen Erfolg (Voraussetzung: Fertigkeitsstufe 5); mit einer passenden Domänenmeisterschaft zählt die 6 zwei Erfolge.
3. Würfle den verbleibenden Pool und zähle Erfolge und negative Erfolge zusammen. Risikowürfel sind gesondert geregelt.
4. Berücksichtige gegebenenfalls ausdrücklich als Erfolgsboni oder Erfolgsmali definierte Effekte.
5. Vergleiche die endgültige Summe mit dem Zielwert 1–5.

Gesamtergebnis mindestens Zielwert = Erfolg. Darunter = Misserfolg. Unter 0 oder eine 1 auf Risiko-Wuerfeln = kritischer Misserfolg und zusaetzliche Schwierigkeiten durch Mission Control. Jeder Erfolg oberhalb des Zielwerts ist ein zusaetzlicher Erfolg; dessen Bonus wird durch Gegenstand/Faehigkeit oder Mission Control bestimmt.

## Zielwerte

| Herausforderung | Zielwert |
|---|---:|
| Alltaeglich | 1 |
| Fordernd | 2 |
| Komplex | 3 |
| Anspruchsvoll | 4 |
| Meisterleistung | 5 |

Mission Control legt den Zielwert innerhalb von 1–5 fest. Zusätzliche erschwerende Umstände werden als Würfelabzug behandelt.

## Abgrenzung der Risikowürfel

Im bisherigen Entwurf führt eine 1 auf einem Risikowürfel zum kritischen Misserfolg. Die festen Referenztabellen enthalten keine Risikowürfel. Der neue Rechner kann sie separat zuschalten; seine Ausgangsbelegung kennzeichnet die 1 mit C. Jedes gewürfelte C lässt den gesamten Wurf scheitern, unabhängig von allen anderen Erfolgen. Welche Seitenwerte die drei Würfeltypen im späteren Regelwerk erhalten, lässt sich damit frei testen.

## Quellenkonflikt

Der DOCX-Glossarabschnitt nennt ausserdem eine **2W12-Probe**, waehrend der Wuerfelabschnitt W6 als ausschliesslich verwendeten Wuerfel festlegt. Das ist als Widerspruch zu klaeren; siehe [[Werkstatt/Widersprüche/Widersprüche|neuer Widerspruch W-009]].

## Fundstellen
Aktuelle Würfelwertung, Zielwerte 1–5 und Erschwerungen als Würfelabzug: Arbeitsgespräch vom 24. November 2026. Nach der Korrektur gewährt Stufe 5 keinen automatischen Bonus: Die Wertung der 4 muss separat freigeschaltet werden. Die Meisterschaft einer Domäne verdoppelt die 6.

Ältere DOCX-Grundlage: S. 6-9 und S. 22; [[Archiv/Quellen/Google-Docs/Projekt-Madan-Quelltranskription]].
