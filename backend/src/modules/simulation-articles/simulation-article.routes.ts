import { Router } from "express";
import { SimulationArticlesController } from "./simulation-article.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("simulation-article:read"), SimulationArticlesController.getAll);

router.get("/:simulationId/:articleId", authorize("simulation-article:read"), SimulationArticlesController.FindById);

router.post("/", authorize("simulation-article:create"), SimulationArticlesController.create);

router.delete("/:simulationId/:articleId", authorize("simulation-article:delete"), SimulationArticlesController.delete);

export default router;