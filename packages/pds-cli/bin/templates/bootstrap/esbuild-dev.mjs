import esbuild from "esbuild";
import http from "http";

const reloadPort = 4174;
const reloadClients = new Set();

function startReloadServer() {
  const server = http.createServer((req, res) => {
    if (req.url !== "/events") {
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

    res.write("retry: 1000\n\n");
    reloadClients.add(res);

    req.on("close", () => {
      reloadClients.delete(res);
    });
  });

  server.listen(reloadPort, () => {
    console.log("Live reload listening on http://localhost:" + reloadPort + "/events");
  });
}

function notifyReload() {
  for (const client of reloadClients) {
    client.write("data: reload\n\n");
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
