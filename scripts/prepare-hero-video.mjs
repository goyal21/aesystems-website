import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const src = path.join(root, "assets", "Hero Section Video.mp4");
const outDir = path.join(root, "public", "assets");

function run(args, label) {
  console.log(`\n$ ffmpeg ${args.join(" ")}`);
  execFileSync(ffmpegPath, args, { stdio: "inherit" });
  console.log(`✔ ${label}`);
}

// Poster still — first frame, sized for a 100vh hero
run(
  [
    "-y",
    "-i", src,
    "-ss", "0.5",
    "-vframes", "1",
    "-vf", "scale=1920:-2",
    "-q:v", "3",
    path.join(outDir, "hero-poster.jpg"),
  ],
  "poster still",
);

// Compressed H.264 MP4 — no audio, target well under 4MB for a ~10-20s loop
run(
  [
    "-y",
    "-i", src,
    "-an",
    "-vf", "scale=1920:-2",
    "-c:v", "libx264",
    "-preset", "veryslow",
    "-crf", "33",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    path.join(outDir, "hero.mp4"),
  ],
  "compressed hero.mp4",
);

// WebM (VP9) fallback
run(
  [
    "-y",
    "-i", src,
    "-an",
    "-vf", "scale=1920:-2",
    "-c:v", "libvpx-vp9",
    "-b:v", "0",
    "-crf", "42",
    "-row-mt", "1",
    path.join(outDir, "hero.webm"),
  ],
  "hero.webm",
);
