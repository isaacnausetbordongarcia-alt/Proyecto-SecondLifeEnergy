import { Request, Response, NextFunction } from "express";
import { TagService } from "./tag.service.js";

export class TagController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const tags = await TagService.findAll();

            res.json(tags);
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

            const tag = await TagService.findById(id);

            if (!tag) {
                res.status(404).json({
                    message: "Tag not found",
                });

                return;
            }

            res.json(tag);

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
            const { name, slug } = req.body;

            if (!name || !slug) {
                res.status(400).json({
                    message: "Name y slug son obligatorios",
                });

                return;
            }

            const tag = await TagService.create({
                name,
                slug,
            });

            res.status(201).json(tag);

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

            const tag = await TagService.findById(id);

            if (!tag) {
                res.status(404).json({
                    message: "Tag not found",
                });

                return;
            }

            const updatedTag = await TagService.update(
                tag,
                req.body
            );

            res.json(updatedTag);

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

            const tag = await TagService.findById(id);

            if (!tag) {
                res.status(404).json({
                    message: "Tag not found",
                });

                return;
            }

            await TagService.delete(tag);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}