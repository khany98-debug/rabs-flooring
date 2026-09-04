/**
 * Builds src/lib/media-manifest.json — a flat list of every image file that
 * currently exists under /public/media.
 *
 * Why a generated manifest rather than a runtime fs scan: the asset resolver
 * is used by the Logo, which the header renders, and the header is a client
 * component. Reading the filesystem at render time therefore pulls `node:fs`
 * into the browser bundle, which Turbopack rejects outright.
 *
 * Generating it once before dev/build gives the same behaviour — drop a photo
 * in, it appears — while staying a plain JSON import that works identically on
 * the server and the client.
 *
 * Run automatically by the `predev` and `prebuild` npm scripts.
 */
import { readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mediaRoot = join(root, "public", "media");
const outFile = join(root, "src", "lib", "media-manifest.json");

const EXTENSIONS = new Set([".avif", ".webp", ".jpg", ".jpeg", ".png", ".svg"]);

/** @param {string} dir @param {string} prefix @param {string[]} out */
function walk(dir, prefix, out) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out; // Directory does not exist yet — expected before assets land.
  }

  for (const entry of entries) {
    const next = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      walk(join(dir, entry.name), next, out);
    } else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      out.push(next);
    }
  }
  return out;
}

const files = walk(mediaRoot, "", []).sort();

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(files, null, 2)}\n`);

const label = files.length === 1 ? "file" : "files";
console.log(`[media] ${files.length} ${label} indexed from public/media`);

if (files.length === 0 && !existsSync(mediaRoot)) {
  console.log("[media] public/media not found — every image will render as a branded placeholder.");
}
