/**
 * Toast utility for displaying form data in stories
 * Handles objects, FormData, and truncates large binary data
 */

const MAX_STRING_LENGTH = 1000;
const MAX_BINARY_PREVIEW = 50;

/**
 * Converts various data types to a displayable JSON string
 * @param {*} data - Can be an object, FormData, or any serializable data
 * @returns {Promise<void>}
 */
export async function toastFormData(data) {
  let obj = data;

  // Convert FormData to plain object
  if (data instanceof FormData) {
    obj = {};
    for (const [key, value] of data.entries()) {
      // Handle File objects
      if (value instanceof File) {
        const fileInfo = {
          name: value.name,
          size: value.size,
          type: value.type,
          lastModified: new Date(value.lastModified).toISOString(),
          __truncated: true,
          __note: 'Binary data not shown'
        };
        // Handle multiple files with same name
        if (obj[key]) {
          obj[key] = Array.isArray(obj[key]) ? [...obj[key], fileInfo] : [obj[key], fileInfo];
        } else {
          obj[key] = fileInfo;
        }
      } else {
        // Handle multiple values with same key (checkboxes, multi-select)
        if (obj[key]) {
          obj[key] = Array.isArray(obj[key]) ? [...obj[key], value] : [obj[key], value];
        } else {
          obj[key] = value;
        }
      }
    }
    
    // Convert arrays to comma-separated strings for display
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        // Check if it's an array of file objects
        if (obj[key][0]?.__truncated) {
          // Keep file arrays as arrays
          continue;
        }
        // Convert value arrays to comma-separated string
        obj[key] = obj[key].join(', ');
      }
    }
  }

  // Recursively truncate large strings and binary data
  const truncateData = (item) => {
    if (item === null || item === undefined) return item;
    
    if (typeof item === 'string') {
      if (item.length > MAX_STRING_LENGTH) {
        return item.substring(0, MAX_STRING_LENGTH) + `... (truncated, ${item.length} chars total)`;
      }
      return item;
    }
    
    if (Array.isArray(item)) {
      return item.map(truncateData);
    }
    
    if (typeof item === 'object') {
      // Handle File objects that might be nested in regular objects
      if (item instanceof File) {
        return {
          name: item.name,
          size: item.size,
          type: item.type,
          lastModified: new Date(item.lastModified).toISOString(),
          __truncated: true,
          __note: 'Binary data not shown'
        };
      }
      
      // Handle Blob objects
      if (item instanceof Blob) {
        return {
          size: item.size,
          type: item.type,
          __truncated: true,
          __note: 'Binary data not shown'
        };
      }
      
      // Handle ArrayBuffer and typed arrays
      if (item instanceof ArrayBuffer || ArrayBuffer.isView(item)) {
        const size = item.byteLength || item.length;
        return {
          type: item.constructor.name,
          size: size,
          preview: size > 0 ? `[${Array.from(new Uint8Array(item.buffer || item).slice(0, MAX_BINARY_PREVIEW)).join(', ')}${size > MAX_BINARY_PREVIEW ? '...' : ''}]` : '[]',
          __truncated: true,
          __note: `Binary data preview (${size} bytes total)`
        };
      }
      
      const result = {};
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          result[key] = truncateData(item[key]);
        }
      }
      return result;
    }
    
    return item;
  };

  const truncated = truncateData(obj);
  const formatted = JSON.stringify(truncated, null, 2);

  // Ensure pds-toaster exists and show the toast
  let toaster = document.querySelector('pds-toaster');
  if (!toaster) {
    toaster = document.createElement('pds-toaster');
    document.body.appendChild(toaster);
  }
  
  // Wait for the custom element to be defined before calling methods
  await customElements.whenDefined('pds-toaster');
  
  toaster.toast(formatted, {
    type: 'success',
    duration: 5000
  });

  // Also log to console for debugging
  console.log('Form data:', truncated);
}

// Make toastFormData available globally for inline event handlers
if (typeof window !== 'undefined') {
  window.toastFormData = toastFormData;
}
