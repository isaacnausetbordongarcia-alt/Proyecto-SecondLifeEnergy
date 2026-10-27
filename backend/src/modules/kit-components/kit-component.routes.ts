import { Router } from "express";
import { KitComponentController } from "./kit-component.controller.js";

const router = Router();

router.get("/", KitComponentController.getAll);

router.get(
  "/eagerly/:kitId/:componentId",
  KitComponentController.getEagerlyByIds
);

router.get("/:kitId/:componentId", KitComponentController.getByIds);

router.post("/", KitComponentController.create);

router.put("/:kitId/:componentId", KitComponentController.update);

router.delete("/:kitId/:componentId", KitComponentController.delete);

export default router;