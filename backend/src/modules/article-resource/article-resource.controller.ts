import { Request, Response } from "express";
import { ForeignKeyConstraintError, ValidationError } from "sequelize";
import { ArticleResourceService } from "./ArticleResource.service.js";

function handleError(res: Response, error: unknown) {
    if (error instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ message: "El artículo o el recurso no existe" });
    }
    if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.errors.map((e) => e.message) });
    }
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
}

function parsePositiveInt(value: string | string[] | undefined): number | null {
    const raw = Array.isArray(value) ? value[0] : value;
    const n = Number(raw);
    return Number.isInteger(n) && n > 0 ? n : null;
}

export class ArticleResourceController {
    static async getResourcesByArticle(req: Request, res: Response) {
        try {
            const articleId = parsePositiveInt(req.params.articleId);
            if (!articleId) return res.status(400).json({ message: "ID de artículo no válido" });

            const resources = await ArticleResourceService.getResourcesByArticle(articleId);
            return res.json(resources);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async getArticleIdsByResource(req: Request, res: Response) {
        try {
            const resourceId = parsePositiveInt(req.params.resourceId);
            if (!resourceId) return res.status(400).json({ message: "ID de recurso no válido" });

            const articleIds = await ArticleResourceService.getArticleIdsByResource(resourceId);
            return res.json(articleIds);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async link(req: Request, res: Response) {
        try {
            const articleId = parsePositiveInt(req.params.articleId);
            const resourceId = parsePositiveInt(req.params.resourceId);
            if (!articleId || !resourceId) {
                return res.status(400).json({ message: "IDs no válidos" });
            }

            if (await ArticleResourceService.exists(articleId, resourceId)) {
                return res.status(409).json({ message: "El recurso ya está asociado al artículo" });
            }

            const link = await ArticleResourceService.link(articleId, resourceId);
            return res.status(201).json(link);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async unlink(req: Request, res: Response) {
        try {
            const articleId = parsePositiveInt(req.params.articleId);
            const resourceId = parsePositiveInt(req.params.resourceId);
            if (!articleId || !resourceId) {
                return res.status(400).json({ message: "IDs no válidos" });
            }

            const removed = await ArticleResourceService.unlink(articleId, resourceId);
            if (!removed) return res.status(404).json({ message: "La asociación no existe" });

            return res.status(204).send();
        } catch (error) {
            return handleError(res, error);
        }
    }
}