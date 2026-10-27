import { Router } from "express";
import { ArticleImageController } from "./article-image.controller.js";

const router = Router();

router.get("/", ArticleImageController.getAll);

router.get("/eagerly/:id", ArticleImageController.getEagerlyById);

router.get("/:id", ArticleImageController.getById);

router.post("/", ArticleImageController.create);

router.put("/:id", ArticleImageController.update);

router.delete("/:id", ArticleImageController.delete);

export default router;