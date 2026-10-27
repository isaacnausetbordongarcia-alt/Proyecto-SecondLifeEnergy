import { Router } from "express";
import { ResourceTagController } from "./ResourceTag.controller.js";

const router = Router();

// Tags de un recurso
router.get("/resources/:resourceId/tags", ResourceTagController.getTagsByResource);
router.post("/resources/:resourceId/tags/:tagId", ResourceTagController.link);
router.delete("/resources/:resourceId/tags/:tagId", ResourceTagController.unlink);

// Recursos que tienen un tag
router.get("/tags/:tagId/resources", ResourceTagController.getResourcesByTag);

export default router;