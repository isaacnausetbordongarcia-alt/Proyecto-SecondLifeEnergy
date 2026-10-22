import { Router } from "express";
import { RequestController } from "./request.controller.js";

const router = Router();

router.get("/", RequestController.getAll);

router.get("/:id", RequestController.getById);

router.post("/", RequestController.create);

router.put("/:id", RequestController.update);

router.delete("/:id", RequestController.delete);

export default router;