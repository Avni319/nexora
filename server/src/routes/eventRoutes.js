import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createEvent,
  getEvents,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get(
  "/:projectId",
  authMiddleware,
  getEvents
);

router.post(
  "/",
  authMiddleware,
  createEvent
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEvent
);

export default router;