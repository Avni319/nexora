import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { joinMeeting } from "../controllers/meetingController.js";

const router = express.Router();

router.post(
  "/join",
  authMiddleware,
  joinMeeting
);

export default router;