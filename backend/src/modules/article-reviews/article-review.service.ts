import { ArticleReview } from "./article-review.model.js";
import { Article } from "../articles/article.model";
import { User } from "../users/user.model.js";

export class ArticleReviewService {

  static async findAll() {
    return ArticleReview.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return ArticleReview.findByPk(id);
  }


  static async create(data: {
    articleId: number;
    reviewerId: number;
    decision: string;
    comments?: string | null;
  }) {
    return ArticleReview.create(data);
  }


  static async update(
    articleReview: ArticleReview,
    data: Partial<{
      articleId: number;
      reviewerId: number;
      decision: string;
      comments: string | null;
    }>
  ) {
    return articleReview.update(data);
  }


  static async delete(articleReview: ArticleReview) {
    await articleReview.destroy();
  }

  static async findEagerById(id: number) {
    return ArticleReview.findByPk(id, {
      include: [
        { model: Article, as: "article" },
        { model: User, as: "reviewer" },
      ],
    });
  }
}