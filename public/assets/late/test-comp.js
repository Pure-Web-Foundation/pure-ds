customElements.define(
  "test-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = this.render();
    }

    render() {
      return /* html */ `<h1>Hello from Test Comp</h1><div>
      
      <nav data-dropdown>
        <button type="button" data-prepend-icon="☰">Menu</button>
        <menu>
          <li><a href="#">Account</a></li>
          <li><a href="#">Contact</a></li>
          <li><hr /></li>
          <li><a href="#">Sign out</a></li>
        </menu>
      </nav>
      
      `;
    }
  }
);
