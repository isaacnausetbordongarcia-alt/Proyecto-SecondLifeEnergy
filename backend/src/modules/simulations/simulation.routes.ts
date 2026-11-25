import { Router } from "express";
import { SimulationController } from "./simulation.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("simulation:read"), SimulationController.getAll);

router.get("/:id", authorize("simulation:read"), SimulationController.getById);

router.post("/", authorize("simulation:create"), SimulationController.create);

router.put("/:id", authorize("simulation:update"), SimulationController.update);

router.delete("/:id", authorize("simulation:delete"), SimulationController.delete);

export default router;