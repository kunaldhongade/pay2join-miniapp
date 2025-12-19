// Browser polyfills needed by some TON SDK packages.
// Vite (and modern browsers) do not provide Node globals like `Buffer` by default.

import { Buffer } from "buffer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
if (!g.Buffer) {
  g.Buffer = Buffer;
}

