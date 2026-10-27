import { Router } from "express";
import { SimulationArticlesController } from "./SimulationArticle.controller.js";

const router = Router();

router.get("/", SimulationArticlesController.getAll);

router.get("/:simulationId/:articleId", SimulationArticlesController.FindById);

router.post("/", SimulationArticlesController.create);

router.delete("/:simulationId/:articleId", SimulationArticlesController.delete);

export default router;