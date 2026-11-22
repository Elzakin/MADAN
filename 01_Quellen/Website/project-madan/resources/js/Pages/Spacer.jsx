import Layout from '@/Layouts/Layout';

export default function Spacer() {
    return (
        <div className="sheet">
            <div className="sheet-grid-top">
                {'<!-- Linke Spalte -->'}
                <div>
                    <div className="panel panel-soft">
                        <div className="portrait-card">
                            <div className="portrait-frame">
                                <div className="portrait-placeholder">
                                    Portrait / Bild hier einfügen
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="panel-title">Charakter</div>
                                <div className="character-name-box">
                                    <input className="field-input" type="text" placeholder="John Geary" />
                                </div>
                                <div className="field-row" style={{ marginTop: '6px' }}>
                                    <div className="field-label">Spezies</div>
                                    <div className="field-box">
                                        <input className="field-input" type="text" />
                                    </div>
                                </div>
                                <div className="field-row">
                                    <div className="field-label">Herkunft</div>
                                    <div className="field-box">
                                        <input className="field-input" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="equipment-grid">
                            <div className="field-row equipment-row">
                                <div className="field-label">Helm</div>
                                <div className="field-box">
                                    <input className="field-input" type="text" />
                                </div>
                            </div>
                            <div className="field-row equipment-row">
                                <div className="field-label">Gürtel</div>
                                <div className="field-box">
                                    <input className="field-input" type="text" />
                                </div>
                            </div>
                            <div className="field-row equipment-row">
                                <div className="field-label">Hände</div>
                                <div className="field-box">
                                    <input className="field-input" type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="module-block">
                            <div className="module-card">
                                Modul 2: &nbsp;Korvax Defence Schildemitter &mdash; Schild +5
                            </div>
                            <div className="module-card">
                                Modul 3: &nbsp;Adidas Space Mag Boots &mdash; Movement: Mag in Zero
                                Gravity
                            </div>
                            <div className="module-card">
                                Modul 4: &nbsp;Supreme Health Anti Poison &mdash; Aktiv:
                                Antitoxin (1/Schiff-Rest) &ndash; 3 AP
                            </div>
                        </div>
                    </div>
                </div>

                {'<!-- Mittlere Spalte -->'}
                <div>
                    <div className="panel panel-soft">
                        <div className="middle-top">
                            <div className="dodge-badge">
                                <div className="dodge-badge-title">Ausweichen</div>
                                <div className="dodge-icon">1</div>
                                <div className="dodge-value">Schild / Rüstung</div>
                            </div>
                            <div className="substat-grid">
                                <div className="substat-card">
                                    Speed
                                    <div className="substat-value">1</div>
                                </div>
                                <div className="substat-card">
                                    Memory
                                    <div className="substat-value">1</div>
                                </div>
                                <div className="substat-card">
                                    Körper
                                    <div className="substat-value">1</div>
                                </div>
                                <div className="substat-card">
                                    Bewegung
                                    <div className="substat-value">1</div>
                                </div>
                                <div className="substat-card">
                                    Fähigkeiten
                                    <div className="substat-value">1</div>
                                </div>
                                <div className="substat-card">
                                    Stabilität
                                    <div className="substat-value">2 / 2</div>
                                </div>
                            </div>
                        </div>

                        <div className="avatar-block">
                            <div className="avatar-silhouette">
                                <div className="avatar-placeholder">
                                    Silhouette / Rüstungs-Artwork<br />kann hier als Bild
                                    eingesetzt werden
                                </div>
                            </div>
                            <div className="armor-panel">
                                <div className="armor-title">Brust: Korrellion Kampfpanzer III</div>
                                <div className="armor-line">
                                    <span>Energie</span><span>7</span>
                                </div>
                                <div className="armor-line">
                                    <span>Kinetik</span><span>5</span>
                                </div>
                                <div className="armor-line">
                                    <span>Ladungen</span><span>10</span>
                                </div>
                            </div>
                        </div>

                        <div className="tool-grid">
                            <div className="tool-row">
                                <div className="tool-label">Tool 1</div>
                                <div className="tool-box">
                                    <input
                                        className="field-input"
                                        type="text"
                                        placeholder="Granate"
                                    />
                                </div>
                            </div>
                            <div className="tool-row">
                                <div className="tool-label">Tool 2</div>
                                <div className="tool-box">
                                    <input
                                        className="field-input"
                                        type="text"
                                        placeholder="Granate"
                                    />
                                </div>
                            </div>
                            <div className="tool-row">
                                <div className="tool-label">Tool 3</div>
                                <div className="tool-box">
                                    <input
                                        className="field-input"
                                        type="text"
                                        placeholder="Med Kit (3 Use)"
                                    />
                                </div>
                            </div>
                            <div className="tool-row">
                                <div className="tool-label">Tool 4</div>
                                <div className="tool-box">
                                    <input className="field-input" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {'<!-- Rechte Spalte -->'}
                <div>
                    <div className="panel panel-soft">
                        <div className="mainstats-grid">
                            <div className="mainstat-card">
                                <div>Speed</div>
                                <div className="mainstat-value">1</div>
                                <div className="mainstat-tag">Initiative</div>
                            </div>
                            <div className="mainstat-card">
                                <div>Memory</div>
                                <div className="mainstat-value">1</div>
                                <div className="mainstat-tag">Skills</div>
                            </div>
                            <div className="mainstat-card">
                                <div>Körper</div>
                                <div className="mainstat-value">1</div>
                                <div className="mainstat-tag">Stabilität</div>
                            </div>
                            <div className="mainstat-card psyche">
                                <div>Wille</div>
                                <div className="mainstat-value">1</div>
                                <div className="mainstat-tag">Psyche</div>
                            </div>
                            <div className="mainstat-card life">
                                <div>Vita</div>
                                <div className="mainstat-value">5</div>
                                <div className="mainstat-tag">Leben</div>
                            </div>
                        </div>

                        <div className="resource-grid">
                            <div className="resource-column">
                                <div className="resource-title">Energie</div>
                                <div className="resource-row">
                                    <span>Aktuell</span><span>7</span>
                                </div>
                                <div className="resource-row">
                                    <span>Max</span><span>7</span>
                                </div>
                                <div className="resource-bar">
                                    <div className="resource-fill"></div>
                                </div>
                            </div>
                            <div className="resource-column">
                                <div className="resource-title">Kinetik</div>
                                <div className="resource-row">
                                    <span>Aktuell</span><span>5</span>
                                </div>
                                <div className="resource-row">
                                    <span>Max</span><span>5</span>
                                </div>
                                <div className="resource-bar">
                                    <div className="resource-fill"></div>
                                </div>
                            </div>
                        </div>

                        <div className="backpack-panel">
                            <div className="backpack-header">
                                <span>Rucksack</span>
                                <span>Credits:
                                    <span className="inline-box">
                                        <input
                                            className="field-input"
                                            type="text"
                                            value="1360"
                                            style={{ textAlign: 'center' }}
                                        />
                                    </span>
                                </span>
                                <span>Masse:
                                    <span className="inline-box">
                                        <input
                                            className="field-input"
                                            type="text"
                                            value="5"
                                            style={{ textAlign: 'center' }}
                                        />
                                    </span>
                                </span>
                            </div>
                            <table className="inventory-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th style={{ width: '60px' }}>Masse</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {'<!-- Skills -->'}
            <div className="panel panel-soft skills-panel">
                <div className="skills-header">
                    <div className="skills-title">Skills</div>
                </div>
                <div className="skills-grid">
                    {'<!-- Wissen -->'}
                    <div className="skill-column">
                        <div className="skill-column-header">
                            <span>Wissen</span>
                            <span>Boni</span>
                            <span>Lvl</span>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Archäologie</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Biochemie</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Geist Kontrolle</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Geschichte</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Medizin</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Mystizismus</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Naturwissensch.</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Psionik</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Recherchieren</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Religion</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Taktik</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Wirtschaft</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Xenologie</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                    </div>

                    {'<!-- Soziales -->'}
                    <div className="skill-column">
                        <div className="skill-column-header">
                            <span>Soziales</span>
                            <span>Boni</span>
                            <span>Lvl</span>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Bluffen</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Diebeskunst</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Einschüchtern</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Gassenwissen</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Inspirieren</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Motive erkennen</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Tierführung</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Überzeugen</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Kunstformen</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                    </div>

                    {'<!-- Technik -->'}
                    <div className="skill-column">
                        <div className="skill-column-header">
                            <span>Technik</span>
                            <span>Boni</span>
                            <span>Lvl</span>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Elektronik</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Gerätesteuerung</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Hacking</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Informatik</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Maschinenbau</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Navigieren</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Robotik</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Sprache: Unix</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                    </div>

                    {'<!-- Körper -->'}
                    <div className="skill-column">
                        <div className="skill-column-header">
                            <span>Körper</span>
                            <span>Boni</span>
                            <span>Lvl</span>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Athletik</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Ausweichen</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Fernkampf</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Körperkontrolle</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Landfahrzeuge</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Nahkampf</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Raumschiffe</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Spähen</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Tarnung</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Überleben</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Verborgenes suchen</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name">Verteidigung</div>
                            <div className="skill-cell"></div>
                            <div className="skill-cell"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

