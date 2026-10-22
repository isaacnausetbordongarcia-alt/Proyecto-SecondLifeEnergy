import { Request, Response, NextFunction } from "express";
import { PermissionService } from "./permission.service.js";

export class PermissionController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const permissions = await PermissionService.findAll();

            res.json(permissions);
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

            const permission = await PermissionService.findById(id);

            if (!permission) {
                res.status(404).json({
                    message: "Permission not found",
                });

                return;
            }

            res.json(permission);

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
            const { code, description } = req.body;

            if (!code) {
                res.status(400).json({
                    message: "Code es obligatorio",
                });

                return;
            }

            const permission = await PermissionService.create({
                code,
                description,
            });

            res.status(201).json(permission);

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

            const permission = await PermissionService.findById(id);

            if (!permission) {
                res.status(404).json({
                    message: "Permission not found",
                });

                return;
            }

            const updatedPermission = await PermissionService.update(
                permission,
                req.body
            );

            res.json(updatedPermission);

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

            const permission = await PermissionService.findById(id);

            if (!permission) {
                res.status(404).json({
                    message: "Permission not found",
                });

                return;
            }

            await PermissionService.delete(permission);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}