import express from "express";
import { getUsers, getLogs } from "../controllers/adminController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.get("/users", authMiddleware, roleMiddleware(["admin"]), getUsers);
router.get("/logs", authMiddleware, roleMiddleware(["admin"]), getLogs);

export default router;