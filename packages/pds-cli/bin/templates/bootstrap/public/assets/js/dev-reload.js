const shouldConnect =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";

if (shouldConnect) {
  const reloadPort = 4174;
  const endpoint = location.protocol + "//" + location.hostname + ":" + reloadPort + "/events";
  const minReloadIntervalMs = 800;
  let source;
  let reconnectTimer;
  let isReloading = false;
  let lastReloadAt = Number(sessionStorage.getItem("__pdsLastReloadAt") || "0");

  function shouldReloadNow() {
    const now = Date.now();
    if (isReloading) {
      return false;
    }
    if (now - lastReloadAt < minReloadIntervalMs) {
      return false;
    }
    isReloading = true;
    lastReloadAt = now;
    sessionStorage.setItem("__pdsLastReloadAt", String(lastReloadAt));
    return true;
  }

  function handleReloadEvent(event) {
    const data = (event && event.data) || "";
    if (data === "reload") {
      if (shouldReloadNow()) {
        location.reload();
      }
      return;
    }

    try {
      const payload = JSON.parse(data);
      if (payload && payload.type === "reload" && shouldReloadNow()) {
        location.reload();
      }
    } catch {
      // Ignore non-JSON messages like keepalive comments.
    }
  }

  function connect() {
    source = new EventSource(endpoint);
    source.addEventListener("reload", handleReloadEvent);
    source.onmessage = handleReloadEvent;

    source.onerror = () => {
      source.close();

      if (isReloading || reconnectTimer) {
        return;
      }

      reconnectTimer = setTimeout(() => {
        reconnectTimer = undefined;
        connect();
      }, 1000);
    };
  }

  window.addEventListener("beforeunload", () => {
    isReloading = true;
    if (source) {
      source.close();
    }
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = undefined;
    }
  });

  connect();
}
