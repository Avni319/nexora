import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  addMember,
  getMembers,
  removeMember,
} from "../controllers/organizationMemberController.js";

const router = express.Router();

router.post(
  "/:id/members",
  authMiddleware,
  addMember
);

router.get(
  "/:id/members",
  authMiddleware,
  getMembers
);

router.delete(
  "/:id/members/:memberId",
  authMiddleware,
  removeMember
);

export default router;