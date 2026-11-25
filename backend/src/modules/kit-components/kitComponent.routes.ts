import { Router } from "express";
import { KitComponentController } from "./kitComponent.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("kit-component:read"), KitComponentController.getAll);

router.get("/:kitId/:componentId", authorize("kit-component:read"), KitComponentController.getById);

router.post("/", authorize("kit-component:create"), KitComponentController.create);

router.put("/:kitId/:componentId", authorize("kit-component:update"), KitComponentController.update);

router.delete("/:kitId/:componentId", authorize("kit-component:delete"), KitComponentController.delete);

export default router;
