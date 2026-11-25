import { Router } from "express";
import { RequestItemController } from "./request-item.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth.middleware.js";
import { authorize } from "../rcba/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("request-item:read"), RequestItemController.getAll);

router.get("/request/:requestId", authorize("request-item:read"), RequestItemController.getByRequestId);

router.get("/:id", authorize("request-item:read"), RequestItemController.getById);

router.post("/", authorize("request-item:create"), RequestItemController.create);

router.put("/:id", authorize("request-item:update"), RequestItemController.update);

router.delete("/:id", authorize("request-item:delete"), RequestItemController.delete);

export default router;