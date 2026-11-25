import { Router } from "express";
import { ArticleReviewController } from "./article-review.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("article-review:read"), ArticleReviewController.getAll);

router.get("/eagerly/:id", authorize("article-review:read"), ArticleReviewController.getEagerlyById);

router.get("/:id", authorize("article-review:read"), ArticleReviewController.getById);

router.post("/", authorize("article-review:create"), ArticleReviewController.create);

router.put("/:id", authorize("article-review:update"), ArticleReviewController.update);

router.delete("/:id", authorize("article-review:delete"), ArticleReviewController.delete);

export default router;