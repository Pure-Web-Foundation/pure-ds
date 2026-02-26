export const HOME_CONTENT = [
  {
    id: "hero",
    type: "hero",
    title: "Pure Design System",
    lead: "Design systems that generate themselves. Configure once, ship consistent UI everywhere, and start building fast with only actual web standards.",
    logo: "/assets/img/pds-logo.svg",

  },
  {
    id: "intro",
    type: "cards",
    title: "What is PDS?",
    lead: "The essence of PDS in four points.",
    blocks: [
      {
        type: "cards",
        cardVariant: "feature",
        cards: [
          {
            title: "Pure Web Manifesto, materialized",
            body: "HTML & CSS First, Progressive Enhancement by default, and Web Components only when the platform truly needs extending. PDS is the de-facto materialized [Pure Web Manifesto](https://pureweb.dev/manifesto).",
            icon: "squares-four",
          },
          {
            title: "Design System, generated",
            body: "Turn a **Deterministic Config** into a cohesive, light & dark mode supporting, system of color, type, spacing, and motion.",
            icon: "palette",
          },
          {
            title: "Bundle Splitting, made redundant",
            body: "Web-components are auto-defined when they're actually being used. Custom elements now **really** work like native HTML tags.",
            icon: "lightning",
          },
          {
            title: "AI Support, built-in",
            body: "PDS comes with LLM instructions that help your coding agent understand your design system and generate consistent UI. These instructions are automatically added for **Cursor** and **GitHub Copilot** Coding Agents.",
            icon: "magic-wand",
          },
        ],
      },
    ],
  },
  {
    id: "highlights",
    type: "cards",
    title: "Signature PDS moments",
    lead: "A quick tour of the experiences teams love: expressive surfaces, intentional motion, and thoughtful UI defaults.",
    blocks: [
      {
        type: "cards",
        cardVariant: "feature",
        cards: [
          {
            title: "Configurable presets",
            body: "Start with a preset, then customize with your own tokens and surfaces.",
            icon: "list",
            extra:
              "<div class='omnibox-shell'><pds-omnibox id='pds-home-preset-omnibox' placeholder='Search presets...'></pds-omnibox><small class='text-muted'>Pick a preset to preview the system.</small></div>",
          },
          {
            title: "Smart surfaces",
            body: "Auto-balanced backgrounds, text, and shadows across light and dark.",
            icon: "magic-wand",
            extra: "<pds-theme></pds-theme>",
          },
          {
            title: "Composable layout",
            body: "Stack, grid, and utility patterns that scale from dashboard to landing page. But without turning your project into div-soup with utility classes — [learn more](https://storybook.pure-ds.com/?path=/story/foundations-layout--layout-introduction)",
            icon: "grid-four",
          },
          {
            title: "Enhancements",
            body: "For a lot of functionality, there's no need for components — just sprinkle in a class name or a data-attribute and let the system handle the rest. [learn more](https://storybook.pure-ds.com/?path=/story/enhancements)",
            icon: "sparkle",
          },
          {
            title: "Components",
            body: "PDS is not a component library, but it does include a set of thoughtfully designed, accessible, and customizable **Web Components** for when you need them.",
            icon: "gear",
          },
        ],
      },
    ],
  },
  {
    id: "momentum",
    type: "cards",
    surfaceClass: "surface-base",
    title: "Momentum, engineered",
    lead: "Build a system that feels crafted from day one. PDS turns decisions into a living, searchable design language.",
    blocks: [
      {
        type: "cards",
        cardLayout: "columns",
        cardVariant: "stack",
        cardIconSize: "lg",
        cards: [
          {
            title: "Time to first UI",
            body: "The PDS Project Initializer <code>npm init @pure-ds/app</code> generates boilerplate within seconds.",
            icon: "chart-line",
          },
          {
            title: "Built-in guardrails",
            body: "Accessible defaults keep every surface consistent.",
            icon: "shield-check",
          },
        ],
      },
      {
        type: "callout",
        variant: "success",
        icon: "sparkle",
        title: "Design decisions you can reuse",
        body: "Every tweak updates tokens, surfaces, and components in real time.",
      },
    ],
  },
  {
    id: "advantages",
    type: "cards",
    title: "Why teams love PDS",
    lead: "What teams cite most often when they adopt PDS.",
    blocks: [
      {
        type: "list",
        items: [
          {
            title: "All PDS layers are optional",
            body: "If you just want the tokens, use the generator offline (CLI) and consume the CSS variables. If you want the enhancements but not the components, use the helper classes and data attributes without the web components. If you want the components, use them alongside any other UI framework. It's your system.",
            icon: "shield-check",
          },
          {
            title: "Faster alignment, fewer debates",
            body: "Move decisions into shared tokens so reviews stay focused and intentional.",
            icon: "grid-four",
          },
          {
            title: "Lower cognitive load",
            body: "Compose with readable, semantic HTML and patterns instead of memorizing utility soups or Framework abstractions.",
            icon: "sparkle",
          },
          {
            title: "Change becomes cheap",
            body: "Simple config updates can rebrand, adjust density, or ship dark mode safely.",
            icon: "lightning",
          },
          {
            title: "Design + dev in sync",
            body: "Scales, ratios, and semantics stay shared across tools and code.",
            icon: "palette",
          },
          {
            title: "Progressive by default",
            body: "Start with HTML + CSS, add enhancements, then components only when needed.",
            icon: "magic-wand",
          },
          {
            title: "Senior-friendly onboarding",
            body: "Experienced devs recognize the real web, so contributions ramp fast.",
            icon: "shield-check",
          },
          {
            title: "Scales across products",
            body: "One system can serve multiple apps without visual sameness or forks.",
            icon: "chart-line",
          },
        ],
      },
    ],
  },
  {
    id: "gallery",
    type: "custom",
    customKey: "gallery",
    surfaceClass: "surface-base",
    title: "Rich Content — using only standards",
    lead: "PDS has utility classes, but at a higher semantic level: structural layout primitives, not UI styling micro-controls.",
    blocks: [
      {
        type: "gallery",
        items: [
          {
            title: "Orbit Desk Lamp",
            price: "$149",
            description: "Sculpted aluminum with dimmable glow.",
            image: "https://picsum.photos/320/240?random=101",
          },
          {
            title: "Summit Travel Pack",
            price: "$98",
            description: "Weather-ready, modular, and carry-on friendly.",
            image: "https://picsum.photos/320/240?random=102",
          },
          {
            title: "Aria Studio Monitor",
            price: "$249",
            description: "Crystal sound with a warm balanced tone.",
            image: "https://picsum.photos/320/240?random=103",
          },
          {
            title: "Mosaic Coffee Set",
            price: "$72",
            description: "Hand-finished ceramics with matte glaze.",
            image: "https://picsum.photos/320/240?random=104",
          },
          {
            title: "Nimbus Office Chair",
            price: "$319",
            description: "Ergonomic support with breathable mesh.",
            image: "https://picsum.photos/320/240?random=105",
          },
        ],
      },
    ],
  },
  {
    id: "forms",
    type: "custom",
    customKey: "forms",
    title: "HTML Forms with PDS Intelligence",
    lead: "Rich, schema-driven, native HTML forms that bind to your data models and integrate with PDS intelligence.",
    blocks: [
      {
        type: "form",
        id: "pds-home-form",
        schema: {
          type: "object",
          required: ["identity", "project", "preferences"],
          properties: {
            identity: {
              type: "object",
              title: "Identity",
              required: ["fullName", "email", "role"],
              properties: {
                fullName: {
                  type: "string",
                  title: "Full name",
                  minLength: 2,
                  examples: ["Avery Morgan"],
                },
                email: {
                  type: "string",
                  format: "email",
                  title: "Work email",
                  examples: ["avery@studio.com"],
                },
                company: {
                  type: "string",
                  title: "Company",
                  examples: ["Pulse Labs"],
                },
                role: {
                  type: "string",
                  title: "Role",
                  examples: ["Product Lead"],
                },
              },
            },
            project: {
              type: "object",
              title: "Project",
              required: ["projectType", "goals"],
              properties: {
                projectType: {
                  type: "string",
                  title: "Project focus",
                  oneOf: [
                    { const: "web", title: "Web app" },
                    { const: "mobile", title: "Mobile app" },
                    { const: "system", title: "Design system" },
                    { const: "brand", title: "Brand system" },
                    { const: "other", title: "Other..." },
                  ],
                },
                otherProject: {
                  type: "string",
                  maxLength: 512,
                  title: "Tell us more",
                  examples: ["Creator marketplace with a premium tier"],
                },
                goals: {
                  type: "string",
                  maxLength: 512,
                  examples: [
                    "Unify brand, launch new product UI, and ship faster",
                  ],
                },
              },
            },
            content: {
              type: "object",
              title: "Content",
              properties: {
                notes: {
                  type: "string",
                  title: "Content notes",
                  examples: [
                    "Include multi-brand support and internationalization",
                  ],
                },
                assets: {
                  type: "string",
                  title: "Upload brand assets",
                },
              },
            },
            preferences: {
              type: "object",
              title: "Preferences",
              required: ["acceptTerms"],
              properties: {
                updates: {
                  type: "boolean",
                  title: "Send me product updates",
                },
                darkPreview: {
                  type: "boolean",
                  title: "Preview dark mode by default",
                },
                acceptTerms: {
                  type: "boolean",
                  title: "I agree to the terms",
                },
              },
            },
          },
        },
        uiSchema: {
          "/identity": {
            "ui:layout": "grid",
            "ui:layoutOptions": { columns: "auto", autoSize: "md", gap: "md" },
          },
          "/identity/fullName": {
            "ui:icon": "user",
            "ui:autocomplete": "name",
          },
          "/identity/email": {
            "ui:icon": "envelope",
            "ui:autocomplete": "email",
          },
          "/identity/company": { "ui:icon": "briefcase" },
          "/identity/role": { "ui:widget": "role-omnibox" },
          "/project": {
            "ui:layout": "grid",
            "ui:layoutOptions": { columns: "auto", autoSize: "md", gap: "md" },
          },
          "/project/projectType": { "ui:class": "buttons" },
          "/project/otherProject": {
            "ui:visibleWhen": { "/project/projectType": "other" },
            "ui:requiredWhen": { "/project/projectType": "other" },
          },
          "/project/goals": { "ui:widget": "textarea", "ui:rows": 3 },
          "/content": {
            "ui:layout": "grid",
            "ui:layoutOptions": { columns: "auto", autoSize: "md", gap: "md" },
          },
          "/content/notes": { "ui:widget": "richtext" },
          "/content/assets": { "ui:widget": "upload", "ui:icon": "upload" },
          "/preferences": {
            "ui:layout": "grid",
            "ui:layoutOptions": { columns: "auto", autoSize: "md", gap: "md" },
          },
          "/preferences/updates": {},
          "/preferences/darkPreview": {},
          "/preferences/acceptTerms": {},
        },
        options: {
          widgets: {
            booleans: "toggle-with-icons",
          },
          enhancements: {
            icons: true,
            datalists: true,
            rangeOutput: true,
          },
        },
      },
    ],
  },
  {
    id: "need-help",
    type: "custom",
    customKey: "need-help",
    surfaceClass: "surface-base",
    title: "Need help?",
    lead: "Webinars, consultancy, and component-building to help teams launch PDS with confidence.",
    blocks: [
      {
        type: "cards",
        cardVariant: "feature",
        cardLayout: "columns",
        cardIconSize: "lg",
        cards: [
          {
            title: "Webinars & enablement",
            body: "Live, team-friendly sessions with Q&A, recordings, and tailored guidance.",
            icon: "sparkle",
          },
          {
            title: "Consultancy",
            body: "Audit your system, align tokens, and plan migration paths that stick.",
            icon: "briefcase",
          },
          {
            title: "Component-building",
            body: "Ship custom web components and enhancements aligned to PDS patterns.",
            icon: "gear",
          },
        ],
      },
      {
        type: "list",
        title: "How we help you",
        lead: "This is how we structure our engagements to set teams up for long-term success with PDS.",
        items: [
          {
            title: "Clear scope & outcomes",
            body: "Define goals, success metrics, and artifacts before kickoff.",
            icon: "shield-check",
          },
          {
            title: "Upstream-first",
            body: "Work lands in shared docs, examples, and PRs rather than bespoke forks.",
            icon: "sparkle",
          },
          {
            title: "Time-boxed phases",
            body: "Short discovery, hands-on build, and knowledge transfer.",
            icon: "chart-line",
          },
          {
            title: "Asynchronous handoff",
            body: "Written summaries, recordings, and next steps after each session.",
            icon: "list",
          },
        ],
      },
      {
        type: "callout",
        variant: "success",
        icon: "magic-wand",
        title: "Need help launching PDS quickly?",
        body: "Let us plan a focused engagement and ship the first version together.",
      },
      {
        type: "cta",
        text: "Start a conversation",
        icon: "sparkle",
        href: "mailto:help@pure-ds.com?subject=Need%20help%20with%20PDS",
      },
    ],
  },
  {
    id: "getting-started",
    type: "custom",
    customKey: "getting-started",
    title: "Getting started",
    lead: "Give PDS a go right now",
    blocks: [
      {
        type: "terminal",
        command: "npm init @pure-ds/app",
      },
    ],
  },
  {
    id: "resources",
    type: "cards",
    title: "Resources",
    lead: "Find PDS resources online.",
    blocks: [
      {
        type: "cards",
        cardVariant: "feature",
        cards: [
          {
            title: "Storybook",
            body: "Explore components, patterns, and code in our [Storybook](https://storybook.pure-ds.com/).",
            icon: "book-open",
          },

          {
            title: "NPM package",
            body: "Install from [@pure-ds/core](https://www.npmjs.com/package/@pure-ds/core).",
            icon: "link",
          },
          {
            title: "GitHub repo",
            body: "Browse the source on [GitHub](https://github.com/Pure-Web-Foundation/pure-ds).",
            icon: "code",
          },
          {
            title: "LinkedIn Posts",
            body: "Follow [#puredesignsystem](https://www.linkedin.com/feed/hashtag/puredesignsystem/).",
            icon: "tag",
          },
          {
            title: "CodePen collection",
            body: "Explore examples on [CodePen](https://codepen.io/tag/puredesignsystem).",
            icon: "globe",
          },
        ],
      },
    ],
  },
];
