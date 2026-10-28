import { Request, Response, NextFunction } from "express";
import { StockMovementService } from "./stockMovement.service.js";
import { STOCK_MOVEMENT_TYPES } from "./stockMovement.model.js";

export class StockMovementController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const articleId = req.query.articleId ? Number(req.query.articleId) : undefined;
            const userId = req.query.userId ? Number(req.query.userId) : undefined;

            const stockMovements = await StockMovementService.findAll({ articleId, userId });

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
                    message: "Stock movement not found",
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

            if (!STOCK_MOVEMENT_TYPES.includes(type)) {
                res.status(400).json({
                    message: `type debe ser uno de: ${STOCK_MOVEMENT_TYPES.join(", ")}`,
                });

                return;
            }

            if (!Number.isInteger(quantity) || quantity === 0) {
                res.status(400).json({
                    message: "quantity debe ser un entero distinto de 0",
                });

                return;
            }

            // in/out llevan cantidad positiva; solo adjustment puede ser negativo
            if (type !== "adjustment" && quantity < 0) {
                res.status(400).json({
                    message: "quantity debe ser positiva para movimientos in/out",
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
}
