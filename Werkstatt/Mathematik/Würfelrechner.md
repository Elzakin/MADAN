---
type: werkstatt
status: entwurf
chapter: 1
subchapter: 1
---

# W6-Poolrechner

Ein frei konfigurierbarer Wahrscheinlichkeitsrechner für **Standard-, Fokus- und Risikowürfel**. Jeder Würfeltyp hat eine eigene Wertung für die Augenzahlen 1–6. Alle Würfel werden als faire, unabhängige W6 behandelt.

```w6-pool
pool: 8
fokus: 3
erschwerung: 2
risiko: 2
risiko_aktiv: false
modus: abzug
zielwert: 2
wertung:
  standard: [-1, 0, 0, 0, 1, 1]
  fokus: [-1, 0, 0, 0, 1, 2]
  risiko: [C, 0, 0, 0, 1, 1]
```

## Hauptpool und Fokus

Der Hauptpool ist die **Gesamtzahl vor Würfelabzug**. Fokuswürfel ersetzen darin Standardwürfel: **Pool 8, davon Fokus 3 = 5 Standard + 3 Fokus**. Der Fokusanteil kann den Hauptpool nicht übersteigen.

Die Schwierigkeit entfernt **zuerst Standard-, danach Fokuswürfel**. Keine Würfelanzahl wird negativ. Bei Pool 8, Fokus 3 und Schwierigkeit 2 bleiben **3 Standard + 3 Fokus**. Bei Schwierigkeit 7 bleibt **1 Fokuswürfel**, ab Schwierigkeit 8 kein Hauptwürfel.

## Risikowürfel

Über **Risikowürfel hinzufügen** wird die eingestellte Anzahl separat zugeschaltet. Der Würfelabzug betrifft sie nicht. Sie sind auch dann verfügbar, wenn vom Hauptpool **0 Würfel** übrig bleiben.

## Seitenwertung und C

Jedes der 18 Seitenfelder akzeptiert eine ganze Zahl (auch 0 oder negative Erfolge) oder **C**. Die Startbelegung ist frei veränderbar.

**Sobald irgendein gewürfelter Würfel C zeigt, scheitert der gesamte Wurf.** Andere Würfel können das durch keine Anzahl an Erfolgen ausgleichen. Das gilt für Standard-, Fokus- und Risikowürfel in beiden Auswertungsmodi.

Ohne C werden die eingetragenen Erfolgswerte aller geworfenen Würfel addiert. Negative Summen sind normale Misserfolge; die Kennzeichnung eines zwingenden kritischen Fehlschlags erfolgt über C.

## Zwei Auswertungsmodi

- **Mit Zielwert:** Die Nettoerfolge müssen mindestens den eingestellten Zielwert erreichen. Zusätzlich kann Schwierigkeit Würfel abziehen.
- **Nur Würfelabzug:** Es gibt keinen variablen Zielwert. Schwierigkeit zieht Würfel ab; **mindestens 1 Nettoerfolg** ist zum Bestehen nötig. 0 oder weniger reichen nicht.

In beiden Modi erzwingt jedes C den Fehlschlag. Der Rechner zeigt Erfolgschance, normalen Misserfolg und den vollständigen Fehlschlag durch C getrennt an.

Die Vergleichstabelle variiert den Hauptpool vor Abzug von 1–10. Fokusanteil und Schwierigkeit werden jeweils berücksichtigt. Im Abzugsmodus zeigt sie den Vergleich mit und ohne Risikowürfel; im Zielwertmodus die Chancen für fünf Zielwerte um den gewählten Wert.

## Einstellungen und Einordnung

Interaktive Änderungen gelten für die geöffnete Rechnerinstanz. Die Startwerte werden im `w6-pool`-Block gespeichert. Technische Eingabegrenzen: Hauptpool 0–30, Risikowürfel 0–10, Schwierigkeit 0–30, Zielwerte 1–30 und Seitenwerte −99 bis 99 oder C.

Der Rechner dient dem Vergleich von Entwürfen. Das Modell ohne Zielwerte wird im Arbeitsgespräch vom **25. November 2026** erwogen. Die bisherigen festen Zielwerttabellen bleiben unter [[Regelwerk/Kernregeln/Würfelmathematik|Würfelmathematik]] nachvollziehbar. Hinweise zur Berechnung und Prüfung stehen unter [[Werkstatt/Mathematik/Mathematik|Mathematik]].
