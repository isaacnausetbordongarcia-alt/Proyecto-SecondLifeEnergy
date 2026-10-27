import { Router } from "express";
import { ArticleResourceController } from "./ArticleResource.controller.js";

const router = Router();

// Recursos de un artículo
router.get("/articles/:articleId/resources", ArticleResourceController.getResourcesByArticle);
router.post("/articles/:articleId/resources/:resourceId", ArticleResourceController.link);
router.delete("/articles/:articleId/resources/:resourceId", ArticleResourceController.unlink);

// Artículos que usan un recurso
router.get("/resources/:resourceId/articles", ArticleResourceController.getArticleIdsByResource);

export default router;