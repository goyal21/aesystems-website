// Captures one seamless loop of design/saar-architecture-loop.html with a
// headless browser and encodes it to an optimized animated GIF via ffmpeg.
//
// Frame timing is deterministic: every CSS animation on the page is paused
// and then explicitly seeked (via the Chrome DevTools "Animation" domain)
// to an exact millisecond before each screenshot. This avoids relying on
// real wall-clock pacing, which is unusable here since a single headless
// screenshot at 1920x1080 takes far longer than one frame interval would
// allow under real-time capture.
//
//   node scripts/render-saar-gif.mjs
import { chromium } from "playwright";
import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const URL = "http://localhost:8899/saar-architecture-loop.html";
const LOOP_MS = 5000;
const FPS = 24;
const FRAME_COUNT = Math.round((LOOP_MS / 1000) * FPS);

const framesDir = path.join(root, "design", "_frames");
fs.rmSync(framesDir, { recursive: true, force: true });
fs.mkdirSync(framesDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 864 } });

const client = await page.context().newCDPSession(page);
await client.send("Animation.enable");

const animationIds = new Set();
client.on("Animation.animationStarted", (event) => {
  animationIds.add(event.animation.id);
});

await page.goto(URL, { waitUntil: "networkidle" });
// give every `animation: ... infinite` rule a moment to fire its
// animationStarted event (they all start immediately on load).
await page.waitForTimeout(500);

console.log(`Tracked ${animationIds.size} animations.`);
if (animationIds.size === 0) {
  throw new Error("No animations were detected — check the page loaded correctly.");
}

// Freeze real-time playback entirely; we drive time ourselves from here on.
await client.send("Animation.setPlaybackRate", { playbackRate: 0 });

console.log(`Capturing ${FRAME_COUNT} frames across ${LOOP_MS}ms (seeked, not real-time)...`);
for (let i = 0; i < FRAME_COUNT; i++) {
  const t = Math.round((i / FRAME_COUNT) * LOOP_MS);
  await client.send("Animation.seekAnimations", {
    animations: [...animationIds],
    currentTime: t,
  });
  const file = path.join(framesDir, `f${String(i).padStart(4, "0")}.png`);
  await page.screenshot({ path: file });
  if (i % 20 === 0) console.log(`  frame ${i}/${FRAME_COUNT} @ t=${t}ms`);
}
await browser.close();
console.log("Capture complete.");

const outDir = path.join(root, "design");
const palette = path.join(framesDir, "palette.png");
const gifOut = path.join(outDir, "saar-architecture-loop.gif");

function run(args) {
  console.log("$ ffmpeg", args.join(" "));
  execFileSync(ffmpegPath, args, { stdio: "inherit" });
}

run([
  "-y",
  "-framerate", String(FPS),
  "-i", path.join(framesDir, "f%04d.png"),
  "-vf", "fps=" + FPS + ",scale=1920:864:flags=lanczos,palettegen=stats_mode=diff",
  palette,
]);

run([
  "-y",
  "-framerate", String(FPS),
  "-i", path.join(framesDir, "f%04d.png"),
  "-i", palette,
  "-lavfi", "fps=" + FPS + ",scale=1920:864:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:diff_mode=rectangle",
  "-loop", "0",
  gifOut,
]);

const sizeMb = (fs.statSync(gifOut).size / 1024 / 1024).toFixed(2);
console.log(`\nWrote ${gifOut} (${sizeMb} MB)`);
