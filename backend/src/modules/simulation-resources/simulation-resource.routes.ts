import { Router } from "express";
import { SimulationResourceController } from "./simulation-resource.controller.js";

const router = Router();

router.get("/", SimulationResourceController.getAll);

router.get(
  "/eagerly/:simulationId/:resourceId",
  SimulationResourceController.getEagerlyByIds
);

router.get(
  "/:simulationId/:resourceId",
  SimulationResourceController.getByIds
);

router.post("/", SimulationResourceController.create);

router.delete(
  "/:simulationId/:resourceId",
  SimulationResourceController.delete
);

export default router;