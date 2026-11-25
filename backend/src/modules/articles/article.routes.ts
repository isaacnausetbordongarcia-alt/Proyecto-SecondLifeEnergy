import { Router } from "express";
import { ArticleController } from "./article.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("article:read"), ArticleController.getAll);

router.get("/:id", authorize("article:read"), ArticleController.getById);

router.post("/", authorize("article:create"), ArticleController.create);

router.put("/:id", authorize("article:update"), ArticleController.update);

router.delete("/:id", authorize("article:delete"), ArticleController.delete);

export default router;