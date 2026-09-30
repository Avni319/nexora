import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createTeam,
  getTeams,
  deleteTeam,
   updateTeam,
  addMemberToTeam,
  removeMemberFromTeam,
} from "../controllers/teamController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createTeam
);

router.get(
  "/:organizationId",
  authMiddleware,
  getTeams
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTeam
);

router.patch(
  "/:id",
  authMiddleware,
  updateTeam
);

router.post(
  "/:id/member",
  authMiddleware,
  addMemberToTeam
);

router.delete(
  "/:id/member/:memberId",
  authMiddleware,
  removeMemberFromTeam
);

export default router;