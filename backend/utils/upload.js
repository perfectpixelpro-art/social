import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

let configured = null;
function cloud() {
  if (configured === null) {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
      cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET });
      configured = true;
    } else {
      configured = false;
    }
  }
  return configured;
}

export const cloudEnabled = () => cloud();

// Turn a multer disk file into a persistent URL.
// → Cloudinary (if configured) so files survive redeploys; else local /uploads (dev fallback).
export async function fileToUrl(file) {
  if (!file) return "";
  if (cloud()) {
    try {
      const res = await cloudinary.uploader.upload(file.path, { resource_type: "auto", folder: "thesocial99" });
      fs.unlink(file.path, () => {}); // remove the temp local copy
      return res.secure_url;
    } catch (e) {
      console.warn("Cloudinary upload failed, using local file:", e.message);
    }
  }
  const base = process.env.SERVER_URL || "http://localhost:5001";
  return `${base}/uploads/${file.filename}`;
}

// Fetch the bytes of a stored media URL (works for Cloudinary or local URLs).
export async function urlToBuffer(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Could not fetch media (${r.status})`);
  return Buffer.from(await r.arrayBuffer());
}
