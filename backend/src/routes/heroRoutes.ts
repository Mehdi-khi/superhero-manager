import express from "express";
import {
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
} from "../controllers/heroController";

import { upload } from "../middleware/uploadMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.get("/", getHeroes);
router.get("/:id", getHeroById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "editor"]),
  upload.single("image"),
  createHero
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "editor"]),
  upload.single("image"),
  updateHero
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteHero
);

export default router;