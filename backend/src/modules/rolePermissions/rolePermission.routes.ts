import { Router } from "express";
import { RolePermissionController } from "./rolePermission.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("role-permission:read"), RolePermissionController.getAll);

router.get("/:roleId/:permissionId", authorize("role-permission:read"), RolePermissionController.getById);

router.post("/", authorize("role-permission:create"), RolePermissionController.create);

router.delete("/:roleId/:permissionId", authorize("role-permission:delete"), RolePermissionController.delete);

export default router;
