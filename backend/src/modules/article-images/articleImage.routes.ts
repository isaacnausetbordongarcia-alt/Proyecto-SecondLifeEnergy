import { Router } from "express";
import { ArticleImageController } from "./articleImage.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("article-image:read"), ArticleImageController.getAll);

router.get("/:id", authorize("article-image:read"), ArticleImageController.getById);

router.post("/", authorize("article-image:create"), ArticleImageController.create);

router.put("/:id", authorize("article-image:update"), ArticleImageController.update);

router.delete("/:id", authorize("article-image:delete"), ArticleImageController.delete);

export default router;
