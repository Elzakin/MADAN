---
type: werkstatt
status: entwurf
chapter: 1
subchapter: 3
---

# W6-Poolrechner

**Neue Testvariante: Nur die 6 ist ein Erfolg.** Skill, Spezialisierung und Ausrüstung werden addiert; Schwierigkeit zieht Würfel ab. Zustände geben als Buffs Bonuswürfel oder als Debuffs Abzüge. Alle Würfel sind faire, unabhängige W6. Die Variante gehört zur unfertigen [[Werkstatt/Würfelmechanik/Würfelmechanik|Würfelmechanik]] und bleibt ein Entwurf.

Die Schieberegler und die Zahlenfelder daneben steuern dieselben Werte. Der Rechner zeigt die Wahrscheinlichkeit für **mindestens einen Erfolg beim ersten Wurf**.

```w6-pool
variante: sechser
skill: 1
spezialisierung: 5
ausruestung: 0
schwierigkeit: 0
zustaende: 0
```

## Pool und Erfolge

**Verbleibende W6 = max(0, Skill + Spezialisierung + Ausrüstung − Schwierigkeit + Zustände).**

Der Skill beginnt bei **1** und kann nicht auf 0 gesetzt werden. Zustände reichen von **−10 bis +10**: Negative Werte sind Debuffs und ziehen Würfel ab, positive Werte sind Buffs und geben Bonuswürfel. 0 bedeutet keinen Zustandsmodifikator. Alle Boni und Abzüge werden zusammen verrechnet, bevor der verbleibende Pool auf mindestens 0 begrenzt wird.

Beispiel: Skill 5 und Spezialisierung 5 ergeben zusammen **10 W6**. Mit 2 Bonuswürfeln aus Ausrüstung, Schwierigkeit 3 und Zustand **−1** bleiben **8 W6**. Mit Zustand **+1** statt −1 bleiben **10 W6**. Spezialisierungswürfel kommen hinzu; sie ersetzen keine Skillwürfel.

Jede 6 gibt einen Erfolg. Die Augenzahlen 1–5 geben beim ersten Wurf keine Erfolge und ziehen auch keine Erfolge ab. Mindestens ein Erfolg besteht die Probe; es gibt in dieser Variante keinen variablen Zielwert.

Bei **0 verbleibenden Würfeln ist die Handlung nicht machbar**. Es gibt keinen automatischen Mindestwürfel und keine zuschaltbaren Risikowürfel. Beispiel: Ein Sprung über 5 Meter aus dem Stand wird nicht durch beliebig viele Versuche möglich.

Die Erfolgschance bei `n` verbleibenden Würfeln lautet `1 − (5/6)^n`. Mit 10 W6 sind es rund **83,85 %**, mit 8 W6 **76,74 %**. Die Vergleichstabelle zeigt durchgehend **0–20 verbleibende Würfel**. Liegt der aktuelle Pool darüber, wird er zusätzlich als eigene Zeile angezeigt. Alle Boni und Abzüge sind dabei bereits verrechnet; sie werden in der Tabelle nicht nochmals angewendet.

## Push und Chaos: weiterer Entwurf

Die folgende Erweiterung ist im Gespräch beschrieben, **im Rechner noch nicht umgesetzt**:

- Ein erfolgloser Wurf kann gepusht werden. Dafür wird eine frei gewählte Anzahl Würfel bis höchstens zum ursprünglich verbleibenden Pool erneut geworfen.
- Jede beim Push gewürfelte 1 gibt einen Chaospunkt.
- Nach dem Push wird 1W6 geworfen. Das Ergebnis muss Chaos **überbieten**; Gleichstand reicht nicht. Gelingt das nicht, geschieht etwas und Chaos wird auf 0 gesetzt.
- Talente könnten die Chaosprüfung auf mehr Würfel erhöhen, etwa 2W6.

Noch offen sind die Anzahl erlaubter Pushes pro Probe, das Verhältnis von erfolgreichem Push zu einer Chaosfolge, die Fortschreibung von Chaos nach bestandener Prüfung und die Auswertung mehrerer Chaosprüfwürfel. Dafür werden im Rechner keine Regeln vorweggenommen.

## Vergleich und Startwerte

Der [[Werkstatt/Würfelmechanik/Würfelrechner-frei|bisherige frei konfigurierbare Rechner]] bleibt zum Vergleichen erreichbar. Er enthält Standard-, Fokus- und Risikowürfel, frei editierbare Seitenwerte einschließlich C und den Wechsel zwischen Zielwert und reinem Würfelabzug. Fokus ersetzt dort Standardwürfel; das ist ein anderer Entwurf als die hier additive Spezialisierung. Siehe auch [[Werkstatt/Widersprüche/Widersprüche#W-017|W-017]].

Interaktive Änderungen gelten nur für die geöffnete Rechnerinstanz. Die Startwerte stehen im `w6-pool`-Block; **Startwerte wiederherstellen** setzt dessen Werte zurück. Die Eingabebereiche dieses Versuchs sind **Skill 1–5**, **Spezialisierung 0–5**, **Ausrüstung 0–10**, **Schwierigkeit 0–10** und **Zustände −10 bis +10**. Sie ändern nicht die allgemeine Fertigkeitsskala im Charakterkapitel.

In Obsidian erscheint der Rechner in der Leseansicht oder Live Preview außerhalb des bearbeiteten Codeblocks. Nach einem Plugin-Update muss die Erweiterung **W6-Poolrechner** einmal neu geladen werden, etwa durch Aus- und Einschalten oder einen Neustart von Obsidian.
