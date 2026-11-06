import { Router } from "express";
import { ModerationController } from "./moderation.controller.js";

const router = Router();

router.get("/", ModerationController.getAll);

router.get("/eagerly/:id", ModerationController.getEagerlyById);

router.get("/:id", ModerationController.getById);

router.post("/", ModerationController.create);

router.put("/:id", ModerationController.update);

router.delete("/:id", ModerationController.delete);

export default router;