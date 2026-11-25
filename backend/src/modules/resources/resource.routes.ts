import { Router } from "express";
import { ResourceController } from "./resource.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("resource:read"), ResourceController.getAll);
router.get("/:id", authorize("resource:read"), ResourceController.getById);
router.post("/", authorize("resource:create"), ResourceController.create);
router.put("/:id", authorize("resource:update"), ResourceController.update);
router.delete("/:id", authorize("resource:delete"), ResourceController.delete);

export default router;