#!/usr/bin/env python3
"""Exakte Madan-W6-Mathematik: 1–10 Würfel, Zielwerte 1–5, vier Wertungen."""
from __future__ import annotations

import argparse
from collections import Counter
from fractions import Fraction
from functools import lru_cache
from itertools import product
import json
from pathlib import Path
import re

MODELS = {
    'basis': ('Grundwertung · keine Freischaltung aktiv', (-1, 0, 0, 0, 1, 1)),
    'viererfolg': ('4 als Erfolg freigeschaltet · ohne Domänenmeisterschaft', (-1, 0, 0, 1, 1, 1)),
    'meisterschaft': ('Domänenmeisterschaft · ohne Freischaltung der 4', (-1, 0, 0, 0, 1, 2)),
    'viererfolg_meisterschaft': ('4 als Erfolg freigeschaltet · mit Domänenmeisterschaft', (-1, 0, 0, 1, 1, 2)),
}
MAX_DICE = 10
MAX_TARGET = 5
START = '%% wuerfelmathematik:tabellen:start %%'
END = '%% wuerfelmathematik:tabellen:ende %%'
ROOT = Path(__file__).resolve().parents[2]
REFERENCE = ROOT / 'Regelwerk/Kernregeln/Würfelmathematik.md'


@lru_cache(maxsize=None)
def distribution(dice: int, mode: str) -> Counter[int]:
    if not 0 <= dice <= MAX_DICE or mode not in MODELS:
        raise ValueError('Würfel 0–10 und gültige Variante erwartet.')
    counts = Counter({0: 1})
    for _ in range(dice):
        next_counts: Counter[int] = Counter()
        for score, count in counts.items():
            for face in MODELS[mode][1]:
                next_counts[score + face] += count
        counts = next_counts
    return counts


def success(dice: int, target: int, mode: str) -> Fraction:
    if not 1 <= target <= MAX_TARGET:
        raise ValueError('Zielwerte 1–5 erwartet.')
    return Fraction(sum(count for score, count in distribution(dice, mode).items() if score >= target), 6**dice)


def critical(dice: int, mode: str) -> Fraction:
    return Fraction(sum(count for score, count in distribution(dice, mode).items() if score < 0), 6**dice)


def percent(value: Fraction) -> str:
    if value == 0:
        return '0 %'
    if value == 1:
        return '100 %'
    scaled = value * 10000
    rounded = (2 * scaled.numerator + scaled.denominator) // (2 * scaled.denominator)
    if rounded == 0:
        return '<0,01 %'
    if rounded >= 10000:
        return '>99,99 %'
    return f'{rounded // 100},{rounded % 100:02d} %'


def tables() -> str:
    sections = []
    for mode, (title, _) in MODELS.items():
        rows = ['## ' + title, '', '| Würfel | ZW 1 | ZW 2 | ZW 3 | ZW 4 | ZW 5 |', '|---:|---:|---:|---:|---:|---:|']
        for dice in range(1, MAX_DICE + 1):
            row = [str(dice), *(percent(success(dice, target, mode)) for target in range(1, MAX_TARGET + 1))]
            rows.append('| ' + ' | '.join(row) + ' |')
        sections.append('\n'.join(rows))
    return '\n\n'.join(sections)


def snapshot() -> dict:
    return {
        mode: {
            str(dice): {'denominator': 6**dice, 'counts': dict(sorted(distribution(dice, mode).items()))}
            for dice in range(MAX_DICE + 1)
        }
        for mode in MODELS
    }


def verify() -> None:
    # Unabhängige Enumeration von tatsächlichen Augenzahlen kleiner Pools.
    for mode, (_, values) in MODELS.items():
        for dice in range(5):
            enumerated = Counter()
            for faces in product(range(1, 7), repeat=dice):
                enumerated[sum(values[face - 1] for face in faces)] += 1
            assert enumerated == distribution(dice, mode)
        for dice in range(MAX_DICE + 1):
            counts = distribution(dice, mode)
            assert sum(counts.values()) == 6**dice
            expectation = Fraction(sum(score * count for score, count in counts.items()), 6**dice)
            assert expectation == dice * Fraction(sum(values), 6)
            for target in range(1, MAX_TARGET + 1):
                lost = Fraction(sum(count for score, count in counts.items() if 0 <= score < target), 6**dice)
                assert success(dice, target, mode) + lost + critical(dice, mode) == 1
            assert all(success(dice, target, mode) >= success(dice, target + 1, mode) for target in range(1, MAX_TARGET))
    for dice in range(MAX_DICE + 1):
        for target in range(1, MAX_TARGET + 1):
            for bonus in ('viererfolg', 'meisterschaft'):
                assert success(dice, target, 'basis') <= success(dice, target, bonus) <= success(dice, target, 'viererfolg_meisterschaft')
    assert success(1, 1, 'basis') == Fraction(2, 6)
    assert success(1, 2, 'basis') == 0
    assert success(1, 1, 'viererfolg') == Fraction(1, 2)
    assert success(1, 2, 'viererfolg') == 0
    assert success(1, 2, 'meisterschaft') == Fraction(1, 6)
    assert success(4, 2, 'basis') == Fraction(5, 18)
    assert success(4, 2, 'viererfolg') == Fraction(23, 48)
    assert success(4, 2, 'meisterschaft') == Fraction(97, 216)
    assert success(4, 2, 'viererfolg_meisterschaft') == Fraction(779, 1296)
    assert success(5, 2, 'basis') == Fraction(329, 972)
    assert success(5, 2, 'viererfolg') == Fraction(241, 432)
    assert success(5, 3, 'viererfolg_meisterschaft') == Fraction(1, 2)
    # Gleicher Mittelwert bedeutet keine gleiche Erfolgschance:
    assert success(4, 2, 'viererfolg') > success(4, 2, 'meisterschaft')
    assert success(4, 3, 'viererfolg') < success(4, 3, 'meisterschaft')
    assert percent(Fraction(1, 1000000)) == '<0,01 %'


def render_reference(text: str) -> str:
    if text.count(START) != 1 or text.count(END) != 1:
        raise ValueError('Genau ein Start- und Endmarker für die Tabellen erwartet.')
    before, remainder = text.split(START, 1)
    _, after = remainder.split(END, 1)
    return before + START + '\n\n' + tables() + '\n\n' + END + after


def normalize_tables(text: str) -> str:
    """Obsidian darf Spalten polstern, ohne dass sich die Tabellenwerte ändern."""
    lines = []
    for line in text.splitlines():
        if line.strip().startswith('|') and line.strip().endswith('|'):
            cells = [cell.strip() for cell in line.strip()[1:-1].split('|')]
            cells = [re.sub(r'-{3,}', '---', cell) if re.fullmatch(r':?-{3,}:?', cell) else cell for cell in cells]
            lines.append('|' + '|'.join(cells) + '|')
        else:
            lines.append(line.rstrip())
    return '\n'.join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument('--write', action='store_true')
    modes.add_argument('--check', action='store_true')
    modes.add_argument('--json', action='store_true', help='Exakte Ergebnisanzahlen für unabhängige Kontrollen')
    args = parser.parse_args()
    verify()
    if args.json:
        print(json.dumps(snapshot(), ensure_ascii=False))
    elif args.write or args.check:
        current = REFERENCE.read_text()
        expected = render_reference(current)
        if args.write:
            REFERENCE.write_text(expected)
            print('Referenztabellen aktualisiert: 1–10 Würfel, Zielwerte 1–5, vier Wertungen.')
        elif normalize_tables(current) != normalize_tables(expected):
            raise SystemExit('Tabellen stimmen nicht mit der aktuellen Berechnung überein.')
        else:
            print('Exakte Berechnung, Kontrollfälle und Referenztabellen stimmen überein.')
    else:
        print(tables())


if __name__ == '__main__':
    main()
