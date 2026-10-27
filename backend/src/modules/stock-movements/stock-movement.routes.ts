import { Router } from "express";
import { StockMovementController } from "./stock-movement.controller.js";

const router = Router();

router.get("/", StockMovementController.getAll);

router.get("/eagerly/:id", StockMovementController.getEagerlyById);

router.get("/:id", StockMovementController.getById);

router.post("/", StockMovementController.create);

router.put("/:id", StockMovementController.update);

router.delete("/:id", StockMovementController.delete);

export default router;