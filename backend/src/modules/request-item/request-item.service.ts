import { RequestItem } from "./request-item.model.js";

export class RequestItemService {

    static async findAll() {
        return RequestItem.findAll({
            order: [["id", "ASC"]],
        });
    }


    static async findByRequestId(requestId: number) {
        return RequestItem.findAll({
            where: { requestId },
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return RequestItem.findByPk(id);
    }


    static async create(data: {
        requestId: number;
        articleId: number;
        quantity: number;
    }) {
        return RequestItem.create(data);
    }


    static async update(
        requestItem: RequestItem,
        data: {
            articleId?: number;
            quantity?: number;
        }
    ) {
        return requestItem.update(data);
    }


    static async delete(requestItem: RequestItem) {
        await requestItem.destroy();
    }
}