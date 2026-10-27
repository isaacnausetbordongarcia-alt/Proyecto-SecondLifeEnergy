import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service.js";

export class UserController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const users = await UserService.findAll();

            res.json(users);
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

            const user = await UserService.findById(id);

            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });

                return;
            }

            res.json(user);

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
            const { name, email, passwordHash, isActive } = req.body;

            if (!name || !email || !passwordHash) {
                res.status(400).json({
                    message: "Name, email y passwordHash son obligatorios",
                });

                return;
            }

            const user = await UserService.create({
                name,
                email,
                passwordHash,
                isActive,
            });

            // No devolvemos el hash de la contraseña.
            const { passwordHash: _hash, ...safeUser } = user.toJSON();

            res.status(201).json(safeUser);

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

            const user = await UserService.findById(id);

            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });

                return;
            }

            const updatedUser = await UserService.update(
                user,
                req.body
            );

            const { passwordHash: _hash, ...safeUser } = updatedUser.toJSON();

            res.json(safeUser);

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

            const user = await UserService.findById(id);

            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });

                return;
            }

            await UserService.delete(user);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}