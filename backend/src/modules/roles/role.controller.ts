import { Request, Response, NextFunction } from "express";
import { RoleService } from "./role.service.js";

export class RoleController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const roles = await RoleService.findAll();

            res.json(roles);
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

            const role = await RoleService.findById(id);

            if (!role) {
                res.status(404).json({
                    message: "Role not found",
                });

                return;
            }

            res.json(role);

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
            const { name, description } = req.body;

            if (!name) {
                res.status(400).json({
                    message: "Name es obligatorio",
                });

                return;
            }

            const role = await RoleService.create({
                name,
                description,
            });

            res.status(201).json(role);

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

            const role = await RoleService.findById(id);

            if (!role) {
                res.status(404).json({
                    message: "Role not found",
                });

                return;
            }

            const updatedRole = await RoleService.update(
                role,
                req.body
            );

            res.json(updatedRole);

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

            const role = await RoleService.findById(id);

            if (!role) {
                res.status(404).json({
                    message: "Role not found",
                });

                return;
            }

            await RoleService.delete(role);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}