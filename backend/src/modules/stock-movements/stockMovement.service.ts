import { StockMovement } from "./stockMovement.model.js";

export class StockMovementService {

    static async findAll(filters: { articleId?: number; userId?: number } = {}) {
        return StockMovement.findAll({
            where: {
                ...(filters.articleId !== undefined && { articleId: filters.articleId }),
                ...(filters.userId !== undefined && { userId: filters.userId }),
            },
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return StockMovement.findByPk(id);
    }


    static async create(data: {
        articleId: number;
        userId: number;
        type: string;
        quantity: number;
        reason?: string | null;
    }) {
        return StockMovement.create(data);
    }
}
