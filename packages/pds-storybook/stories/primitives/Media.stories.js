import { html } from 'lit';

export default {
  title: 'Primitives/Media Elements',
  tags: ['media', 'image', 'figure', 'gallery', 'video', 'responsive'],
  parameters: {
    pds: {
      tags: ['media', 'image', 'figure', 'gallery', 'video', 'responsive', 'caption', 'img']
    },
    docs: {
      description: {
        component: 'Responsive images, figures with captions, image galleries, and video elements with proper semantic HTML.'
      }
    }
  }
};

// Story-specific styles - only for demo-specific visuals not covered by PDS
const mediaStoryStyles = html`
  <style>
    /* Video shell max-width constraint */
    .story-media-video-shell {
      max-width: 56.25rem;
    }
    /* Violations fixed */
    .story-img-full-width {
      width: 100%;
    }
    .story-img-circle {
      width: 200px;
      aspect-ratio: 1;
    }
  </style>
`;

export const ResponsiveImages = () => html`
  ${mediaStoryStyles}
  <div class="stack-md">
    <div class="grid grid-auto-md gap-lg">
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
  <div class="stack-md">
    <h3>Image Gallery Grid</h3>
    <div class="grid grid-auto-sm gap-sm">
      ${Array.from({ length: 8 }, (_, i) => html`
        <img
          class="img-gallery img-rounded-md shadow-sm"
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
  <div class="stack-md">
    <header>
      <h3>Netflix-Style Horizontal Scroll Row</h3>
      <p class="text-muted">
        Use the <code>&lt;pds-scrollrow&gt;</code> component to create a horizontally scrollable row of images.
      </p>
    </header>
    <pds-scrollrow>
      ${Array.from({ length: 20 }, (_, i) => html`
        <img
          loading="lazy"
          class="img-rounded-md shadow-sm"
          src="https://picsum.photos/200/200?random=${i + 10}"
          alt="Gallery image ${i + 1}"
        />
      `)}
    </pds-scrollrow>
  </div>
`;

ScrollRowGallery.storyName = 'Horizontal Scroll Row';

export const ImageRoundedUtilities = () => html`
  <div class="card">
    <h2>Image Rounded Utilities</h2>
    <p class="text-muted">Apply consistent border-radius to images with <code>.img-rounded-*</code> classes.</p>
  </div>
  
  <div class="grid grid-auto-sm gap-lg">
    <figure>
      <img 
        src="https://picsum.photos/300/200?random=40" 
        alt="Small radius" 
        class="img-rounded-sm story-img-full-width"
      />
      <figcaption><code>.img-rounded-sm</code></figcaption>
    </figure>
    
    <figure>
      <img 
        src="https://picsum.photos/300/200?random=41" 
        alt="Medium radius" 
        class="img-rounded-md story-img-full-width"
      />
      <figcaption><code>.img-rounded-md</code></figcaption>
    </figure>
    
    <figure>
      <img 
        src="https://picsum.photos/300/200?random=42" 
        alt="Large radius" 
        class="img-rounded-lg story-img-full-width"
      />
      <figcaption><code>.img-rounded-lg</code></figcaption>
    </figure>
    
    <figure>
      <img 
        src="https://picsum.photos/300/200?random=43" 
        alt="Extra large radius" 
        class="img-rounded-xl story-img-full-width"
      />
      <figcaption><code>.img-rounded-xl</code></figcaption>
    </figure>
    
    <figure>
      <img 
        src="https://picsum.photos/200/200?random=44" 
        alt="Full radius (circle)" 
        class="img-rounded-full story-img-circle"
      />
      <figcaption><code>.img-rounded-full</code></figcaption>
    </figure>
  </div>
`;

ImageRoundedUtilities.storyName = 'Rounded Utilities';

export const ImageGalleryClass = () => html`
  <div class="card">
    <h2>.img-gallery Utility</h2>
    <p class="text-muted">
      The <code>.img-gallery</code> class creates square, cropped thumbnails perfect for grid galleries.
      Images are set to <code>aspect-ratio: 1</code> and <code>object-fit: cover</code>.
    </p>
  </div>
  
  <div class="grid grid-auto-sm gap-md">
    ${Array.from({ length: 8 }, (_, i) => html`
      <img 
        src="https://picsum.photos/400/600?random=${i + 50}" 
        alt="Gallery item ${i + 1}" 
        class="img-gallery"
      />
    `)}
  </div>
`;

ImageGalleryClass.storyName = '.img-gallery';

export const InlineImages = () => html`
  <div class="card">
    <h2>Inline Images</h2>
    <p class="text-muted">
      Use <code>.img-inline</code> for small images within text flow, like avatars or icons.
    </p>
  </div>
  
  <div class="card stack-md">
    <p>
      The team includes 
      <img src="https://i.pravatar.cc/60?img=1" alt="Alice" class="story-img-inline" />
      Alice, 
      <img src="https://i.pravatar.cc/60?img=2" alt="Bob" class="story-img-inline" />
      Bob, and 
      <img src="https://i.pravatar.cc/60?img=3" alt="Carol" class="story-img-inline" />
      Carol who have been working on this project.
    </p>
    
    <p>
      Click the 
      <img src="https://picsum.photos/60/60?random=60" alt="Settings icon" class="story-img-inline" />
      icon to access settings, or the 
      <img src="https://picsum.photos/60/60?random=61" alt="Help icon" class="story-img-inline" />
      icon for help.
    </p>
  </div>
  
  <div class="card">
    <h3>CSS Properties</h3>
    <pre><code>.story-img-inline {
  display: inline;
  vertical-align: middle;
  border-radius: var(--radius-xs);
  margin: 0 var(--spacing-1);
  max-width: 60px;
  height: auto;
}</code></pre>
  </div>
`;

InlineImages.storyName = 'Inline Images';

export const VideoResponsive = () => html`
  <div class="card">
    <h2>.video-responsive Utility</h2>
    <p class="text-muted">
      The <code>.video-responsive</code> class constrains video width and applies consistent styling.
    </p>
  </div>
  
  <video 
    class="story-video-responsive" 
    controls 
    poster="https://picsum.photos/600/338?random=70"
  >
    <source 
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
      type="video/mp4" 
    />
    Your browser does not support the video tag.
  </video>
  
  <div class="card">
    <h3>CSS Properties</h3>
    <pre><code>.story-video-responsive {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: var(--radius-md);
}</code></pre>
  </div>
`;

VideoResponsive.storyName = '.video-responsive';

export const FigureResponsive = () => html`
  <div class="card">
    <h2>.figure-responsive Utility</h2>
    <p class="text-muted">
      Apply <code>.figure-responsive</code> to figures for full-width responsive images with captions.
    </p>
  </div>
  
  <figure class="figure-responsive">
    <img 
      src="https://picsum.photos/1200/600?random=80" 
      alt="Responsive figure example"
    />
    <figcaption>
      <strong>Figure 1:</strong> This figure scales responsively to fill its container width while maintaining aspect ratio.
    </figcaption>
  </figure>
`;

FigureResponsive.storyName = '.figure-responsive';

export const VideoElement = () => html`
  ${mediaStoryStyles}
  <div class="stack-md media-video-shell">
    <h3>Video Element with Controls</h3>
    <figure class="video-container">
      <video
        class="video-responsive shadow-md"
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
  <div class="stack-md">
    <h2>Mixed Media Layout</h2>
    
    <div class="grid grid-cols-2 gap-lg">
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
        <div class="grid grid-cols-2 gap-sm">
          ${Array.from({ length: 4 }, (_, i) => html`
            <img
              src="https://picsum.photos/200/200?random=${i + 30}"
              alt="Thumbnail ${i + 1}"
              loading="lazy"
              class="img-rounded-sm shadow-sm"
            />
          `)}
        </div>
      </div>
    </div>
  </div>
`;

MixedMedia.storyName = 'Mixed Media Layout';

export const MediaReference = () => html`
  <div class="card">
    <h2>Media Utilities Reference</h2>
  </div>
  
  <table class="table-bordered">
    <thead>
      <tr>
        <th>Class</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>.img-gallery</code></td>
        <td>Square aspect ratio with object-fit: cover for gallery grids</td>
      </tr>
      <tr>
        <td><code>.img-rounded-sm</code></td>
        <td>Small border radius (--radius-sm)</td>
      </tr>
      <tr>
        <td><code>.img-rounded-md</code></td>
        <td>Medium border radius (--radius-md)</td>
      </tr>
      <tr>
        <td><code>.img-rounded-lg</code></td>
        <td>Large border radius (--radius-lg)</td>
      </tr>
      <tr>
        <td><code>.img-rounded-xl</code></td>
        <td>Extra large border radius (--radius-xl)</td>
      </tr>
      <tr>
        <td><code>.img-rounded-full</code></td>
        <td>Full border radius for circles (--radius-full)</td>
      </tr>
      <tr>
        <td><code>.img-inline</code></td>
        <td>Small inline images within text (max 60px)</td>
      </tr>
      <tr>
        <td><code>.video-responsive</code></td>
        <td>Responsive video with max-width and border radius</td>
      </tr>
      <tr>
        <td><code>.figure-responsive</code></td>
        <td>Full-width responsive figure</td>
      </tr>
    </tbody>
  </table>
`;

MediaReference.storyName = 'Reference';
