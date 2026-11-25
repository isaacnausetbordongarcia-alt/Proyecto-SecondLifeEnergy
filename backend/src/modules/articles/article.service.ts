import { Op } from "sequelize";
import { Article } from "./article.model.js";

export class ArticleService {

    // Sin includeDrafts, el catálogo no muestra borradores (HU-03)
    static async findAll(includeDrafts = false) {
        return Article.findAll({
            where: includeDrafts ? {} : { status: { [Op.ne]: "draft" } },
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Article.findByPk(id);
    }

    // Admin y docente gestionan todo; el resto solo lo que ha creado
    static canModify(article: Article, userId: number, roleNames: string[]) {
        return (
            roleNames.includes("admin") ||
            roleNames.includes("docente") ||
            article.createdById === userId
        );
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