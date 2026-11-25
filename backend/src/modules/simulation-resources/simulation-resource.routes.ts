import { Router } from "express";
import { SimulationResourceController } from "./simulation-resource.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("simulation-resource:read"), SimulationResourceController.getAll);

router.get(
  "/eagerly/:simulationId/:resourceId",
  authorize("simulation-resource:read"),
  SimulationResourceController.getEagerlyByIds
);

router.get(
  "/:simulationId/:resourceId",
  authorize("simulation-resource:read"),
  SimulationResourceController.getByIds
);

router.post("/", authorize("simulation-resource:create"), SimulationResourceController.create);

router.delete(
  "/:simulationId/:resourceId",
  authorize("simulation-resource:delete"),
  SimulationResourceController.delete
);

export default router;