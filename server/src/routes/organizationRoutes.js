import express from "express";
import { createOrganization, getOrganizations, deleteOrganization } from "../controllers/organizationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrganization);
router.delete("/:id", authMiddleware, deleteOrganization);
router.get("/", authMiddleware, getOrganizations);

export default router;