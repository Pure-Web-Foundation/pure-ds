const esbuild = require("esbuild");
const http = require("http");

const reloadPort = 4174;
const reloadClients = new Set();

function removeClient(client) {
  reloadClients.delete(client);
}

function startReloadServer() {
  const server = http.createServer((req, res) => {
    const reqUrl = new URL(req.url || "/", "http://localhost");
    if (reqUrl.pathname !== "/events") {
      res.writeHead(404);
      res.end();
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });

    // Keep reconnects gentle if the server restarts briefly.
    res.write("retry: 1500\n\n");
    reloadClients.add(res);

    const cleanup = () => removeClient(res);
    req.on("close", cleanup);
    req.on("aborted", cleanup);
    res.on("close", cleanup);
    res.on("error", cleanup);

    // Initial comment flushes headers and confirms stream is alive.
    res.write(": connected\n\n");
  });

  const heartbeat = setInterval(() => {
    for (const client of reloadClients) {
      if (client.destroyed || client.writableEnded) {
        removeClient(client);
        continue;
      }

      try {
        client.write(": keepalive\n\n");
      } catch {
        removeClient(client);
      }
    }
  }, 15000);

  heartbeat.unref();

  const shutdown = () => {
    clearInterval(heartbeat);
    for (const client of reloadClients) {
      try {
        client.end();
      } catch {
        // Ignore teardown errors.
      }
    }
    reloadClients.clear();
    server.close();
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);

  server.on("error", (err) => {
    console.error("Live reload server error:", err);
  });

  server.listen(reloadPort, () => {
    console.log("Live reload listening on http://localhost:" + reloadPort + "/events");
  });
}

function notifyReload() {
  const payload = JSON.stringify({ type: "reload", t: Date.now() });
  for (const client of reloadClients) {
    if (client.destroyed || client.writableEnded) {
      removeClient(client);
      continue;
    }

    try {
      client.write("event: reload\n");
      client.write("data: " + payload + "\n\n");
    } catch {
      removeClient(client);
    }
  }
}

function liveReloadPlugin() {
  return {
    name: "live-reload",
    setup(build) {
      build.onEnd((result) => {
        if (!result.errors.length) {
          notifyReload();
        }
      });
    },
  };
}

async function start() {
  startReloadServer();
  const ctx = await esbuild.context({
    entryPoints: ["src/js/app.js"],
    outdir: "public/assets/js",
    bundle: true,
    format: "esm",
    sourcemap: true,
    publicPath: "/assets/js",
    external: ["/assets/my/*"],
    logLevel: "info",
    plugins: [liveReloadPlugin()],
  });

  await ctx.watch();
  const { host, port } = await ctx.serve({ servedir: "public", port: 4173 });
  console.log("Dev server running at http://" + host + ":" + port);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
