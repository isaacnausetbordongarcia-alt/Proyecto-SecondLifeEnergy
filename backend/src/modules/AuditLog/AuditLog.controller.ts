import { Request, Response } from "express";
import { AuditLogService } from "./AuditLog.service.js";

function handleError(res: Response, error: unknown) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
}

const asString = (v: unknown): string | undefined =>
    typeof v === "string" ? v : undefined;

function parsePositiveInt(value: unknown): number | null {
    const raw = Array.isArray(value) ? value[0] : value;
    const n = Number(raw);
    return Number.isInteger(n) && n > 0 ? n : null;
}

function parseDate(value: unknown): Date | undefined {
    const str = asString(value);
    if (!str) return undefined;
    const date = new Date(str);
    return isNaN(date.getTime()) ? undefined : date;
}

export class AuditLogController {
    static async getAll(req: Request, res: Response) {
        try {
            const { userId, entity, entityId, action, from, to, limit, offset } = req.query;

            const limitNum = parsePositiveInt(limit);
            const offsetNum = Number(asString(offset));

            const result = await AuditLogService.getAll({
                userId: parsePositiveInt(userId) ?? undefined,
                entity: asString(entity),
                entityId: parsePositiveInt(entityId) ?? undefined,
                action: asString(action),
                from: parseDate(from),
                to: parseDate(to),
                limit: limitNum ? Math.min(limitNum, 200) : undefined,
                offset: Number.isInteger(offsetNum) && offsetNum > 0 ? offsetNum : undefined,
            });

            return res.json(result);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parsePositiveInt(req.params.id);
            if (!id) return res.status(400).json({ message: "ID no válido" });

            const log = await AuditLogService.getById(id);
            if (!log) return res.status(404).json({ message: "Registro no encontrado" });

            return res.json(log);
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async getByEntity(req: Request, res: Response) {
        try {
            const entity = asString(req.params.entity);
            const entityId = parsePositiveInt(req.params.entityId);
            if (!entity || !entityId) {
                return res.status(400).json({ message: "Entidad o ID no válidos" });
            }

            const logs = await AuditLogService.getByEntity(entity, entityId);
            return res.json(logs);
        } catch (error) {
            return handleError(res, error);
        }
    }
}