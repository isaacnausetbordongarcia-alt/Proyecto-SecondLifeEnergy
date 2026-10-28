import { Op, WhereOptions } from "sequelize";
import { AuditLog } from "./audit-log.model.js";

export interface AuditLogFilters {
    userId?: number;
    entity?: string;
    entityId?: number;
    action?: string;
    from?: Date;
    to?: Date;
    limit?: number;
    offset?: number;
}

export interface LogEntry {
    userId: number;
    entity: string;
    entityId: number;
    action: string;
    previousValues?: object | null;
    newValues?: object | null;
}

export class AuditLogService {
    // Uso interno: llamar desde otros services (create/update/delete)
    static async log(entry: LogEntry): Promise<AuditLog> {
        return AuditLog.create({
            userId: entry.userId,
            entity: entry.entity,
            entityId: entry.entityId,
            action: entry.action,
            previousValues: entry.previousValues ?? null,
            newValues: entry.newValues ?? null,
        });
    }

    static async getAll(filters: AuditLogFilters = {}): Promise<{ rows: AuditLog[]; count: number }> {
        const where: WhereOptions<AuditLog> = {};

        if (filters.userId) where.userId = filters.userId;
        if (filters.entity) where.entity = filters.entity;
        if (filters.entityId) where.entityId = filters.entityId;
        if (filters.action) where.action = filters.action;

        if (filters.from || filters.to) {
            where.createdAt = {
                ...(filters.from && { [Op.gte]: filters.from }),
                ...(filters.to && { [Op.lte]: filters.to }),
            };
        }

        return AuditLog.findAndCountAll({
            where,
            order: [["createdAt", "DESC"]],
            limit: filters.limit ?? 50,
            offset: filters.offset ?? 0,
        });
    }

    static async getById(id: number): Promise<AuditLog | null> {
        return AuditLog.findByPk(id);
    }

    static async getByEntity(entity: string, entityId: number): Promise<AuditLog[]> {
        return AuditLog.findAll({
            where: { entity, entityId },
            order: [["createdAt", "DESC"]],
        });
    }
}