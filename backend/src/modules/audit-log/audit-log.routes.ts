import { Router } from "express";
import { AuditLogController } from "./audit-log.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("audit-log:read"), AuditLogController.getAll);

router.get("/entity/:entity/:entityId", authorize("audit-log:read"), AuditLogController.getByEntity);

router.get("/:id", authorize("audit-log:read"), AuditLogController.getById);

export default router;