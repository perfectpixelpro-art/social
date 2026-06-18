import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = "uploads";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `media_${Date.now()}_${Math.round(Math.random() * 1e6)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (/image\/|video\//.test(file.mimetype)) cb(null, true);
  else cb(new Error("Only images and videos are allowed"));
};

// Up to 10 media files per post.
export const uploadPostMedia = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB for videos
}).array("media", 10);
