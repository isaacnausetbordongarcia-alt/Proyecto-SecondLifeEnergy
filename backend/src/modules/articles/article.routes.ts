import { Router } from "express";
import { ArticleController } from "./article.controller.js";

const router = Router();

router.get("/", ArticleController.getAll);

router.get("/:id", ArticleController.getById);

router.post("/", ArticleController.create);

router.put("/:id", ArticleController.update);

router.delete("/:id", ArticleController.delete);

export default router;