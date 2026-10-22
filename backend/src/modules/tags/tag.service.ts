import { Tag } from "./tag.model.js";

export class TagService {

    static async findAll() {
        return Tag.findAll({
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return Tag.findByPk(id);
    }


    static async create(data: {
        name: string;
        slug: string;
    }) {
        return Tag.create(data);
    }


    static async update(
        tag: Tag,
        data: {
            name?: string;
            slug?: string;
        }
    ) {
        return tag.update(data);
    }


    static async delete(tag: Tag) {
        await tag.destroy();
    }
}