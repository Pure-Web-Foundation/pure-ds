import { html } from 'lit';

export default {
  title: 'Primitives/Media Elements',
  parameters: {
    docs: {
      description: {
        component: 'Responsive images, figures with captions, image galleries, and video elements with proper semantic HTML.'
      }
    }
  }
};

const mediaStoryStyles = html`
  <style>
    .media-story-section {
      padding: var(--spacing-4);
    }
    .media-responsive-grid {
      display: grid;
      gap: var(--spacing-6);
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    .media-gallery-grid {
      display: grid;
      gap: var(--spacing-3);
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    .media-scroll-image,
    .media-gallery-image {
      width: 100%;
      height: auto;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
    }
    .media-scroll-image {
      width: auto;
    }
    .media-video-shell {
      max-width: 56.25rem;
    }
    .media-video-figure {
      margin-top: var(--spacing-4);
    }
    .media-video-element {
      width: 100%;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
    }
    .media-mixed-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-6);
      margin-top: var(--spacing-4);
    }
    .media-thumbnail-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-2);
    }
    .media-thumbnail-image {
      width: 100%;
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-sm);
    }
  </style>
`;

export const ResponsiveImages = () => html`
  ${mediaStoryStyles}
  <div class="media-story-section">
    <div class="media-responsive-grid">
      <figure class="media-figure">
        <img
          class="media-image"
          src="https://picsum.photos/800/600?random=1"
          alt="Random landscape"
          loading="lazy"
        />
        <figcaption class="media-caption">
          <strong>Figure 1:</strong> A beautiful landscape demonstrating image handling in the design system.
        </figcaption>
      </figure>

      <figure class="media-figure">
        <img
          class="media-image"
          src="https://picsum.photos/800/600?random=2"
          alt="Random architecture"
          loading="lazy"
        />
        <figcaption class="media-caption">
          <strong>Figure 2:</strong> Architectural photography showcasing the responsive image behavior.
        </figcaption>
      </figure>
    </div>
  </div>
`;

ResponsiveImages.storyName = 'Responsive Images';

export const ImageGallery = () => html`
  ${mediaStoryStyles}
  <div class="media-story-section">
    <h3>Image Gallery Grid</h3>
    <div class="gallery-grid media-gallery-grid">
      ${Array.from({ length: 8 }, (_, i) => html`
        <img
          class="gallery-image media-gallery-image"
          src="https://picsum.photos/400/400?random=${i + 3}"
          alt="Gallery image ${i + 1}"
          loading="lazy"
        />
      `)}
    </div>
  </div>
`;

ImageGallery.storyName = 'Image Gallery';

export const ScrollRowGallery = () => html`
  ${mediaStoryStyles}
  <div class="media-story-section">
    <h3>Netflix-Style Horizontal Scroll Row</h3>
    <pds-scrollrow>
      ${Array.from({ length: 20 }, (_, i) => html`
        <img
          loading="lazy"
          class="gallery-image media-scroll-image"
          src="https://picsum.photos/200/200?random=${i + 10}"
          alt="Gallery image ${i + 1}"
        />
      `)}
    </pds-scrollrow>
  </div>
`;

ScrollRowGallery.storyName = 'Horizontal Scroll Row';

export const VideoElement = () => html`
  ${mediaStoryStyles}
  <div class="media-story-section media-video-shell">
    <h3>Video Element with Controls</h3>
    <figure class="video-container media-video-figure">
      <video
        class="video-element media-video-element"
        controls
        poster="https://picsum.photos/1200/675?random=7"
      >
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <figcaption class="media-caption">
        <strong>Video Demo:</strong> Big Buck Bunny sample video demonstrating video element styling.
      </figcaption>
    </figure>
  </div>
`;

VideoElement.storyName = 'Video Element';

export const MixedMedia = () => html`
  ${mediaStoryStyles}
  <div class="media-story-section">
    <h2>Mixed Media Layout</h2>
    
    <div class="media-mixed-layout">
      <div>
        <h3>Featured Image</h3>
        <figure class="media-figure">
          <img
            class="media-image"
            src="https://picsum.photos/600/400?random=20"
            alt="Featured content"
            loading="lazy"
          />
          <figcaption class="media-caption">
            High-resolution featured image with caption
          </figcaption>
        </figure>
      </div>
      
      <div>
        <h3>Thumbnail Grid</h3>
        <div class="media-thumbnail-grid">
          ${Array.from({ length: 4 }, (_, i) => html`
            <img
              src="https://picsum.photos/200/200?random=${i + 30}"
              alt="Thumbnail ${i + 1}"
              loading="lazy"
              class="media-thumbnail-image"
            />
          `)}
        </div>
      </div>
    </div>
  </div>
`;

MixedMedia.storyName = 'Mixed Media Layout';
