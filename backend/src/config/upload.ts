import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import multer from "multer";
import { AppError } from "../utils/AppError.js";

const uploadDirectory = resolve("uploads");

const storage = multer.diskStorage({
  destination: uploadDirectory,

  filename(_request, file, callback) {
    const extension = extname(file.originalname).toLowerCase();
    callback(null, `${randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 2,
  },
  fileFilter(_request, file, callback) {
    const accepted =
      (file.fieldname === "picture" && file.mimetype.startsWith("image/")) ||
      (file.fieldname === "video" && file.mimetype.startsWith("video/"));

    if (!accepted) {
      callback(new AppError("Tipo de arquivo não permitido."));
      return;
    }

    callback(null, true);
  },
});

export { upload, uploadDirectory };
