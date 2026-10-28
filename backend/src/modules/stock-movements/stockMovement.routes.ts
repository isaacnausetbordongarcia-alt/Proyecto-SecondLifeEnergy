import { Router } from "express";
import { StockMovementController } from "./stockMovement.controller.js";

const router = Router();

router.get("/", StockMovementController.getAll);

router.get("/:id", StockMovementController.getById);

router.post("/", StockMovementController.create);


export default router;
