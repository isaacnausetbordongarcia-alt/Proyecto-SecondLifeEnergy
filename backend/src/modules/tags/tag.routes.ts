import { Router } from "express";
import { TagController } from "./tag.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("tag:read"), TagController.getAll);

router.get("/:id", authorize("tag:read"), TagController.getById);

router.post("/", authorize("tag:create"), TagController.create);

router.put("/:id", authorize("tag:update"), TagController.update);

router.delete("/:id", authorize("tag:delete"), TagController.delete);

export default router;