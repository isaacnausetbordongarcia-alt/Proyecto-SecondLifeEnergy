import { Request, Response, NextFunction } from "express";
import { ForumCategoryService } from "./forum-category.service.js";

export class ForumCategoryController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const forumCategories = await ForumCategoryService.findAll();

            res.json(forumCategories);
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

            const forumCategory = await ForumCategoryService.findById(id);

            if (!forumCategory) {
                res.status(404).json({
                    message: "Forum category not found",
                });

                return;
            }

            res.json(forumCategory);

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

            const forumCategory = await ForumCategoryService.create({
                name,
                description,
            });

            res.status(201).json(forumCategory);

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

            const forumCategory = await ForumCategoryService.findById(id);

            if (!forumCategory) {
                res.status(404).json({
                    message: "Forum category not found",
                });

                return;
            }

            const updatedForumCategory = await ForumCategoryService.update(
                forumCategory,
                req.body
            );

            res.json(updatedForumCategory);

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

            const forumCategory = await ForumCategoryService.findById(id);

            if (!forumCategory) {
                res.status(404).json({
                    message: "Forum category not found",
                });

                return;
            }

            await ForumCategoryService.delete(forumCategory);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}