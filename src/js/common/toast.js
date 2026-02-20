/**
 * Toast notification utilities for PDS
 * Ensures pds-toaster component is properly initialized before use
 */

/**
 * Ensures pds-toaster exists in DOM and is fully loaded
 * @returns {Promise<HTMLElement>} The pds-toaster element
 * @private
 */
async function ensureToaster() {
  let toaster = document.querySelector('pds-toaster');
  if (!toaster) {
    toaster = document.createElement('pds-toaster');
    document.body.appendChild(toaster);
    await customElements.whenDefined('pds-toaster');
  }
  return toaster;
}

/**
 * Display a toast notification
 * 
 * This method automatically ensures the pds-toaster component exists and is loaded
 * before displaying the notification. The toaster element is appended to document.body
 * if not already present.
 * 
 * @param {string} message - The message to display
 * @param {Object} [options={}] - Toast configuration
 * @param {"information"|"success"|"warning"|"error"} [options.type="information"] - Toast type/severity
 * @param {number} [options.duration] - Duration in milliseconds (auto-calculated if not provided based on message length)
 * @param {boolean} [options.closable=true] - Whether the toast can be manually closed
 * @param {boolean} [options.persistent=false] - If true, toast won't auto-dismiss (requires manual close)
 * @param {boolean} [options.html=false] - Render `message` as HTML (trusted content only)
 * @param {{label: string, onClick?: Function, dismissOnClick?: boolean}} [options.action] - Optional action button config
 * @returns {Promise<string>} Toast ID (can be used to dismiss programmatically)
 * 
 * @example
 * // Simple success toast
 * await PDS.toast('Changes saved successfully!', { type: 'success' });
 * 
 * @example
 * // Error with custom duration
 * await PDS.toast('Failed to save changes', { 
 *   type: 'error',
 *   duration: 8000 
 * });
 * 
 * @example
 * // Persistent warning (must be manually closed)
 * await PDS.toast('This action cannot be undone', { 
 *   type: 'warning',
 *   persistent: true 
 * });
 * 
 * @example
 * // Get toast ID to dismiss later
 * const toastId = await PDS.toast('Processing...', { persistent: true });
 * // ... later
 * const toaster = document.querySelector('pds-toaster');
 * toaster.dismissToast(toastId);
 */
export async function toast(message, options = {}) {
  const toaster = await ensureToaster();
  return toaster.toast(message, options);
}

/**
 * Display a success toast (convenience method)
 * 
 * @param {string} message - The success message
 * @param {Object} [options={}] - Additional toast options (type is preset to 'success')
 * @returns {Promise<string>} Toast ID
 * 
 * @example
 * await PDS.toast.success('Profile updated!');
 */
toast.success = async function(message, options = {}) {
  return toast(message, { ...options, type: 'success' });
};

/**
 * Display an error toast (convenience method)
 * 
 * @param {string} message - The error message
 * @param {Object} [options={}] - Additional toast options (type is preset to 'error')
 * @returns {Promise<string>} Toast ID
 * 
 * @example
 * await PDS.toast.error('Failed to connect to server');
 */
toast.error = async function(message, options = {}) {
  return toast(message, { ...options, type: 'error' });
};

/**
 * Display a warning toast (convenience method)
 * 
 * @param {string} message - The warning message
 * @param {Object} [options={}] - Additional toast options (type is preset to 'warning')
 * @returns {Promise<string>} Toast ID
 * 
 * @example
 * await PDS.toast.warning('Session will expire in 5 minutes');
 */
toast.warning = async function(message, options = {}) {
  return toast(message, { ...options, type: 'warning' });
};

/**
 * Display an information toast (convenience method)
 * 
 * @param {string} message - The information message
 * @param {Object} [options={}] - Additional toast options (type is preset to 'information')
 * @returns {Promise<string>} Toast ID
 * 
 * @example
 * await PDS.toast.info('New features available!');
 */
toast.info = async function(message, options = {}) {
  return toast(message, { ...options, type: 'information' });
};
