import { Request, Response, NextFunction } from "express";
import { ArticleCategoryService } from "./article-category.service.js";

export class ArticleCategoryController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const articleCategories = await ArticleCategoryService.findAll();

      res.json(articleCategories);
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

      const articleCategory = await ArticleCategoryService.findById(id);

      if (!articleCategory) {
        res.status(404).json({
          message: "Categoría de artículo no encontrada",
        });

        return;
      }

      res.json(articleCategory);

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
      const { name, description, parentCategoryId } = req.body;

      if (!name) {
        res.status(400).json({
          message: "name es obligatorio",
        });

        return;
      }

      const articleCategory = await ArticleCategoryService.create({
        name,
        description,
        parentCategoryId,
      });

      res.status(201).json(articleCategory);

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

      const articleCategory = await ArticleCategoryService.findById(id);

      if (!articleCategory) {
        res.status(404).json({
          message: "Categoría de artículo no encontrada",
        });

        return;
      }

      if (req.body.parentCategoryId === id) {
        res.status(400).json({
          message: "Una categoría no puede ser su propia categoría padre",
        });

        return;
      }

      const updatedArticleCategory = await ArticleCategoryService.update(
        articleCategory,
        req.body
      );

      res.json(updatedArticleCategory);

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

      const articleCategory = await ArticleCategoryService.findById(id);

      if (!articleCategory) {
        res.status(404).json({
          message: "Categoría de artículo no encontrada",
        });

        return;
      }

      await ArticleCategoryService.delete(articleCategory);

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

      const articleCategory = await ArticleCategoryService.findEagerById(id);

      if (!articleCategory) {
        res.status(404).json({
          message: "Categoría de artículo no encontrada",
        });

        return;
      }

      res.json(articleCategory);

    } catch (error) {
      next(error);
    }
  }
}