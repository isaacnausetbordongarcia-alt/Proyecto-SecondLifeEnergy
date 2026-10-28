import { Request, Response, NextFunction } from "express";
import { RequestItemService } from "./request-item.service.js";
import { RequestService } from "../requests/request.service.js";
import { ArticleService } from "../article/article.service.js";

export class RequestItemController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const requestItems = await RequestItemService.findAll();

            res.json(requestItems);
        } catch (error) {
            next(error);
        }
    }


    static async getByRequestId(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const requestId = Number(req.params.requestId);

            const contactRequest = await RequestService.findById(requestId);

            if (!contactRequest) {
                res.status(404).json({
                    message: "Request not found",
                });

                return;
            }

            const requestItems = await RequestItemService.findByRequestId(
                requestId
            );

            res.json(requestItems);

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

            const requestItem = await RequestItemService.findById(id);

            if (!requestItem) {
                res.status(404).json({
                    message: "Request item not found",
                });

                return;
            }

            res.json(requestItem);

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
            const { requestId, articleId, quantity } = req.body;

            if (!requestId || !articleId || !quantity) {
                res.status(400).json({
                    message: "requestId, articleId and quantity are required",
                });

                return;
            }

            if (!Number.isInteger(quantity) || quantity < 1) {
                res.status(400).json({
                    message: "quantity must be a positive integer",
                });

                return;
            }

            const contactRequest = await RequestService.findById(requestId);

            if (!contactRequest) {
                res.status(404).json({
                    message: "Request not found",
                });

                return;
            }

            const article = await ArticleService.findById(articleId);

            if (!article) {
                res.status(404).json({
                    message: "Article not found",
                });

                return;
            }

            const requestItem = await RequestItemService.create({
                requestId,
                articleId,
                quantity,
            });

            res.status(201).json(requestItem);

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

            const requestItem = await RequestItemService.findById(id);

            if (!requestItem) {
                res.status(404).json({
                    message: "Request item not found",
                });

                return;
            }

            const { articleId, quantity } = req.body;

            if (
                quantity !== undefined &&
                (!Number.isInteger(quantity) || quantity < 1)
            ) {
                res.status(400).json({
                    message: "quantity must be a positive integer",
                });

                return;
            }

            if (articleId !== undefined) {
                const article = await ArticleService.findById(articleId);

                if (!article) {
                    res.status(404).json({
                        message: "Article not found",
                    });

                    return;
                }
            }

            const updatedRequestItem = await RequestItemService.update(
                requestItem,
                {
                    articleId,
                    quantity,
                }
            );

            res.json(updatedRequestItem);

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

            const requestItem = await RequestItemService.findById(id);

            if (!requestItem) {
                res.status(404).json({
                    message: "Request item not found",
                });

                return;
            }

            await RequestItemService.delete(requestItem);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}