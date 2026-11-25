import { Router } from "express";
import { ModerationController } from "./moderation.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("moderation:read"), ModerationController.getAll);

router.get("/eagerly/:id", authorize("moderation:read"), ModerationController.getEagerlyById);

router.get("/:id", authorize("moderation:read"), ModerationController.getById);

router.post("/", authorize("moderation:create"), ModerationController.create);

router.put("/:id", authorize("moderation:update"), ModerationController.update);

router.delete("/:id", authorize("moderation:delete"), ModerationController.delete);

export default router;