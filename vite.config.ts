import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // In dev we want http://localhost:5173/ (no "/reactjs-template/")
  // but for GH Pages build we keep the subpath base.
  base: command === "serve" ? "/" : "/reactjs-template/",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Creates a custom SSL certificate valid for the local machine.
    // Using this plugin requires admin rights on the first dev-mode launch.
    // https://www.npmjs.com/package/vite-plugin-mkcert
    process.env.HTTPS && mkcert(),
    // Serve a dynamic TonConnect manifest in dev so wallets see the correct URL
    // even when accessing via LAN IP or tunnels (ngrok/localtunnel).
    {
      name: "tonconnect-manifest-dev",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use("/tonconnect-manifest.json", (req, res) => {
          const host = req.headers.host;
          const xfProto = req.headers["x-forwarded-proto"];
          const protoFromHeader = Array.isArray(xfProto) ? xfProto[0] : xfProto;
          const proto =
            protoFromHeader ??
            ((req.socket as any).encrypted ? "https" : "http");

          const origin = host ? `${proto}://${host}` : "http://localhost:5173";

          const body = JSON.stringify(
            {
              url: origin,
              name: "Pay2Join (Dev)",
              // Use a stable icon URL to avoid needing local static icon assets.
              iconUrl: "https://ton.vote/logo.png",
            },
            null,
            2,
          );

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.end(body);
        });
      },
    },
  ],
  resolve: {
    // Keep an explicit alias so builds don't depend on tsconfig-paths plugin behavior.
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    // Some dependencies expect `global` to exist (Node). Map it to the browser global.
    global: "globalThis",
  },
  build: {
    target: "esnext",
    minify: "terser",
  },
  publicDir: "./public",
  server: {
    // Exposes your dev server and makes it accessible for the devices in the same network.
    host: true,
  },
}));
