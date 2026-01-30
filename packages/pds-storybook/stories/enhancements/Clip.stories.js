import { html } from "#pds/lit";
import { enhancementHeader } from "./_enhancement-header.js";

export default {
  title: "Enhancements/Clip",
  tags: ["data-clip", "clamp", "truncate", "content"],
  parameters: {

    options: {
      selectedPanel: "html-preview/panel",
    },
    pds: {
      tags: ["data-clip", "clamp", "truncate", "content", "interaction", "lines", "more"],
    },
  },
};

export const BasicClip = () => html`
  ${enhancementHeader("clip")}
  <article class="card surface-elevated" data-clip="2">
    <p>
      Pure Design System helps teams build consistent experiences with semantic
      HTML and progressive enhancement.
    </p>
    <p>
      Use the data-clip attribute to line-clamp longer content blocks and let
      users expand the full text when they need it.
    </p>
    <p>
      This is especially helpful for previews, summaries, or any content that
      should stay compact by default.
    </p>
  </article>
`;

export const CustomLabels = () => html`
  ${enhancementHeader("clip", {
    selector: "[data-clip-more][data-clip-less]",
    description:
      " Add data-clip-more and data-clip-less to customize the toggle labels.",
  })}
  <article
    class="card surface-sunken"
    data-clip="2"
    data-clip-more="↓ Show more"
    data-clip-less="↑ Show less"
  >
    <p>
      Keep long announcements tidy while still giving users a quick way to
      expand the full message.
    </p>
    <p>
      Custom labels help align the toggle text with your product voice and make
      the interaction clearer.
    </p>
    <p>
      You can also control the default open state with data-clip-open.
    </p>
  </article>
`;

export const OpenByDefault = () => html`
  ${enhancementHeader("clip", {
    selector: "[data-clip-open=\"true\"]",
    description: " Set data-clip-open to true to start expanded.",
  })}
  <article
    class="card surface-elevated"
    data-clip="1"
    data-clip-open="true"
  >
    <p>
      This example starts expanded so the full content is visible immediately.
    </p>
    <p>
      Toggle the block to collapse the content back to the configured line
      count.
    </p>
    <p>
      Use this when content should be visible by default but still collapsible.
    </p>
  </article>
`;
