import { Request, Response, NextFunction } from "express";
import { ArticleReviewService } from "./article-review.service.js";

export class ArticleReviewController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const articleReviews = await ArticleReviewService.findAll();

      res.json(articleReviews);
    } catch (error) {
      next(error);
    }
  }


  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const articleReview = await ArticleReviewService.findById(id);

      if (!articleReview) {
        res.status(404).json({
          message: "Revisión de artículo no encontrada",
        });

        return;
      }

      res.json(articleReview);

    } catch (error) {
      next(error);
    }
  }


  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { articleId, reviewerId, decision, comments } = req.body;

      if (!articleId || !reviewerId || !decision) {
        res.status(400).json({
          message: "articleId, reviewerId y decision son obligatorios",
        });

        return;
      }

      const articleReview = await ArticleReviewService.create({
        articleId,
        reviewerId,
        decision,
        comments,
      });

      res.status(201).json(articleReview);

    } catch (error) {
      next(error);
    }
  }


  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const articleReview = await ArticleReviewService.findById(id);

      if (!articleReview) {
        res.status(404).json({
          message: "Revisión de artículo no encontrada",
        });

        return;
      }

      const updatedArticleReview = await ArticleReviewService.update(
        articleReview,
        req.body
      );

      res.json(updatedArticleReview);

    } catch (error) {
      next(error);
    }
  }


  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const articleReview = await ArticleReviewService.findById(id);

      if (!articleReview) {
        res.status(404).json({
          message: "Revisión de artículo no encontrada",
        });

        return;
      }

      await ArticleReviewService.delete(articleReview);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }


  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const articleReview = await ArticleReviewService.findEagerById(id);

      if (!articleReview) {
        res.status(404).json({
          message: "Revisión de artículo no encontrada",
        });

        return;
      }

      res.json(articleReview);

    } catch (error) {
      next(error);
    }
  }
}