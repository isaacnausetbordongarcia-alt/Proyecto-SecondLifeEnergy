import { Router } from "express";
import { UserRoleController } from "./userRole.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("user-role:read"), UserRoleController.getAll);

router.get("/:userId/:roleId", authorize("user-role:read"), UserRoleController.getById);

router.post("/", authorize("user-role:create"), UserRoleController.create);

router.put("/:userId/:roleId", authorize("user-role:update"), UserRoleController.update);

router.delete("/:userId/:roleId", authorize("user-role:delete"), UserRoleController.delete);

export default router;
