import { LitElement, html, nothing, unsafeHTML } from "../../../src/js/lit.js";
import { PDS } from "../../../src/js/pds.js";
import { HOME_CONTENT } from "./pds-home-content.js";
import {
  isPresetThemeCompatible,
  normalizePresetThemes,
  resolveThemePreference,
} from "../../../src/js/pds-core/pds-theme-utils.js";

function mdInline(input) {
  let text = String(input ?? "");

  // Links first (so formatting can be applied inside label later if you want)
  // [label](href)
  text = text.replace(
    /\[([^\]\n]+)\]\(([^)\s]+)\)/g,
    (_, label, href) => `<a target="_blank" href="${href}">${label}</a>`,
  );

  // Strikethrough
  text = text.replace(/~~(.+?)~~/g, "<s>$1</s>");

  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  text = text.replace(/__(.+?)__/g, "<b>$1</b>");

  // Italic (basic; avoids matching * inside **bold** by using a negative lookaround)
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<i>$1</i>");
  text = text.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<i>$1</i>");

  return unsafeHTML(text);
}

const ROLE_OPTIONS = [
  "Product Designer",
  "UX Designer",
  "UI Designer",
  "Design Systems Lead",
  "Creative Director",
  "Frontend Engineer",
  "Full-stack Engineer",
  "Design Engineer",
  "Product Manager",
  "Founder",
];

const BLOCK_RENDERERS = {
  "hero-panel": (block) => html`
    <article class="hero-panel ">
      <div class="hero-panel-logo">
        <img
          src=${block.logo}
          alt=${block.logoAlt || `${block.title} logo`}
          loading="eager"
          decoding="async"
        />
      </div>
      <header class="stack-sm hero-panel-copy">
        <h1>${block.title}</h1>
        ${block.lead ? html`<p class="text-muted">${block.lead}</p>` : nothing}
      </header>
    </article>
  `,
  cards: (block) => {
    const layout =
      block.cardLayout === "columns" ? "home-columns" : "grid grid-auto-md";
    const iconSize = block.cardIconSize || "xl";
    const cardClass =
      block.cardVariant === "stack"
        ? "card surface-subtle stack-sm"
        : "card surface-subtle feature-card";

    return html`
      <div class=${layout}>
        ${(block.cards || []).map(
          (item) => html`
            <article class=${cardClass}>
              ${block.cardVariant === "stack"
                ? html`
                    <header>
                      <h4>
                        <pds-icon icon=${item.icon} size=${iconSize}></pds-icon>
                        ${item.title}
                      </h4>
                      <p class="text-muted">${mdInline(item.body)}</p>
                    </header>
                  `
                : html`
                    <div class="stack-xs">
                      <h4>
                        <pds-icon icon=${item.icon} size=${iconSize}></pds-icon>
                        <span>${item.title}</span>
                      </h4>
                      <small class="text-muted">${mdInline(item.body)}</small>
                      ${item.extra ? unsafeHTML(item.extra) : nothing}
                    </div>
                  `}
            </article>
          `,
        )}
      </div>
    `;
  },
  callout: (block) => html`
    <article class="callout callout-${block.variant}">
      <div class="callout-icon">
        <pds-icon icon=${block.icon} size="lg"></pds-icon>
      </div>
      <div>
        <div class="callout-title">${unsafeHTML(block.title)}</div>
        ${(block.icons || []).length
          ? html`
              <div class="flex items-center gap-sm">
                ${block.icons.map(
                  (icon) => html`
                    <pds-icon icon=${icon} size="lg"></pds-icon>
                  `,
                )}
              </div>
            `
          : nothing}
        <p class="text-muted">${block.body}</p>
      </div>
    </article>
  `,
  list: (block) => html`
    <div class="stack-sm">
      ${block.title || block.lead
        ? html`
            <header>
              ${block.title ? html`<h2>${block.title}</h2>` : nothing}
              ${block.lead
                ? html`<p class="text-muted">${block.lead}</p>`
                : nothing}
            </header>
          `
        : nothing}
      <article class="card surface-subtle stack-sm">
        <div class="stack-lg">
          ${(block.items || []).map(
            (item) => html`
              <div class="stack-2">
                <div class="flex items-center gap-sm">
                  <pds-icon icon=${item.icon} size="sm"></pds-icon>
                  <span>${item.title}</span>
                </div>
                <small class="text-muted">${item.body}</small>
              </div>
            `,
          )}
        </div>
      </article>
    </div>
  `,
  gallery: (block) => html`
    <pds-scrollrow>
      ${(block.items || []).map(
        (item) => html`
          <article class="card surface-subtle demo-product">
            <img src=${item.image} alt=${item.title} loading="lazy" />
            <div class="stack-xs">
              <h4>${item.title}</h4>
              <small class="text-muted">${item.description}</small>
            </div>
            <footer>
              <span>${item.price}</span>
              <button class="btn-primary btn-sm">
                <pds-icon icon="shopping-cart" size="sm"></pds-icon>
                Add
              </button>
            </footer>
          </article>
        `,
      )}
    </pds-scrollrow>
  `,
  form: (block) => html` <pds-form id=${block.id} data-required></pds-form> `,
  cta: (block, context) => html`
    <nav>
      ${block.href
        ? html`
            <a class="btn btn-outline" href=${block.href}>
              <pds-icon icon=${block.icon}></pds-icon>
              ${block.text}
            </a>
          `
        : html`
            <button
              class="btn-outline"
              @click=${() => context.scrollToSection(block.target)}
            >
              <pds-icon icon=${block.icon}></pds-icon>
              ${block.text}
            </button>
          `}
    </nav>
  `,
};

const CUSTOM_RENDERERS = {
  gallery: (customSection, context) => html`
    <section
      class="home-section ${customSection.surfaceClass || ""}"
      data-home-section=${customSection.id}
    >
      <div class="stack-lg">
        ${context.header} ${context.renderBlocks(customSection.blocks)}
        ${context.scrollButton}
      </div>
    </section>
  `,
  forms: (customSection, context) => {
    const blocks = customSection.blocks || [];
    const formBlock = blocks.find((block) => block.type === "form");
    const sideBlocks = blocks.filter((block) => block.type !== "form");

    return html`
      <section class="home-section" data-home-section=${customSection.id}>
        <div class="stack-lg">
          ${context.header}
          <div class="form-showcase">
            ${formBlock ? context.renderBlock(formBlock) : nothing}
            <div class="stack-lg">${sideBlocks.map(context.renderBlock)}</div>
          </div>
          ${context.scrollButton}
        </div>
      </section>
    `;
  },
  "getting-started": (customSection, context) => {
    const terminalBlock = (customSection.blocks || []).find(
      (block) => block.type === "terminal",
    );
    const command = terminalBlock?.command || "npm init @pure-ds/app";

    return html`
      <section class="home-section" data-home-section=${customSection.id}>
        <div class="stack-lg">
          ${context.header}
          <div class="getting-started-terminal">
            <div class="terminal-shell card surface-elevated">
              <header class="terminal-titlebar">
                <div class="terminal-dots" aria-hidden="true">
                  <span class="terminal-dot terminal-dot-red"></span>
                  <span class="terminal-dot terminal-dot-yellow"></span>
                  <span class="terminal-dot terminal-dot-green"></span>
                </div>
                <span class="terminal-title">Terminal</span>
                <span class="terminal-title-spacer"></span>
              </header>
              <pre
                class="terminal-code"
                data-terminal-code
                data-command=${command}
                aria-label="Command line"
              ><code class="language-bash"><span class="terminal-prompt">$</span> <span data-terminal-typed></span><span class="terminal-cursor" aria-hidden="true"></span></code></pre>
            </div>
          </div>
          ${context.scrollButton}
        </div>
      </section>
    `;
  },
  "need-help": (customSection, context) => {
    const blocks = customSection.blocks || [];
    const servicesBlock = blocks.find((block) => block.type === "cards");
    const detailsBlock = blocks.find((block) => block.type === "list");
    const calloutBlock = blocks.find((block) => block.type === "callout");
    const ctaBlock = blocks.find((block) => block.type === "cta");

    return html`
      <section
        class="home-section ${customSection.surfaceClass || ""}"
        data-home-section=${customSection.id}
      >
        <div class="stack-lg">
          ${context.header}
          <div class="home-columns">
            <div class="stack-lg">
              ${servicesBlock ? context.renderBlock(servicesBlock) : nothing}
            </div>
            <div class="stack-lg">
              ${detailsBlock ? context.renderBlock(detailsBlock) : nothing}
              ${calloutBlock ? context.renderBlock(calloutBlock) : nothing}
              ${ctaBlock ? context.renderBlock(ctaBlock) : nothing}
            </div>
          </div>
          ${context.scrollButton}
        </div>
      </section>
    `;
  },
};

customElements.define(
  "pds-home",
  class extends LitElement {
    static properties = {
      sections: { type: Array, state: true },
    };

    constructor() {
      super();
      this.sections = [];
      this._omniboxSettings = null;
      this._roleOmniboxSettings = null;
      this._presetOmniboxSettings = null;
      this._handleOmniboxScroll = null;
      this._omniboxScrollRaf = null;
      this._themeChangeHandler = null;
      this._gettingStartedTyped = false;
      this._cancelGettingStartedTyping = false;
      this._gettingStartedObserver = null;
      this._gettingStartedVisibilityHandler = null;
      this._gettingStartedFocusHandler = null;
      this._gettingStartedTypingToken = 0;
      this._gettingStartedTypingInProgress = false;
      this._gettingStartedTypingTimer = null;
    }

    createRenderRoot() {
      return this;
    }

    firstUpdated() {
      this._omniboxSettings = this._buildOmniboxSettings();
      this._roleOmniboxSettings = this._buildRoleOmniboxSettings();
      this._presetOmniboxSettings = this._buildPresetOmniboxSettings();
      this._setupSections();
      this._setupOmnibox();
      this._setupPresetOmnibox();
      this._setupForm();
      this._setupGettingStartedTerminal();
      this._setupOmniboxAutoHide();
      this._setupGettingStartedTriggers();
      this._themeChangeHandler = () => {
        this._presetOmniboxSettings = this._buildPresetOmniboxSettings();
        this._setupPresetOmnibox();
      };
      PDS.addEventListener("pds:theme:changed", this._themeChangeHandler);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this._cancelGettingStartedTyping = true;
      if (this._handleOmniboxScroll) {
        window.removeEventListener("scroll", this._handleOmniboxScroll);
        this._handleOmniboxScroll = null;
      }
      if (this._omniboxScrollRaf) {
        window.cancelAnimationFrame(this._omniboxScrollRaf);
        this._omniboxScrollRaf = null;
      }
      if (this._themeChangeHandler) {
        PDS.removeEventListener("pds:theme:changed", this._themeChangeHandler);
        this._themeChangeHandler = null;
      }
      if (this._gettingStartedObserver) {
        this._gettingStartedObserver.disconnect();
        this._gettingStartedObserver = null;
      }
      this._clearGettingStartedTimer();
      if (this._gettingStartedVisibilityHandler) {
        document.removeEventListener(
          "visibilitychange",
          this._gettingStartedVisibilityHandler,
        );
        this._gettingStartedVisibilityHandler = null;
      }
      if (this._gettingStartedFocusHandler) {
        window.removeEventListener("focus", this._gettingStartedFocusHandler);
        this._gettingStartedFocusHandler = null;
      }
    }

    _setupSections() {
      const sections = Array.from(
        this.querySelectorAll("[data-home-section]"),
      ).map((section) => {
        const title =
          section.querySelector("h1, h2")?.textContent?.trim() || "";
        return { id: section.getAttribute("data-home-section"), title };
      });
      this.sections = sections.filter((section) => section.id);
    }

    _buildOmniboxSettings() {
      return {
        iconHandler: (item) => {
          return item.icon ? `<pds-icon icon="${item.icon}"></pds-icon>` : null;
        },
        categories: {
          Highlights: {
            trigger: (options) => options.search.length === 0,
            action: (options) => this._scrollToSection(options.id),
            getItems: () =>
              (this.sections || []).map((section) => ({
                text: section.title || section.id,
                id: section.id,
                icon: "folder-simple",
              })),
          },
        },
      };
    }

    _buildRoleOmniboxSettings() {
      return {
        hideCategory: true,
        itemGrid: "0 1fr 0",
        iconHandler: (item) => {
          return item.icon ? `<pds-icon icon="${item.icon}"></pds-icon>` : "";
        },
        categories: {
          Roles: {
            trigger: (options) => options.search.length === 0,
            getItems: () =>
              ROLE_OPTIONS.map((role) => ({
                text: role,
                id: role,
                icon: "",
              })),
          },
          Search: {
            trigger: (options) => options.search.length > 0,
            getItems: (options) => {
              const query = (options.search || "").trim().toLowerCase();
              if (!query) return [];
              return ROLE_OPTIONS.filter((role) =>
                role.toLowerCase().includes(query),
              ).map((role) => ({
                text: role,
                id: role,
                icon: "",
              }));
            },
          },
        },
      };
    }

    _scrollToSection(sectionId) {
      const section = this.querySelector(`[data-home-section="${sectionId}"]`);
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      section.classList.add("is-highlight");
      window.setTimeout(() => {
        section.classList.remove("is-highlight");
      }, 1200);
    }

    _setupOmnibox() {
      const omnibox = this.querySelector("#pds-home-omnibox");
      if (!omnibox) return;
      omnibox.settings = this._omniboxSettings;
    }

    _setupPresetOmnibox() {
      const omnibox = this.querySelector("#pds-home-preset-omnibox");
      if (!omnibox) return;
      omnibox.settings = this._presetOmniboxSettings;
    }

    _buildPresetOmniboxSettings() {
      const resolvedTheme = resolveThemePreference(PDS.theme);
      return {
        hideCategory: true,
        iconHandler: (item) => {
          const preset = PDS.presets[item.id];
          return /*html*/ `<span style="display: flex;  gap: 1px;  flex-shrink: 0;">
                    <span style="display: inline-block; width: 10px; height: 20px; background-color: ${preset.colors.primary}"></span>
                    <span style="display: inline-block; width: 10px; height: 20px; background-color: ${preset.colors.secondary}"></span>
                    <span style="display: inline-block; width: 10px; height: 20px; background-color: ${preset.colors.accent}"></span>
                  </span>`;
        },
        categories: {
          Presets: {
            trigger: (options) => true,
            action: (options) => {
              if (options?.disabled) return options?.id;
              return this._applyPresetSelection(options);
            },
            getItems: (options) => {
              
              const all = Object.values(PDS.presets || {});
              const query = (options.search || "").toLowerCase();

              const filtered = all.filter((preset) => {
                if (!query) return true;
                const name = preset.name?.toLowerCase() || "";
                const description = preset.description?.toLowerCase() || "";
                return name.includes(query) || description.includes(query);
              });

              return filtered.map((preset) => {
                const supportedThemes = normalizePresetThemes(preset);
                const isCompatible = isPresetThemeCompatible(
                  preset,
                  resolvedTheme
                );
                const themeHint =
                  supportedThemes.length === 1
                    ? `${supportedThemes[0]} only`
                    : `Not available in ${resolvedTheme} mode`;
                const description = preset.description || "";
                const displayDescription = isCompatible
                  ? description
                  : description
                    ? `${description} - ${themeHint}`
                    : themeHint;

                return {
                  id: preset.id,
                  text: preset.name,
                  description: displayDescription,
                  icon: "palette",
                  class: isCompatible ? "" : "disabled",
                  disabled: !isCompatible,
                  tooltip: isCompatible ? "" : themeHint,
                };
              });
            },
          },
          
        },
      };
    }

    _applyPresetSelection(options) {
      if (options?.disabled) return;
      const preset = PDS.presets?.[options?.id];
      if (!preset) return;
      
      PDS.applyLivePreset(preset.id);

      if (PDS.toast) {
        PDS.toast(`Preset selected: ${preset.name}`, { type: "info" });
      }
    }

    _setupOmniboxAutoHide() {
      const omnibox = this.querySelector("#pds-home-omnibox");
      if (!omnibox) return;

      let lastScrollY = window.scrollY || 0;
      this._handleOmniboxScroll = () => {
        if (this._omniboxScrollRaf) return;
        this._omniboxScrollRaf = window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || 0;

          if (currentScrollY > lastScrollY) {
            omnibox.classList.add("is-offscreen");
          } else if (currentScrollY < lastScrollY) {
            omnibox.classList.remove("is-offscreen");
          }

          if (currentScrollY === 0) {
            omnibox.classList.remove("is-offscreen");
          }

          lastScrollY = currentScrollY;
          this._omniboxScrollRaf = null;
        });
      };

      window.addEventListener("scroll", this._handleOmniboxScroll, {
        passive: true,
      });
    }

    async _setupForm() {
      const formBlock = HOME_CONTENT.flatMap(
        (section) => section.blocks || [],
      ).find((block) => block.type === "form");
      if (!formBlock?.id) return;
      const form = this.querySelector(`#${formBlock.id}`);
      if (!form) return;
      await customElements.whenDefined("pds-form");

      form.jsonSchema = formBlock.schema;
      form.uiSchema = formBlock.uiSchema;
      form.options = formBlock.options || {};

      form.defineRenderer(
        "omnibox",
        ({ id, path, value, attrs, set }) => html`
          <pds-omnibox
            id=${id}
            name=${path}
            placeholder=${attrs?.placeholder || "Search PDS..."}
            .value=${value ?? ""}
            .settings=${this._omniboxSettings}
            @input=${(event) => set(event.target.value)}
          ></pds-omnibox>
        `,
      );

      form.defineRenderer(
        "role-omnibox",
        ({ id, path, value, attrs, set }) => html`
          <pds-omnibox
            id=${id}
            name=${path}
            placeholder=${attrs?.placeholder || "Select a role"}
            .value=${value ?? ""}
            .settings=${this._roleOmniboxSettings}
            @input=${(event) => set(event.target.value)}
          ></pds-omnibox>
        `,
      );

      form.addEventListener("pw:submit", async (event) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn?.classList.add("btn-working");
        try {
          await new Promise((resolve) => setTimeout(resolve, 2200));
          console.log("PDS Home form submitted:", event.detail?.json);
          await PDS.toast("Request received! We will reach out shortly.", {
            type: "success",
          });
          form.reset();
        } catch (error) {
          await PDS.toast(`Submission failed: ${error.message}`, {
            type: "error",
          });
        } finally {
          submitBtn?.classList.remove("btn-working");
        }
      });
    }

    _setupGettingStartedTerminal() {
      if (this._gettingStartedTyped) return;
      const terminal = this.querySelector("[data-terminal-code]");
      if (!terminal) return;

      const typed = terminal.querySelector("[data-terminal-typed]");
      const command = terminal.getAttribute("data-command") || "";
      if (!typed || !command) return;

      this._gettingStartedTyped = true;
      this._restartGettingStartedTyping(typed, command);
    }

    _setupGettingStartedTriggers() {
      const terminal = this.querySelector("[data-terminal-code]");
      if (!terminal) return;

      const typed = terminal.querySelector("[data-terminal-typed]");
      const command = terminal.getAttribute("data-command") || "";
      if (!typed || !command) return;

      if (!this._gettingStartedObserver) {
        this._gettingStartedObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this._restartGettingStartedTyping(typed, command);
              }
            });
          },
          { threshold: 0.08 },
        );
        this._gettingStartedObserver.observe(terminal);
      }

      if (!this._gettingStartedVisibilityHandler) {
        this._gettingStartedVisibilityHandler = () => {
          if (!document.hidden) {
            this._restartGettingStartedTyping(typed, command);
          }
        };
        document.addEventListener(
          "visibilitychange",
          this._gettingStartedVisibilityHandler,
        );
      }

      if (!this._gettingStartedFocusHandler) {
        this._gettingStartedFocusHandler = () => {
          this._restartGettingStartedTyping(typed, command);
        };
        window.addEventListener("focus", this._gettingStartedFocusHandler);
      }
    }

    _restartGettingStartedTyping(target, text) {
      const token = ++this._gettingStartedTypingToken;
      target.textContent = "";
      this._cancelGettingStartedTyping = false;
      this._gettingStartedTypingInProgress = true;
      this._clearGettingStartedTimer();

      const stream = this._buildTerminalCharStream(text);

      const initialDelay = 140 + Math.random() * 220;
      this._gettingStartedTypingTimer = window.setTimeout(() => {
        if (this._cancelGettingStartedTyping) return;
        if (token !== this._gettingStartedTypingToken) return;

        this._typeText(target, stream, token, 0);
      }, initialDelay);
    }

    _typeText(target, stream, token, index) {
      if (this._cancelGettingStartedTyping) return;
      if (token !== this._gettingStartedTypingToken) return;

      if (index >= stream.length) {
        this._gettingStartedTypingInProgress = false;
        return;
      }

      const { char, className } = stream[index];
      window.requestAnimationFrame(() => {
        if (this._cancelGettingStartedTyping) return;
        if (token !== this._gettingStartedTypingToken) return;

        if (className) {
          const span = document.createElement("span");
          span.className = className;
          span.textContent = char;
          target.appendChild(span);
        } else {
          target.appendChild(document.createTextNode(char));
        }
        const delay = this._getHumanTypingDelay(char);

        this._gettingStartedTypingTimer = window.setTimeout(() => {
          this._typeText(target, stream, token, index + 1);
        }, delay);
      });
    }

    _clearGettingStartedTimer() {
      if (this._gettingStartedTypingTimer) {
        window.clearTimeout(this._gettingStartedTypingTimer);
        this._gettingStartedTypingTimer = null;
      }
    }

    _getHumanTypingDelay(char) {
      const base = 50 + Math.random() * 90;
      const pauseChars = new Set([" ", "/", "-", "@", "."]);
      const extraPause = pauseChars.has(char) ? 120 + Math.random() * 170 : 0;
      const occasionalPause = Math.random() < 0.12 ? 160 + Math.random() * 160 : 0;
      return Math.round(base + extraPause + occasionalPause);
    }

    _formatTerminalCommand(text) {
      const match = text.match(/^(\S+)(\s+)(\S+)(\s+)(.+)$/);
      if (!match) {
        return this._escapeHTML(text);
      }

      const [, cmd, gap1, action, gap2, rest] = match;
      return [
        `<span class="terminal-token terminal-token-cmd">${this._escapeHTML(cmd)}</span>`,
        gap1,
        `<span class="terminal-token terminal-token-action">${this._escapeHTML(action)}</span>`,
        gap2,
        `<span class="terminal-token terminal-token-arg">${this._escapeHTML(rest)}</span>`,
      ].join("");
    }

    _buildTerminalCharStream(text) {
      const match = text.match(/^(\S+)(\s+)(\S+)(\s+)(.+)$/);
      if (!match) {
        return Array.from(text).map((char) => ({ char, className: "" }));
      }

      const [, cmd, gap1, action, gap2, rest] = match;
      const segments = [
        { text: cmd, className: "terminal-token terminal-token-cmd" },
        { text: gap1, className: "" },
        { text: action, className: "terminal-token terminal-token-action" },
        { text: gap2, className: "" },
        { text: rest, className: "terminal-token terminal-token-arg" },
      ];

      return segments.flatMap((segment) =>
        Array.from(segment.text).map((char) => ({
          char,
          className: segment.className,
        })),
      );
    }

    _escapeHTML(html) {
      return String(html ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    #renderSection(section, index) {
      const nextSection = HOME_CONTENT[index + 1];
      const header =
        section?.title || section?.lead
          ? html`
              <header>
                ${section.type === "hero"
                  ? html`<h1>${section.title}</h1>`
                  : html`<h2>${section.title}</h2>`}
                ${section.lead
                  ? html`<p class="text-muted">${section.lead}</p>`
                  : nothing}
              </header>
            `
          : nothing;

      const scrollButton = nextSection
        ? html`
            <nav class="home-section-next">
              <button
                class="btn-outline btn-sm icon-only"
                aria-label="Scroll to next section"
                @click=${() => this._scrollToSection(nextSection.id)}
              >
                <pds-icon icon="arrow-down"></pds-icon>
              </button>
            </nav>
          `
        : html`
            <nav class="home-section-next">
              <button
                class="btn-outline btn-sm icon-only"
                aria-label="Back to top"
                @click=${() => this._scrollToSection(HOME_CONTENT[0]?.id)}
              >
                <pds-icon icon="arrow-down" rotate="180"></pds-icon>
              </button>
            </nav>
          `;

      const context = {
        header: section.type === "hero" ? nothing : header,
        renderBlock: null,
        renderBlocks: null,
        scrollToSection: (target) => this._scrollToSection(target),
        scrollButton,
      };

      const renderBlock = (block) =>
        BLOCK_RENDERERS[block?.type]?.(block, context) ?? nothing;

      context.renderBlock = renderBlock;
      context.renderBlocks = (blocks) => (blocks || []).map(renderBlock);

      if (section.type === "hero") {
        const heroPanel = {
          type: "hero-panel",
          title: section.title,
          lead: section.lead,
          logo: section.logo,
          logoAlt: section.logoAlt,
        };
        const heroBlocks = [heroPanel, ...(section.blocks || [])];

        return html`
          <section
            class="home-section home-hero"
            data-home-section=${section.id}
          >
            ${context.renderBlocks(heroBlocks)} ${scrollButton}
          </section>
        `;
      }

      if (section.type === "cards") {
        return html`
          <section
            class="home-section ${section.surfaceClass || ""}"
            data-home-section=${section.id}
          >
            <div class="stack-lg">
              ${header} ${context.renderBlocks(section.blocks)} ${scrollButton}
            </div>
          </section>
        `;
      }

      if (section.type === "custom") {
        return (
          CUSTOM_RENDERERS[section.customKey]?.(section, context) ?? nothing
        );
      }

      return nothing;
    }

    render() {
      return html`
        <pds-fab
          @satellite-click=${this.#handleFabSatelliteClick}
          class="home-fab"
          .satellites=${[
            { key: "start", icon: "rocket", label: "Launch Starter" },
            { key: "docs", icon: "book-open", label: "Explore Docs" },
            { key: "storybook", icon: "book-open", label: "View Storybook" },
          ]}
        >
          <pds-icon icon="rocket"></pds-icon>
        </pds-fab>

        <div class="pds-home stack-lg">
          ${HOME_CONTENT.map((section, index) =>
            this.#renderSection(section, index),
          )}
        </div>

        <pds-omnibox
          class="grow"
          id="pds-home-omnibox"
          placeholder="Search tokens, components, and utilities..."
        ></pds-omnibox>

        <footer>
          &copy; ${new Date().getFullYear()} pure-ds.com. All rights reserved.
        </footer>
      `;
    }

    #handleFabSatelliteClick(event) {
      const key = event.detail?.key;
      switch (key) {
        case "start":
          this._scrollToSection("highlights");
          break;

        case "storybook":
          window.open(
            "https://storybook.pure-ds.com/",
            "_blank",
          );
          break;
      }
    }
  },
);
