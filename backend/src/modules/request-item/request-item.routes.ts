import { Router } from "express";
import { RequestItemController } from "./request-item.controller.js";

const router = Router();

router.get("/", RequestItemController.getAll);

router.get("/request/:requestId", RequestItemController.getByRequestId);

router.get("/:id", RequestItemController.getById);

router.post("/", RequestItemController.create);

router.put("/:id", RequestItemController.update);

router.delete("/:id", RequestItemController.delete);

export default router;