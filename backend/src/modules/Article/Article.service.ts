import { Article } from "./Article.model.js";

export class ArticleService {

    static async findAll() {
        return Article.findAll({
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return Article.findByPk(id);
    }


    static async create(data: {
        categoryId: number;
        createdById: number;
        name: string;
        description?: string | null;
        type: string;
        specifications: string;
        stock: number;
        status: string;
    }) {
        return Article.create(data);
    }


    static async update(
        article: Article,
        data: {
            categoryId?: number;
            name?: string;
            description?: string | null;
            type?: string;
            specifications?: string;
            stock?: number;
            status?: string;
        }
    ) {
        return article.update(data);
    }


    static async delete(article: Article) {
        await article.destroy();
    }
}