import { Router } from "express";
import { StockMovementController } from "./stockMovement.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("stock-movement:read"), StockMovementController.getAll);

router.get("/:id", authorize("stock-movement:read"), StockMovementController.getById);

router.post("/", authorize("stock-movement:create"), StockMovementController.create);


export default router;
