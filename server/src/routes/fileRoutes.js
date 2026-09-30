import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  uploadFile,
  getFiles,
  deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

router.get(
  "/:projectId",
  authMiddleware,
  getFiles
);

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  uploadFile
);

router.delete(
  "/:id",
  authMiddleware,
  deleteFile
);

export default router;