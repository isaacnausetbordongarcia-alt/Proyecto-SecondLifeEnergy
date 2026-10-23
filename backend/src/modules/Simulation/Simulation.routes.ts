import { Router } from "express";
import { SimulationController } from "./Simulation.controller.js";

const router = Router();

router.get("/", SimulationController.getAll);

router.get("/:id", SimulationController.getById);

router.post("/", SimulationController.create);

router.put("/:id", SimulationController.update);

router.delete("/:id", SimulationController.delete);

export default router;