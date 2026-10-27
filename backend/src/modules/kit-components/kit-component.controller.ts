import { Request, Response, NextFunction } from "express";
import { KitComponentService } from "./kit-component.servide.js";

export class KitComponentController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const kitComponents = await KitComponentService.findAll();

      res.json(kitComponents);
    } catch (error) {
      next(error);
    }
  }


  static async getByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const kitId = Number(req.params.kitId);
      const componentId = Number(req.params.componentId);

      const kitComponent = await KitComponentService.findByIds(
        kitId,
        componentId
      );

      if (!kitComponent) {
        res.status(404).json({
          message: "Relación kit-componente no encontrada",
        });

        return;
      }

      res.json(kitComponent);

    } catch (error) {
      next(error);
    }
  }


  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { kitId, componentId, quantity } = req.body;

      if (!kitId || !componentId) {
        res.status(400).json({
          message: "kitId y componentId son obligatorios",
        });

        return;
      }

      const existing = await KitComponentService.findByIds(
        kitId,
        componentId
      );

      if (existing) {
        res.status(409).json({
          message: "Esta relación kit-componente ya existe",
        });

        return;
      }

      const kitComponent = await KitComponentService.create({
        kitId,
        componentId,
        quantity,
      });

      res.status(201).json(kitComponent);

    } catch (error) {
      next(error);
    }
  }


  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const kitId = Number(req.params.kitId);
      const componentId = Number(req.params.componentId);

      const { quantity } = req.body;

      if (quantity === undefined) {
        res.status(400).json({
          message: "quantity es obligatorio",
        });

        return;
      }

      const kitComponent = await KitComponentService.findByIds(
        kitId,
        componentId
      );

      if (!kitComponent) {
        res.status(404).json({
          message: "Relación kit-componente no encontrada",
        });

        return;
      }

      const updatedKitComponent = await KitComponentService.update(
        kitComponent,
        { quantity }
      );

      res.json(updatedKitComponent);

    } catch (error) {
      next(error);
    }
  }


  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const kitId = Number(req.params.kitId);
      const componentId = Number(req.params.componentId);

      const kitComponent = await KitComponentService.findByIds(
        kitId,
        componentId
      );

      if (!kitComponent) {
        res.status(404).json({
          message: "Relación kit-componente no encontrada",
        });

        return;
      }

      await KitComponentService.delete(kitComponent);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }


  static async getEagerlyByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const kitId = Number(req.params.kitId);
      const componentId = Number(req.params.componentId);

      const kitComponent = await KitComponentService.findEagerByIds(
        kitId,
        componentId
      );

      if (!kitComponent) {
        res.status(404).json({
          message: "Relación kit-componente no encontrada",
        });

        return;
      }

      res.json(kitComponent);

    } catch (error) {
      next(error);
    }
  }
}