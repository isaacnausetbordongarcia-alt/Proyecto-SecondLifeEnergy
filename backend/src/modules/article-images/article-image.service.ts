import { ArticleImage } from "./article-image.model.js";
import { Article } from "../articles/article.model";

export class ArticleImageService {

  static async findAll() {
    return ArticleImage.findAll({
      order: [["id", "ASC"]],
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
    data: Partial<{
      articleId: number;
      url: string;
      altText: string | null;
      sortOrder: number;
    }>
  ) {
    return articleImage.update(data);
  }


  static async delete(articleImage: ArticleImage) {
    await articleImage.destroy();
  }

  static async findEagerById(id: number) {
    return ArticleImage.findByPk(id, {
      include: [
        { model: Article, as: "article" },
      ],
    });
  }
}