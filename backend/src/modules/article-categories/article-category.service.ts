import { ArticleCategory } from "./article-category.model.js";

export class ArticleCategoryService {

  static async findAll() {
    return ArticleCategory.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return ArticleCategory.findByPk(id);
  }


  static async create(data: {
    name: string;
    description?: string | null;
    parentCategoryId?: number | null;
  }) {
    return ArticleCategory.create(data);
  }


  static async update(
    articleCategory: ArticleCategory,
    data: Partial<{
      name: string;
      description: string | null;
      parentCategoryId: number | null;
    }>
  ) {
    return articleCategory.update(data);
  }


  static async delete(articleCategory: ArticleCategory) {
    await articleCategory.destroy();
  }

  static async findEagerById(id: number) {
    return ArticleCategory.findByPk(id, {
      include: [
        { model: ArticleCategory, as: "parentCategory" },
      ],
    });
  }
}