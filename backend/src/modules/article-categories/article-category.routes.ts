import { Router } from "express";
import { ArticleCategoryController } from "./article-category.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("article-category:read"), ArticleCategoryController.getAll);

router.get("/eagerly/:id", authorize("article-category:read"), ArticleCategoryController.getEagerlyById);

router.get("/:id", authorize("article-category:read"), ArticleCategoryController.getById);

router.post("/", authorize("article-category:create"), ArticleCategoryController.create);

router.put("/:id", authorize("article-category:update"), ArticleCategoryController.update);

router.delete("/:id", authorize("article-category:delete"), ArticleCategoryController.delete);

export default router;