import { Request, Response } from "express";
import { ForeignKeyConstraintError, ValidationError } from "sequelize";
import { ResourceTagService } from "./ResourceTag.service.js";

function handleError(res: Response, error: unknown) {
    if (error instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ message: "El recurso o el tag no existe" });
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

export class ResourceTagController {
    static async getTagsByResource(req: Request, res: Response) {
        try {
            const resourceId = parsePositiveInt(req.params.resourceId);
            if (!resourceId) return res.status(400).json({ message: "ID de recurso no válido" });

            const tags = await ResourceTagService.getTagsByResource(resourceId);
            return res.json(tags);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async getResourcesByTag(req: Request, res: Response) {
        try {
            const tagId = parsePositiveInt(req.params.tagId);
            if (!tagId) return res.status(400).json({ message: "ID de tag no válido" });

            const resources = await ResourceTagService.getResourcesByTag(tagId);
            return res.json(resources);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async link(req: Request, res: Response) {
        try {
            const resourceId = parsePositiveInt(req.params.resourceId);
            const tagId = parsePositiveInt(req.params.tagId);
            if (!resourceId || !tagId) {
                return res.status(400).json({ message: "IDs no válidos" });
            }

            if (await ResourceTagService.exists(resourceId, tagId)) {
                return res.status(409).json({ message: "El tag ya está asociado al recurso" });
            }

            const link = await ResourceTagService.link(resourceId, tagId);
            return res.status(201).json(link);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async unlink(req: Request, res: Response) {
        try {
            const resourceId = parsePositiveInt(req.params.resourceId);
            const tagId = parsePositiveInt(req.params.tagId);
            if (!resourceId || !tagId) {
                return res.status(400).json({ message: "IDs no válidos" });
            }

            const removed = await ResourceTagService.unlink(resourceId, tagId);
            if (!removed) return res.status(404).json({ message: "La asociación no existe" });

            return res.status(204).send();
        } catch (error) {
            return handleError(res, error);
        }
    }
}