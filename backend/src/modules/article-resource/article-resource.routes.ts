import { Router } from "express";
import { ArticleResourceController } from "./article-resource.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

// Recursos de un artículo
router.get("/articles/:articleId/resources", authorize("article-resource:read"), ArticleResourceController.getResourcesByArticle);
router.post("/articles/:articleId/resources/:resourceId", authorize("article-resource:create"), ArticleResourceController.link);
router.delete("/articles/:articleId/resources/:resourceId", authorize("article-resource:delete"), ArticleResourceController.unlink);

// Artículos que usan un recurso
router.get("/resources/:resourceId/articles", authorize("article-resource:read"), ArticleResourceController.getArticleIdsByResource);

export default router;