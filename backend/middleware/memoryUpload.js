import multer from "multer";

// Keep the file in memory so we can stream it straight to Google Drive.
export const memoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
}).single("file");
