import { Router } from "express";
import { ResourceTagController } from "./resource-tag.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

// Tags de un recurso
router.get("/resources/:resourceId/tags", authorize("resource-tag:read"), ResourceTagController.getTagsByResource);
router.post("/resources/:resourceId/tags/:tagId", authorize("resource-tag:create"), ResourceTagController.link);
router.delete("/resources/:resourceId/tags/:tagId", authorize("resource-tag:delete"), ResourceTagController.unlink);

// Recursos que tienen un tag
router.get("/tags/:tagId/resources", authorize("resource-tag:read"), ResourceTagController.getResourcesByTag);

export default router;