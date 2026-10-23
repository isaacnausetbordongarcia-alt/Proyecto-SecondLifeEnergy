import { Request, Response, NextFunction } from "express";
import { ArticleService } from "./Article.service.js";

export class ArticleController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const articles = await ArticleService.findAll();

            res.json(articles);
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

            const article = await ArticleService.findById(id);

            if (!article) {
                res.status(404).json({
                    message: "Article not found",
                });

                return;
            }

            res.json(article);

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
            const {
                categoryId,
                createdById,
                name,
                description,
                type,
                specifications,
                stock,
                status,
            } = req.body;

            if (
                !categoryId ||
                !createdById ||
                !name ||
                !type ||
                !specifications ||
                stock === undefined ||
                !status
            ) {
                res.status(400).json({
                    message:
                        "categoryId, createdById, name, type, specifications, stock and status are required",
                });

                return;
            }

            const article = await ArticleService.create({
                categoryId,
                createdById,
                name,
                description,
                type,
                specifications,
                stock,
                status,
            });

            res.status(201).json(article);

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

            const article = await ArticleService.findById(id);

            if (!article) {
                res.status(404).json({
                    message: "Article not found",
                });

                return;
            }

            const {
                categoryId,
                name,
                description,
                type,
                specifications,
                stock,
                status,
            } = req.body;

            const updatedArticle = await ArticleService.update(article, {
                categoryId,
                name,
                description,
                type,
                specifications,
                stock,
                status,
            });

            res.json(updatedArticle);

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

            const article = await ArticleService.findById(id);

            if (!article) {
                res.status(404).json({
                    message: "Article not found",
                });

                return;
            }

            await ArticleService.delete(article);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}