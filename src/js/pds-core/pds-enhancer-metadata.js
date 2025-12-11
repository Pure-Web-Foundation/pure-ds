export const enhancerMetadata = [
  {
    selector: "nav[data-dropdown]",
    description:
      "Enhances a nav element with data-dropdown to function as a dropdown menu.",
    demoHtml: `
      <nav data-dropdown>
        <button class="btn-primary">Menu</button>
        <menu>
          <li><a href="#">Item 1</a></li>
          <li><a href="#">Item 2</a></li>
        </menu>
      </nav>
    `.trim(),
  },
  {
    selector: "label[data-toggle]",
    description: "Creates a toggle switch element from a checkbox.",
    demoHtml: `
      <label data-toggle>
        <input type="checkbox">
        <span data-label>Enable notifications</span>
      </label>
    `.trim(),
  },
  {
    selector: 'input[type="range"]',
    description: "Enhances range inputs with an attached <output>.",
    demoHtml: `
      <label class="range-output">
        <span data-label>Volume</span>
        <input type="range" min="0" max="100" value="40">
      </label>
    `.trim(),
  },
  {
    selector: "form [required]",
    description:
      "Enhances required form fields using an asterisk in the label.",
    demoHtml: `
      <label>
        <span>Field Label</span>
        <input type="text" required>
      </label>
    `.trim(),
  },
  {
    selector: "fieldset[role=group][data-open]",
    description:
      "Enhances a checkbox/radio group to be open (have a way to add and remove items).",
    demoHtml: `
      <fieldset role="group" data-open>
        <label>
          <span data-label>Test</span>
          <input value="lala" name="test1" type="radio" />
        </label>
      </fieldset>
    `.trim(),
  },
  {
    selector: "button, a[class*='btn-']",
    description:
      "Automatically manages spinner icon for buttons with .btn-working class",
    demoHtml: `
      <button class="btn-primary btn-working">
        <span>Saving</span>
      </button>
    `.trim(),
  },
];
