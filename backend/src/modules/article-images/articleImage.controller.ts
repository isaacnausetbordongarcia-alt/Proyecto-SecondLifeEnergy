import { Request, Response, NextFunction } from "express";
import { ArticleImageService } from "./articleImage.service.js";

export class ArticleImageController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const articleId = req.query.articleId ? Number(req.query.articleId) : undefined;

            const articleImages = await ArticleImageService.findAll({ articleId });

            res.json(articleImages);
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

            const articleImage = await ArticleImageService.findById(id);

            if (!articleImage) {
                res.status(404).json({
                    message: "Article image not found",
                });

                return;
            }

            res.json(articleImage);

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
            const { articleId, url, altText, sortOrder } = req.body;

            if (!articleId || !url) {
                res.status(400).json({
                    message: "articleId y url son obligatorios",
                });

                return;
            }

            const articleImage = await ArticleImageService.create({
                articleId,
                url,
                altText,
                sortOrder,
            });

            res.status(201).json(articleImage);

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

            const articleImage = await ArticleImageService.findById(id);

            if (!articleImage) {
                res.status(404).json({
                    message: "Article image not found",
                });

                return;
            }

            const { articleId, url, altText, sortOrder } = req.body;

            const updatedArticleImage = await ArticleImageService.update(
                articleImage,
                { articleId, url, altText, sortOrder }
            );

            res.json(updatedArticleImage);

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

            const articleImage = await ArticleImageService.findById(id);

            if (!articleImage) {
                res.status(404).json({
                    message: "Article image not found",
                });

                return;
            }

            await ArticleImageService.delete(articleImage);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}
