import { StockMovement } from "./stock-movement.model.js";
import { Article } from "../articles/article.model";
import { User } from "../users/user.model.js";

export class StockMovementService {

  static async findAll() {
    return StockMovement.findAll({
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


  static async update(
    stockMovement: StockMovement,
    data: Partial<{
      articleId: number;
      userId: number;
      type: string;
      quantity: number;
      reason: string | null;
    }>
  ) {
    return stockMovement.update(data);
  }


  static async delete(stockMovement: StockMovement) {
    await stockMovement.destroy();
  }

  static async findEagerById(id: number) {
    return StockMovement.findByPk(id, {
      include: [
        { model: Article, as: "article" },
        { model: User, as: "user" },
      ],
    });
  }
}