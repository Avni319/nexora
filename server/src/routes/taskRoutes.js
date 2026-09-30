import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  moveTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);

router.get("/:projectId", authMiddleware, getTasks);

router.patch("/:id", authMiddleware, moveTask);

router.delete("/:id", authMiddleware, deleteTask);

export default router;