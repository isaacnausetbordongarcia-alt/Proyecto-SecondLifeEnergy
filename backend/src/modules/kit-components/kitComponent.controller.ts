import { Request, Response, NextFunction } from "express";
import { KitComponentService } from "./kitComponent.service.js";

function parseKey(req: Request) {
    const kitId = Number(req.params.kitId);
    const componentId = Number(req.params.componentId);

    if (!Number.isInteger(kitId) || !Number.isInteger(componentId)) {
        return null;
    }

    return { kitId, componentId };
}

function isValidQuantity(value: unknown): value is number {
    return Number.isInteger(value) && (value as number) >= 1;
}

export class KitComponentController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const kitId = req.query.kitId ? Number(req.query.kitId) : undefined;
            const componentId = req.query.componentId ? Number(req.query.componentId) : undefined;

            const kitComponents = await KitComponentService.findAll({ kitId, componentId });

            res.json(kitComponents);
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
            const key = parseKey(req);

            if (!key) {
                res.status(400).json({ message: "kitId and componentId must be integers" });
                return;
            }

            const kitComponent = await KitComponentService.findByIds(key.kitId, key.componentId);

            if (!kitComponent) {
                res.status(404).json({
                    message: "Kit component not found",
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
            const { kitId, componentId, quantity = 1 } = req.body;

            if (!kitId || !componentId) {
                res.status(400).json({
                    message: "kitId and componentId are required",
                });

                return;
            }

            if (kitId === componentId) {
                res.status(400).json({
                    message: "A kit cannot be a component of itself",
                });

                return;
            }

            if (!isValidQuantity(quantity)) {
                res.status(400).json({
                    message: "quantity must be an integer greater than or equal to 1",
                });

                return;
            }

            const existing = await KitComponentService.findByIds(kitId, componentId);

            if (existing) {
                res.status(409).json({
                    message: "This component is already part of the kit",
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
            const key = parseKey(req);

            if (!key) {
                res.status(400).json({ message: "kitId and componentId must be integers" });
                return;
            }

            const { quantity } = req.body;

            if (!isValidQuantity(quantity)) {
                res.status(400).json({
                    message: "quantity must be an integer greater than or equal to 1",
                });

                return;
            }

            const kitComponent = await KitComponentService.findByIds(key.kitId, key.componentId);

            if (!kitComponent) {
                res.status(404).json({
                    message: "Kit component not found",
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
            const key = parseKey(req);

            if (!key) {
                res.status(400).json({ message: "kitId and componentId must be integers" });
                return;
            }

            const kitComponent = await KitComponentService.findByIds(key.kitId, key.componentId);

            if (!kitComponent) {
                res.status(404).json({
                    message: "Kit component not found",
                });

                return;
            }

            await KitComponentService.delete(kitComponent);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}
