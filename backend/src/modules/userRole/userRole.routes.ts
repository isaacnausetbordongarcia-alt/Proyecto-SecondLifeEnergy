import { Router } from "express";
import { UserRoleController } from "../userRole/userRole.controller.js";

const router = Router();

router.get("/", UserRoleController.getAll);

router.get("/:id", UserRoleController.getById);

router.post("/", UserRoleController.create);

router.put("/:id", UserRoleController.update);

router.delete("/:id", UserRoleController.delete);

export default router;