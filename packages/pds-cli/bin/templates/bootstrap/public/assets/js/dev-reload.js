const shouldConnect =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";

if (shouldConnect) {
  const reloadPort = 4174;
  const endpoint = "http://localhost:" + reloadPort + "/events";
  const source = new EventSource(endpoint);

  source.onmessage = (event) => {
    if (event.data === "reload") {
      location.reload();
    }
  };

  source.onerror = () => {
    source.close();
  };
}
