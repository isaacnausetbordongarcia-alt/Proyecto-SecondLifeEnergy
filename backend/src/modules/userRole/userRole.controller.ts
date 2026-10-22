import { Request, Response, NextFunction } from "express";
import { UserRoleService } from "../userRole/userRole.service.js";

export class UserRoleController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userRoles = await UserRoleService.findAll();

            res.json(userRoles);
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

            const userRole = await UserRoleService.findById(id);

            if (!userRole) {
                res.status(404).json({
                    message: "User role not found",
                });

                return;
            }

            res.json(userRole);

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
            const { userId, roleId, assignedAt } = req.body;

            if (!userId || !roleId) {
                res.status(400).json({
                    message: "userId and roleId are required",
                });

                return;
            }

            const userRole = await UserRoleService.create({
                userId,
                roleId
            });

            res.status(201).json(userRole);

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

            const userRole = await UserRoleService.findById(id);

            if (!userRole) {
                res.status(404).json({
                    message: "User role not found",
                });

                return;
            }

            const updatedUserRole = await UserRoleService.update(
                userRole,
                req.body
            );

            res.json(updatedUserRole);

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

            const userRole = await UserRoleService.findById(id);

            if (!userRole) {
                res.status(404).json({
                    message: "User role not found",
                });

                return;
            }

            await UserRoleService.delete(userRole);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}