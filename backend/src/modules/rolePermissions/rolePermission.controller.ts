import { Request, Response, NextFunction } from "express";
import { RolePermissionService } from "./rolePermission.service.js";

function parseKey(req: Request) {
    const roleId = Number(req.params.roleId);
    const permissionId = Number(req.params.permissionId);

    if (!Number.isInteger(roleId) || !Number.isInteger(permissionId)) {
        return null;
    }

    return { roleId, permissionId };
}

export class RolePermissionController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const roleId = req.query.roleId ? Number(req.query.roleId) : undefined;
            const permissionId = req.query.permissionId ? Number(req.query.permissionId) : undefined;

            const rolePermissions = await RolePermissionService.findAll({ roleId, permissionId });

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
            const key = parseKey(req);

            if (!key) {
                res.status(400).json({ message: "roleId and permissionId must be integers" });
                return;
            }

            const rolePermission = await RolePermissionService.findByIds(key.roleId, key.permissionId);

            if (!rolePermission) {
                res.status(404).json({
                    message: "RolePermission not found",
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
                    message: "roleId y permissionId son obligatorios",
                });

                return;
            }

            const existing = await RolePermissionService.findByIds(roleId, permissionId);

            if (existing) {
                res.status(409).json({
                    message: "El rol ya tiene este permiso",
                });

                return;
            }

            const rolePermission = await RolePermissionService.create({
                roleId,
                permissionId,
            });

            res.status(201).json(rolePermission);

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
                res.status(400).json({ message: "roleId and permissionId must be integers" });
                return;
            }

            const rolePermission = await RolePermissionService.findByIds(key.roleId, key.permissionId);

            if (!rolePermission) {
                res.status(404).json({
                    message: "RolePermission not found",
                });

                return;
            }

            await RolePermissionService.delete(rolePermission);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}
