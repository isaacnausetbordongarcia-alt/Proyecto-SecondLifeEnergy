import { Router } from "express";
import { ArticleCategoryController } from "./article-category.controller.js";

const router = Router();

router.get("/", ArticleCategoryController.getAll);

router.get("/eagerly/:id", ArticleCategoryController.getEagerlyById);

router.get("/:id", ArticleCategoryController.getById);

router.post("/", ArticleCategoryController.create);

router.put("/:id", ArticleCategoryController.update);

router.delete("/:id", ArticleCategoryController.delete);

export default router;