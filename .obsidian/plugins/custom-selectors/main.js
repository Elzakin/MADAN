// Custom Selectors 1.1.0 — MIT, Copyright (c) 2024 @hodie
// Compiled from upstream TypeScript with Node.js stripTypeScriptTypes.
const { Plugin, TFile, PluginSettingTab, Setting } = require("obsidian");











const DEFAULT_SETTINGS                          = {
	selectors: []
};

class CustomSelectorsSettingTab extends PluginSettingTab {
	plugin                       ;
	constructor(app     , plugin                       ) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display()       {
		const { containerEl } = this;
		containerEl.empty();
		const headingDesc = document.createDocumentFragment();
		headingDesc.append(
			"Define properties that display as dropdown menus in the Properties view and Bases tables. To use a selector in a Base, add ",
			headingDesc.createEl("code", { text: "selector.<name>" }),
			" as a property column in your Base view."
		);
		new Setting(containerEl)
			.setName("Selectors")
			.setDesc(headingDesc)
			.setHeading();
		this.plugin.settings.selectors.forEach((selector, index) => {
			const shortName = selector.name.replace(/^selector\./, '');

			new Setting(containerEl)
				.setName(shortName || "New selector")
				.setHeading()
				.addExtraButton(btn => btn
					.setIcon("trash")
					.setTooltip("Delete this selector")
					.onClick(async () => {
						this.plugin.settings.selectors.splice(index, 1);
						await this.plugin.saveSettings();
						this.display();
					})
				);
			const nameDesc = document.createDocumentFragment();
			nameDesc.append("Add ");
			const nameCode = nameDesc.createEl("code", { text: `selector.${shortName || "<name>"}` });
			nameDesc.append(" as a property column in your Base view.");

			const group = containerEl.createDiv({ cls: 'cs-setting-group' });
			new Setting(group)
				.setName("Name")
				.setDesc(nameDesc)
				.addText(text => text
					.setPlaceholder("Status")
					.setValue(shortName)
					.onChange(async (value) => {
						selector.name = `selector.${value}`;
						nameCode.textContent = `selector.${value || "<name>"}`;
						await this.plugin.saveSettings();
					})
				);
			new Setting(group)
				.setName("Options")
				.setDesc("Comma-separated list of dropdown values.")
				.addText(text => text
					.setPlaceholder("To-do, doing, done")
					.setValue(selector.options.join(", "))
					.onChange(async (value) => {
						selector.options = value.split(",").map(s => s.trim()).filter(s => s.length > 0);
						await this.plugin.saveSettings();
					})
				);
			new Setting(group)
				.setName("Default to first value")
				.setDesc("When creating a new file from a bases view that includes this property as a column, set the first option as the default value.")
				.addToggle(toggle => toggle
					.setValue(selector.defaultFirst ?? false)
					.onChange(async (value) => {
						selector.defaultFirst = value;
						await this.plugin.saveSettings();
					})
				);
		});
		new Setting(containerEl)
			.addButton(btn => btn
				.setButtonText("Add selector")
				.onClick(async () => {
					this.plugin.settings.selectors.push({ name: "selector.", options: [], defaultFirst: false });
					await this.plugin.saveSettings();
					this.display();
				})
			);
	}
}


class CustomSelectorsPlugin extends Plugin {
	settings                         ;
	observer                  ;
	basesDefaults                                = new Map();

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new CustomSelectorsSettingTab(this.app, this));
		this.observer = new MutationObserver((mutations) => {
			this.handleMutations(mutations);
		});

		this.app.workspace.onLayoutReady(() => {
			this.observer.observe(document.body, { childList: true, subtree: true });
			// initial scan just in case
			this.injectDropdowns(document.body);
		});
		// When a file is created while a Bases view has selector columns,
		// set the first option as the default value.
		this.registerEvent(
			this.app.vault.on('create', (file) => {
				if (!(file instanceof TFile) || file.extension !== 'md') return;
				const fileFolder = file.path.substring(0, file.path.lastIndexOf('/') + 1);
				const defaults = (this.basesDefaults.get(fileFolder) || []).filter(s => s.defaultFirst);
				if (defaults.length === 0) return;
				setTimeout(() => {
					// eslint-disable-next-line @typescript-eslint/no-floating-promises -- fire-and-forget; awaiting would block the UI for a non-critical write
					this.app.fileManager.processFrontMatter(file, (frontmatter                         ) => {
						defaults.forEach(selector => {
							if (!frontmatter[selector.name]) {
								frontmatter[selector.name] = selector.options[0];
							}
						});
					});
				}, 200);
			})
		);
	}
	onunload() {
		this.observer?.disconnect();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()                                    );
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	/**
	 * Resolve the file associated with a DOM element by finding its parent
	 * workspace leaf. Falls back to getActiveFile() if the leaf can't be found.
	 */
	        getFileFromElement(el             )               {
		const leafEl = el.closest('.workspace-leaf');
		if (!leafEl) return this.app.workspace.getActiveFile();
		let targetFile               = null;
		this.app.workspace.iterateAllLeaves((leaf               ) => {
			if (leaf.view.containerEl.parentElement === leafEl) {
				const view = leaf.view;
				if ('file' in view && view.file instanceof TFile) {
					targetFile = view.file;
				}
			}
		});
		return targetFile ?? this.app.workspace.getActiveFile();
	}
	        injectDropdowns(container                        ) {
		// 1. Standard Properties view
		const propertyContainers = container.querySelectorAll('.metadata-property');
		propertyContainers.forEach((propEl) => {
			const keyEl = propEl.querySelector('.metadata-property-key-input')                    ;
			if (!keyEl) return;
			const key = keyEl.value || keyEl.textContent;
			if (key) {
				const selectorConfig = this.settings.selectors.find(s => s.name && s.name === key);
				if (selectorConfig) {
					const valueContainer = propEl.querySelector('.metadata-property-value');
					if (!valueContainer) return;
					const existingSelect = valueContainer.querySelector                   ('.custom-selectors-plugin-select');
					if (existingSelect) {
						// Sync: update dropdown if the underlying value changed externally
						const lastChanged = parseInt(existingSelect.dataset.lastChanged || '0');
						if (Date.now() - lastChanged < 2000) return;
						const nativeInput = valueContainer.querySelector                  ('input');
						const nativeEditable = valueContainer.querySelector             ('[contenteditable]');
						const currentValue = (nativeInput?.value || nativeEditable?.textContent || '').replace(/\s+/g, ' ').trim();
						if (existingSelect.value !== currentValue) {
							existingSelect.value = currentValue || '';
						}
						return;
					}
					this.replaceWithValueDropdown(valueContainer               , selectorConfig.options, key);
				}
			}
		});

			// 2. Obsidian Bases table view support.
		// Bases uses a custom div grid: .bases-td[data-property="note.<name>"]
		this.settings.selectors.forEach(selectorConfig => {
			if (!selectorConfig.name) return;

			const dataProperty = `note.${selectorConfig.name}`;
			const cells = container.querySelectorAll(`.bases-td[data-property="${dataProperty}"]`);
			cells.forEach(cellEl => {
				const cell = cellEl               ;
				const existingSelect = cell.querySelector                   ('.custom-selectors-plugin-select');
				if (existingSelect) {
					// Sync dropdown with underlying value if data changed externally,
					// but skip if the user just changed the dropdown (avoid overwriting
					// with stale content before Bases re-renders).
					const lastChanged = parseInt(existingSelect.dataset.lastChanged || '0');
					if (Date.now() - lastChanged < 2000) return;
					const contentEl = cell.querySelector             ('.metadata-input-longtext');
					const currentValue = (contentEl?.textContent || '').replace(/\s+/g, ' ').trim();
					if (existingSelect.value !== currentValue) {
						existingSelect.value = currentValue || '';
					}
					return;
				}

				const row = cell.closest('.bases-tr')               ;
				if (!row) return;

				this.injectIntoBaseCell(cell, row, selectorConfig);
			});
		});
		// Build folder → selectors mapping for defaults.
		// Each Bases view has files in specific folders; only apply defaults
		// to files created in matching folders.
		const basesDefaults = new Map                          ();
		container.querySelectorAll('.bases-view').forEach(basesView => {
			const folders = new Set        ();
			basesView.querySelectorAll('.internal-link[data-href]').forEach(el => {
				const href = el.getAttribute('data-href') || '';
				const lastSlash = href.lastIndexOf('/');
				folders.add(lastSlash >= 0 ? href.substring(0, lastSlash + 1) : '');
			});
			const viewSelectors                   = [];
			this.settings.selectors.forEach(config => {
				if (!config.name || config.options.length === 0) return;
				if (basesView.querySelector(`.bases-td[data-property="note.${config.name}"]`)) {
					viewSelectors.push(config);
				}
			});
			folders.forEach(folder => {
				const existing = basesDefaults.get(folder) || [];
				viewSelectors.forEach(s => {
					if (!existing.includes(s)) existing.push(s);
				});
				basesDefaults.set(folder, existing);
			});
		});
		this.basesDefaults = basesDefaults;
	}
	        handleMutations(mutations                  ) {
		let shouldInject = false;
		for (const mutation of mutations) {
			if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
				shouldInject = true;
				break;
			}
		}
		if (shouldInject) {
			this.injectDropdowns(document.body);
		}
	}
	        replaceWithValueDropdown(valueContainer             , options          , key        ) {
		// Hide original elements instead of removing them to not break Obsidian's internal state managers
		const children = Array.from(valueContainer.children);
		let currentValue = "";

		children.forEach((child         ) => {
			if (child.classList.contains('custom-selectors-plugin-select')) return;
			if (child instanceof HTMLElement) {
				// Try to extract existing value. Usually it's an input or a rendered pill.
				const inputEl = child.querySelector('input');
				if (inputEl) currentValue = inputEl.value;
				else if (child.textContent) currentValue = child.textContent;

				child.addClass('cs-hidden');
			}
		});

		// Clean up extracted value depending on property type format
		currentValue = currentValue.replace(/\s+/g, ' ').trim();
		// Create dropdown
		const selectEl = document.createElement("select");
		selectEl.classList.add('custom-selectors-plugin-select', 'search-input');
		selectEl.setAttribute('aria-label', `Select value for ${key}`);

		// Default empty option
		const emptyOpt = document.createElement("option");
		emptyOpt.value = "";
		emptyOpt.text = "---";
		selectEl.appendChild(emptyOpt);

		options.forEach(opt => {
			const optionEl = document.createElement('option');
			optionEl.value = opt;
			optionEl.text = opt;
			if (opt === currentValue) {
				optionEl.selected = true;
			}
			selectEl.appendChild(optionEl);
		});
		selectEl.addEventListener('change', (e) => {
			const newValue = (e.target                     ).value;
			selectEl.dataset.lastChanged = Date.now().toString();

			// Trigger Obsidian's internal reactive property system through the
			// hidden native input so other views (like Bases) update immediately.
			const nativeInput = valueContainer.querySelector                  ('input');
			const nativeEditable = valueContainer.querySelector             ('[contenteditable]');
			if (nativeInput) {
				nativeInput.value = newValue;
				nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
				nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
			} else if (nativeEditable) {
				nativeEditable.textContent = newValue;
				nativeEditable.dispatchEvent(new InputEvent('input', { bubbles: true }));
			}
			// Also write via processFrontMatter as a fallback.
			// Resolve file from the DOM tree instead of getActiveFile() so
			// the correct file is targeted even when open in multiple tabs.
			const file = this.getFileFromElement(valueContainer);
			if (file instanceof TFile) {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises -- fire-and-forget; awaiting would block the UI for a non-critical write
				this.app.fileManager.processFrontMatter(file, (frontmatter                         ) => {
					frontmatter[key] = newValue;
				});
			}
		});
		valueContainer.appendChild(selectEl);
	}

	        injectIntoBaseCell(cell             , row             , config                ) {
		// Read current value from the contenteditable div inside the cell
		const contentEl = cell.querySelector             ('.metadata-input-longtext');
		const currentValue = (contentEl?.textContent || '').replace(/\s+/g, ' ').trim();
		// Find the note file via the internal-link span in this row
		const link = row.querySelector             ('.internal-link');
		const href = link?.getAttribute('data-href');
		// The .bases-td is already position:absolute (uses inset-inline-start),
		// so it already serves as a containing block for our overlay — don't change it.
		const selectEl = document.createElement("select");
		selectEl.classList.add('custom-selectors-plugin-select', 'mod-base');
		selectEl.setAttribute('aria-label', `Select value for ${config.name}`);

		const emptyOpt = document.createElement("option");
		emptyOpt.value = "";
		emptyOpt.text = "---";
		selectEl.appendChild(emptyOpt);
		config.options.forEach((opt        ) => {
			const optionEl = document.createElement('option');
			optionEl.value = opt;
			optionEl.text = opt;
			if (opt === currentValue) {
				optionEl.selected = true;
			}
			selectEl.appendChild(optionEl);
		});

		selectEl.addEventListener('change', (e) => {
			const newValue = (e.target                     ).value;
			selectEl.dataset.lastChanged = Date.now().toString();
			// Update frontmatter directly via the Obsidian API
			if (href) {
				const file = this.app.metadataCache.getFirstLinkpathDest(href, '');
				if (file instanceof TFile) {
					// eslint-disable-next-line @typescript-eslint/no-floating-promises -- fire-and-forget; awaiting would block the UI for a non-critical write
					this.app.fileManager.processFrontMatter(file, (frontmatter                         ) => {
						frontmatter[config.name] = newValue;
					});
				}
			}
		});
		// Prevent base's pointer/mouse/focus controllers from hijacking our select
		const stopInteraction = (e       ) => {
			e.stopPropagation();
		};
		const evts = ['mousedown', 'mouseup', 'click', 'pointerdown', 'pointerup', 'focusin'];
		evts.forEach(evt => {
			selectEl.addEventListener(evt, stopInteraction);
			selectEl.addEventListener(evt, stopInteraction, { capture: true });
		});

		cell.appendChild(selectEl);
	}
}

module.exports = CustomSelectorsPlugin;
