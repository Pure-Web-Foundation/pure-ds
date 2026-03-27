// src/js/common/toast.js
async function ensureToaster() {
  let toaster = document.querySelector("pds-toaster");
  if (!toaster) {
    toaster = document.createElement("pds-toaster");
    document.body.appendChild(toaster);
    await customElements.whenDefined("pds-toaster");
  }
  return toaster;
}
async function toast(message, options = {}) {
  const toaster = await ensureToaster();
  return toaster.toast(message, options);
}
toast.success = async function(message, options = {}) {
  return toast(message, { ...options, type: "success" });
};
toast.error = async function(message, options = {}) {
  return toast(message, { ...options, type: "error" });
};
toast.warning = async function(message, options = {}) {
  return toast(message, { ...options, type: "warning" });
};
toast.info = async function(message, options = {}) {
  return toast(message, { ...options, type: "information" });
};
export {
  toast
};
//# sourceMappingURL=pds-toast.js.map
