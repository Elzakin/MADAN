---
type: referenz
status: entwurf
chapter: 1
subchapter: 2
---

# Würfelmathematik

Mathematisches Arbeitsblatt zu den [[Werkstatt/Würfelmechanik/Würfel-und-Fertigkeitsproben|Würfel- und Fertigkeitsproben]]: **1–10 tatsächlich geworfene Fertigkeitswürfel** gegen **Zielwerte 1–5**. Die dargestellten Modelle gehören zur unfertigen [[Werkstatt/Würfelmechanik/Würfelmechanik|Würfelmechanik]] und haben **Status Entwurf**.

Die festen Tabellen dokumentieren den bisherigen Zielwertentwurf. Der [[Werkstatt/Würfelmechanik/Würfelrechner-frei|frei konfigurierbare Vergleichsrechner]] vergleicht zusätzlich Standard-, Fokus- und Risikowürfel mit und ohne variable Zielwerte. Die neueste additive Variante mit Erfolg nur auf der 6 steht im [[Werkstatt/Würfelmechanik/Würfelrechner|W6-Poolrechner]].

## Würfelwertung

| Augenzahl | Grundwertung | 4 als Erfolg freigeschaltet | Domänenmeisterschaft | Beide Freischaltungen |
|---:|---:|---:|---:|---:|
| 1 | −1 | −1 | −1 | −1 |
| 2 | 0 | 0 | 0 | 0 |
| 3 | 0 | 0 | 0 | 0 |
| 4 | 0 | +1 | 0 | +1 |
| 5 | +1 | +1 | +1 | +1 |
| 6 | +1 | +1 | +2 | +2 |

**Ab Fertigkeitsstufe 5 kann „4 zählt als Erfolg“ separat freigeschaltet werden.** Die Stufe ist eine Voraussetzung; sie gewährt den Bonus nicht automatisch. Kosten und Erwerbsweg sind noch offen. Maßgeblich ist die Fertigkeitsstufe vor Erschwerungen; eine vorhandene Freischaltung bleibt bei Würfelabzug wirksam.

**Eine Meisterschaft gehört zu einer Domäne und lässt bei passenden Proben die 6 zwei Erfolge zählen.** Eine Domäne allein ändert die Würfelwertung nicht. Die Freischaltung der 4 und die Domänenmeisterschaft werden im aktuellen Arbeitsentwurf unabhängig voneinander betrachtet und lassen sich kombinieren.

## Erschwerungen und Zielwerte

**Würfelpool = Fertigkeitsstufe − Erschwerung**, mindestens 0 Würfel. Erschwerungen ziehen Würfel ab; der Zielwert bleibt unverändert.

Beispiel: Eine Tür hat Zielwert 2. Beschuss verursacht Erschwerung 2. Mit Fertigkeitsstufe 6 bleiben **4 W6 gegen Zielwert 2**. Welche Wertung gilt, hängt von den tatsächlichen Freischaltungen ab:

| Freischaltung | Erfolgschance |
|---|---:|
| Keine | 27,78 % |
| Nur 4 als Erfolg | 47,92 % |
| Nur passende Domänenmeisterschaft | 44,91 % |
| Beide | 60,11 % |

Die Domäne allein erhöht die Chance nicht. Wurde die 4 als Erfolg freigeschaltet, zählt sie trotz nur vier verbleibender Würfel weiterhin einen Erfolg.

Bei 0 verbleibenden Fertigkeitswürfeln beträgt die Summe 0; ein positiver Zielwert wird mit diesem Pool nicht erreicht. Die untenstehenden Tabellen beginnen wie gewünscht bei einem Würfel.

## Interaktiver Rechner

```w6-pool
pool: 6
fokus: 0
erschwerung: 2
modus: zielwert
zielwert: 2
risiko: 2
risiko_aktiv: false
```

## Tabellen lesen

Wähle die Tabelle anhand der **tatsächlich vorhandenen Freischaltungen**: 4 als Erfolg, passende Domänenmeisterschaft, beide oder keine. Die Fertigkeitsstufe allein bestimmt diese Auswahl nicht. Die Zeile gibt die **verbleibenden Würfel nach Erschwerungen** an. Eine Spalte zeigt die Wahrscheinlichkeit, **mindestens** den Zielwert zu erreichen. Alle vier Tabellen enthalten 1–10 Würfel. Die Prozentwerte sind auf zwei Nachkommastellen gerundet; die Berechnung selbst ist exakt.

Diese festen Tabellen betrachten ausschließlich Fertigkeitswürfel ohne Risikowürfel. Der neue Rechner erlaubt Risikowürfel und frei konfigurierbare Wertungen. Dort kennzeichnet **C** den zwingenden Fehlschlag des gesamten Wurfs; eine negative Summe ohne C gilt als normaler Misserfolg. Seine Vergleichstabelle variiert den Hauptpool **vor** Würfelabzug und ist von den folgenden festen Tabellen mit bereits verbleibenden Würfeln zu unterscheiden.

%% wuerfelmathematik:tabellen:start %%

## Grundwertung · keine Freischaltung aktiv

| Würfel | ZW 1 | ZW 2 | ZW 3 | ZW 4 | ZW 5 |
|---:|---:|---:|---:|---:|---:|
| 1 | 33,33 % | 0 % | 0 % | 0 % | 0 % |
| 2 | 44,44 % | 11,11 % | 0 % | 0 % | 0 % |
| 3 | 50,93 % | 20,37 % | 3,70 % | 0 % | 0 % |
| 4 | 55,56 % | 27,78 % | 8,64 % | 1,23 % | 0 % |
| 5 | 59,18 % | 33,85 % | 13,79 % | 3,50 % | 0,41 % |
| 6 | 62,17 % | 38,95 % | 18,76 % | 6,41 % | 1,37 % |
| 7 | 64,73 % | 43,33 % | 23,43 % | 9,69 % | 2,85 % |
| 8 | 66,95 % | 47,14 % | 27,77 % | 13,13 % | 4,74 % |
| 9 | 68,92 % | 50,52 % | 31,79 % | 16,61 % | 6,95 % |
| 10 | 70,69 % | 53,53 % | 35,50 % | 20,06 % | 9,38 % |

## 4 als Erfolg freigeschaltet · ohne Domänenmeisterschaft

| Würfel | ZW 1 | ZW 2 | ZW 3 | ZW 4 | ZW 5 |
|---:|---:|---:|---:|---:|---:|
| 1 | 50,00 % | 0 % | 0 % | 0 % | 0 % |
| 2 | 58,33 % | 25,00 % | 0 % | 0 % | 0 % |
| 3 | 66,67 % | 37,50 % | 12,50 % | 0 % | 0 % |
| 4 | 71,99 % | 47,92 % | 22,92 % | 6,25 % | 0 % |
| 5 | 76,23 % | 55,79 % | 32,64 % | 13,54 % | 3,13 % |
| 6 | 79,59 % | 62,15 % | 41,03 % | 21,35 % | 7,81 % |
| 7 | 82,35 % | 67,35 % | 48,31 % | 28,94 % | 13,54 % |
| 8 | 84,64 % | 71,68 % | 54,60 % | 36,06 % | 19,72 % |
| 9 | 86,58 % | 75,31 % | 60,05 % | 42,61 % | 26,00 % |
| 10 | 88,23 % | 78,40 % | 64,77 % | 48,56 % | 32,15 % |

## Domänenmeisterschaft · ohne Freischaltung der 4

| Würfel | ZW 1 | ZW 2 | ZW 3 | ZW 4 | ZW 5 |
|---:|---:|---:|---:|---:|---:|
| 1 | 33,33 % | 16,67 % | 0 % | 0 % | 0 % |
| 2 | 50,00 % | 27,78 % | 8,33 % | 2,78 % | 0 % |
| 3 | 59,26 % | 37,04 % | 17,59 % | 7,41 % | 1,85 % |
| 4 | 65,28 % | 44,91 % | 26,08 % | 13,12 % | 5,17 % |
| 5 | 69,73 % | 51,53 % | 33,59 % | 19,25 % | 9,41 % |
| 6 | 73,28 % | 57,10 % | 40,21 % | 25,38 % | 14,18 % |
| 7 | 76,22 % | 61,81 % | 46,07 % | 31,27 % | 19,19 % |
| 8 | 78,72 % | 65,85 % | 51,25 % | 36,81 % | 24,25 % |
| 9 | 80,88 % | 69,34 % | 55,86 % | 41,97 % | 29,23 % |
| 10 | 82,75 % | 72,37 % | 59,96 % | 46,72 % | 34,05 % |

## 4 als Erfolg freigeschaltet · mit Domänenmeisterschaft

| Würfel | ZW 1 | ZW 2 | ZW 3 | ZW 4 | ZW 5 |
|---:|---:|---:|---:|---:|---:|
| 1 | 50,00 % | 16,67 % | 0 % | 0 % | 0 % |
| 2 | 63,89 % | 36,11 % | 13,89 % | 2,78 % | 0 % |
| 3 | 72,22 % | 50,00 % | 27,78 % | 11,57 % | 3,24 % |
| 4 | 78,01 % | 60,11 % | 39,89 % | 21,99 % | 9,65 % |
| 5 | 82,28 % | 67,75 % | 50,00 % | 32,25 % | 17,72 % |
| 6 | 85,55 % | 73,67 % | 58,34 % | 41,66 % | 26,33 % |
| 7 | 88,12 % | 78,34 % | 65,20 % | 50,00 % | 34,80 % |
| 8 | 90,16 % | 82,08 % | 70,87 % | 57,26 % | 42,74 % |
| 9 | 91,82 % | 85,10 % | 75,55 % | 63,51 % | 50,00 % |
| 10 | 93,17 % | 87,56 % | 79,44 % | 68,87 % | 56,51 % |

%% wuerfelmathematik:tabellen:ende %%

## Wirkung der Freischaltung

Ohne Erschwerung und ohne Freischaltungen steigt die Chance gegen Zielwert 2 von **27,78 % auf Stufe 4** auf **33,85 % auf Stufe 5**. Erst wenn die 4 separat als Erfolg freigeschaltet wird, erreicht Stufe 5 **55,79 %**. Die Steigerung auf Stufe 5 kostet nach der aktuellen Kostentabelle 1 SP und eröffnet den Zugang; sie gewährt die Freischaltung nicht. Deren Kosten und Erwerbsweg sind noch festzulegen.

Die 4 als Erfolg und die doppelte 6 erhöhen den Mittelwert jeweils um 1/6 Erfolg pro Würfel, erzeugen aber unterschiedliche Verteilungen. Zum Vergleich bei demselben Pool von 4 Würfeln:

| Wertung | Zielwert 2 | Zielwert 3 |
|---|---:|---:|
| Nur die 4 wird zusätzlich zum Erfolg | 47,92 % | 22,92 % |
| Nur die 6 zählt doppelt | 44,91 % | 26,08 % |
| Beide Vorteile zusammen | 60,11 % | 39,89 % |

Die 4 als Erfolg erhöht die Zahl positiver Würfelergebnisse. Die doppelte 6 erhöht deren mögliche Höhe und die Streuung. Deshalb ist bei gleichem Mittelwert nicht dieselbe Variante für jeden Zielwert besser.

## Rechenbasis

Jeder W6 wird als fair und unabhängig angenommen. Die gewichteten Ergebnissummen werden vollständig gezählt. Für einen einzelnen Würfel lauten die erzeugenden Funktionen:

- Grundwertung: $G(x)=(x^{-1}+3+2x)/6$.
- Nur die 4 als Erfolg freigeschaltet: $V(x)=(x^{-1}+2+3x)/6$.
- Nur Domänenmeisterschaft: $M(x)=(x^{-1}+3+x+x^2)/6$.
- Beide Freischaltungen: $VM(x)=(x^{-1}+2+2x+x^2)/6$.

Für $n$ Würfel liefert die jeweilige Funktion hoch $n$ die Verteilung der Summen. Alle Wahrscheinlichkeiten ab dem Zielwert werden addiert. Die mittlere Summe pro Würfel beträgt in dieser Reihenfolge **1/6**, **1/3**, **1/3** und **1/2** Erfolg; sie ist keine Erfolgsgarantie.

Das prüfbare Modell und die Pflege der Referenz stehen unter [[Werkstatt/Würfelmechanik/Würfelmechanik|Mathematik in der Werkstatt]].
