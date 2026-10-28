import { Op, WhereOptions, CreationAttributes } from "sequelize";
import { Resource } from "./resource.model.js";

export interface ResourceFilters {
    authorId?: number;
    type?: string;
    topic?: string;
    difficulty?: string;
    status?: string;
    search?: string;
}

export class ResourceService {
    static async getAll(filters: ResourceFilters = {}): Promise<Resource[]> {
        const where: WhereOptions<Resource> = {};

        if (filters.authorId) where.authorId = filters.authorId;
        if (filters.type) where.type = filters.type;
        if (filters.topic) where.topic = filters.topic;
        if (filters.difficulty) where.difficulty = filters.difficulty;
        if (filters.status) where.status = filters.status;
        if (filters.search) where.title = { [Op.like]: `%${filters.search}%` };

        return Resource.findAll({ where, order: [["publishedAt", "DESC"]] });
    }

    static async getById(id: number): Promise<Resource | null> {
        return Resource.findByPk(id);
    }

    static async create(data: CreationAttributes<Resource>): Promise<Resource> {
        return Resource.create(data);
    }

    static async update(
        id: number,
        data: Partial<CreationAttributes<Resource>>
    ): Promise<Resource | null> {
        const resource = await Resource.findByPk(id);
        if (!resource) return null;

        // Evitamos modificar id y createdAt
        const { id: _id, createdAt: _createdAt, ...allowed } = data;
        return resource.update(allowed);
    }

    static async delete(id: number): Promise<boolean> {
        const deleted = await Resource.destroy({ where: { id } });
        return deleted > 0;
    }
}