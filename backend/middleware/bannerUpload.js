import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = "uploads";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `banner_${Date.now()}_${Math.round(Math.random() * 1e6)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (/image\//.test(file.mimetype)) cb(null, true);
  else cb(new Error("Banner must be an image"));
};

export const uploadBannerImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("image");
