import { Request, Response, NextFunction } from "express";
import { StockMovementService } from "./stock-movement.service.js";

export class StockMovementController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stockMovements = await StockMovementService.findAll();

      res.json(stockMovements);
    } catch (error) {
      next(error);
    }
  }


  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const stockMovement = await StockMovementService.findById(id);

      if (!stockMovement) {
        res.status(404).json({
          message: "Movimiento de stock no encontrado",
        });

        return;
      }

      res.json(stockMovement);

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
      const { articleId, userId, type, quantity, reason } = req.body;

      if (!articleId || !userId || !type || quantity === undefined) {
        res.status(400).json({
          message: "articleId, userId, type y quantity son obligatorios",
        });

        return;
      }

      const stockMovement = await StockMovementService.create({
        articleId,
        userId,
        type,
        quantity,
        reason,
      });

      res.status(201).json(stockMovement);

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
      const id = Number(req.params.id);

      const stockMovement = await StockMovementService.findById(id);

      if (!stockMovement) {
        res.status(404).json({
          message: "Movimiento de stock no encontrado",
        });

        return;
      }

      const updatedStockMovement = await StockMovementService.update(
        stockMovement,
        req.body
      );

      res.json(updatedStockMovement);

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
      const id = Number(req.params.id);

      const stockMovement = await StockMovementService.findById(id);

      if (!stockMovement) {
        res.status(404).json({
          message: "Movimiento de stock no encontrado",
        });

        return;
      }

      await StockMovementService.delete(stockMovement);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }


  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const stockMovement = await StockMovementService.findEagerById(id);

      if (!stockMovement) {
        res.status(404).json({
          message: "Movimiento de stock no encontrado",
        });

        return;
      }

      res.json(stockMovement);

    } catch (error) {
      next(error);
    }
  }
}