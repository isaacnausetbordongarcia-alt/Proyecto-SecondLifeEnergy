import { ArticleImage } from "./articleImage.model.js";

export class ArticleImageService {

    static async findAll(filters: { articleId?: number } = {}) {
        return ArticleImage.findAll({
            where: {
                ...(filters.articleId !== undefined && { articleId: filters.articleId }),
            },
            order: [["articleId", "ASC"], ["sortOrder", "ASC"], ["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return ArticleImage.findByPk(id);
    }


    static async create(data: {
        articleId: number;
        url: string;
        altText?: string | null;
        sortOrder?: number;
    }) {
        return ArticleImage.create(data);
    }


    static async update(
        articleImage: ArticleImage,
        data: {
            articleId?: number;
            url?: string;
            altText?: string | null;
            sortOrder?: number;
        }
    ) {
        const values = Object.fromEntries(
            Object.entries(data).filter(([, value]) => value !== undefined)
        );

        return articleImage.update(values);
    }


    static async delete(articleImage: ArticleImage) {
        await articleImage.destroy();
    }
}
