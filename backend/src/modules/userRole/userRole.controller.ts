import { Request, Response, NextFunction } from "express";
import { UserRoleService } from "./userRole.service.js";

function parseKey(req: Request) {
    const userId = Number(req.params.userId);
    const roleId = Number(req.params.roleId);

    if (!Number.isInteger(userId) || !Number.isInteger(roleId)) {
        return null;
    }

    return { userId, roleId };
}

export class UserRoleController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.query.userId ? Number(req.query.userId) : undefined;
            const roleId = req.query.roleId ? Number(req.query.roleId) : undefined;

            const userRoles = await UserRoleService.findAll({ userId, roleId });

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
            const key = parseKey(req);

            if (!key) {
                res.status(400).json({ message: "userId and roleId must be integers" });
                return;
            }

            const userRole = await UserRoleService.findByIds(key.userId, key.roleId);

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

            const existing = await UserRoleService.findByIds(userId, roleId);

            if (existing) {
                res.status(409).json({
                    message: "The user already has this role",
                });

                return;
            }

            const userRole = await UserRoleService.create({
                userId,
                roleId,
                assignedAt,
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
            const key = parseKey(req);

            if (!key) {
                res.status(400).json({ message: "userId and roleId must be integers" });
                return;
            }

            const { assignedAt } = req.body;

            if (!assignedAt) {
                res.status(400).json({
                    message: "assignedAt is required (userId and roleId cannot be modified)",
                });

                return;
            }

            const userRole = await UserRoleService.findByIds(key.userId, key.roleId);

            if (!userRole) {
                res.status(404).json({
                    message: "User role not found",
                });

                return;
            }

            const updatedUserRole = await UserRoleService.update(
                userRole,
                { assignedAt }
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
            const key = parseKey(req);

            if (!key) {
                res.status(400).json({ message: "userId and roleId must be integers" });
                return;
            }

            const userRole = await UserRoleService.findByIds(key.userId, key.roleId);

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
