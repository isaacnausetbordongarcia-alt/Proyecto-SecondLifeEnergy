import { Request, Response, NextFunction } from "express";
import { RolePermission } from "./rolePermission.model.js";

export class RolePermissionController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const rolePermissions = await RolePermission.findAll();

            res.json(rolePermissions);
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

            const rolePermission = await RolePermission.findById(id) as unknown as {
                roleId: number;
                permissionId: number;
            } | undefined;

            if (rolePermission === undefined) {
                res.status(404).json({
                    message: "rolepermission not found",
                });

                return;
            }

            res.json(rolePermission);

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
            const { roleId, permissionId } = req.body;

            if (!roleId || !permissionId) {
                res.status(400).json({
                    message: "RoleId y permissionId son obligatorios",
                });

                return;
            }

            const rolePermission = await RolePermission.create({
                roleId,
                permissionId,
            });

            res.status(201).json(rolePermission);

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

            const rolePermission = await RolePermission.findById(id);

            if (rolePermission === undefined) {
                res.status(404).json({
                    message: "RolePermission not found",
                });

                return;
            }

            await RolePermission.update(
                rolePermission,
                req.body
            );

            const updatedRolePermission = await RolePermission.findById(id);

            res.json(updatedRolePermission);

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

            const rolePermission = await RolePermission.findById(id) as unknown as {
                roleId: number;
                permissionId: number;
            } | undefined;

            if (rolePermission === undefined) {
                res.status(404).json({
                    message: "RolePermission not found",
                });

                return;
            }

            await RolePermission.destroy({
                where: {
                    roleId: rolePermission.roleId,
                    permissionId: rolePermission.permissionId,
                },
            });

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}