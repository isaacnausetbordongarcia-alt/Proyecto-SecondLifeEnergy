import { Request, Response } from "express";
import { ForeignKeyConstraintError, ValidationError } from "sequelize";
import { ResourceService } from "./Resource.service.js";

const REQUIRED_FIELDS = [
    "authorId",
    "title",
    "type",
    "topic",
    "difficulty",
    "url",
    "status",
    "publishedAt",
] as const;

function handleError(res: Response, error: unknown) {
    if (error instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ message: "El autor indicado no existe" });
    }
    if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.errors.map((e) => e.message) });
    }
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
}

function parseId(req: Request): number | null {
    const id = Number(req.params.id);
    return Number.isInteger(id) && id > 0 ? id : null;
}

export class ResourceController {
    static async getAll(req: Request, res: Response) {
        try {
            const { authorId, type, topic, difficulty, status, search } = req.query;

            const resources = await ResourceService.getAll({
                authorId: authorId ? Number(authorId) : undefined,
                type: type as string | undefined,
                topic: topic as string | undefined,
                difficulty: difficulty as string | undefined,
                status: status as string | undefined,
                search: search as string | undefined,
            });

            return res.json(resources);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseId(req);
            if (!id) return res.status(400).json({ message: "ID no válido" });

            const resource = await ResourceService.getById(id);
            if (!resource) return res.status(404).json({ message: "Recurso no encontrado" });

            return res.json(resource);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const missing = REQUIRED_FIELDS.filter((f) => req.body[f] === undefined || req.body[f] === "");
            if (missing.length > 0) {
                return res.status(400).json({ message: `Faltan campos: ${missing.join(", ")}` });
            }

            const resource = await ResourceService.create(req.body);
            return res.status(201).json(resource);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseId(req);
            if (!id) return res.status(400).json({ message: "ID no válido" });

            const resource = await ResourceService.update(id, req.body);
            if (!resource) return res.status(404).json({ message: "Recurso no encontrado" });

            return res.json(resource);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseId(req);
            if (!id) return res.status(400).json({ message: "ID no válido" });

            const deleted = await ResourceService.delete(id);
            if (!deleted) return res.status(404).json({ message: "Recurso no encontrado" });

            return res.status(204).send();
        } catch (error) {
            return handleError(res, error);
        }
    }
}