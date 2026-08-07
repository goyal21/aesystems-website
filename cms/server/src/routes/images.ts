import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { Router } from "express";
import multer from "multer";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";
import { config } from "../config.js";
import { requireAuth } from "../auth.js";
import { asyncHandler } from "../asyncHandler.js";

fs.mkdirSync(config.uploadTmpDir, { recursive: true });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB, matches the admin UI's stated ceiling
});

const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"]);

export const imagesRouter = Router();

imagesRouter.post("/upload", requireAuth, upload.single("image"), asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No image file provided" });

  const detected = await fileTypeFromBuffer(file.buffer);
  if (!detected || !ALLOWED_MIME.has(detected.mime)) {
    return res.status(400).json({ error: "File is not a recognized image (PNG/JPEG/WebP/GIF/AVIF)" });
  }

  // Re-encode to WebP and cap dimensions: images.unoptimized=true means whatever
  // we save here is what visitors download byte-for-byte, so compress at upload
  // time rather than trusting the source file. Animated GIFs are passed through
  // as-is (re-encoding would drop animation) but still validated above.
  let outBuffer: Buffer;
  let ext: string;
  if (detected.mime === "image/gif") {
    outBuffer = file.buffer;
    ext = "gif";
  } else {
    outBuffer = await sharp(file.buffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    ext = "webp";
  }

  const filename = `${crypto.randomUUID()}.${ext}`;
  const tmpPath = path.join(config.uploadTmpDir, filename);
  await fs.promises.writeFile(tmpPath, outBuffer);

  res.json({
    tmpId: filename,
    sizeBytes: outBuffer.length,
  });
}));
