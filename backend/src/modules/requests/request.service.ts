import { Request } from "./request.model.js";

export class RequestService {

    static async findAll() {
        return Request.findAll({
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return Request.findByPk(id);
    }


    static async create(data: {
        reference: string;
        contactName: string;
        contactEmail: string;
        notes?: string | null;
        status?: string;
    }) {
        return Request.create(data);
    }


    static async update(
        request: Request,
        data: {
            reference?: string;
            contactName?: string;
            contactEmail?: string;
            notes?: string | null;
            status?: string;
        }
    ) {
        return request.update(data);
    }


    static async delete(request: Request) {
        await request.destroy();
    }
}