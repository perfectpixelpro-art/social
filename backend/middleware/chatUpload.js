import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = "uploads";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `chat_${Date.now()}_${Math.round(Math.random() * 1e6)}${ext}`);
  },
});

const allowed = /image\/|video\/|application\/pdf|application\/msword|application\/vnd|text\/plain/;
const fileFilter = (req, file, cb) => {
  if (allowed.test(file.mimetype)) cb(null, true);
  else cb(new Error("Unsupported file type"));
};

export const uploadChatFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
}).single("file");
