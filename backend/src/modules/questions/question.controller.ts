import { Request, Response, NextFunction } from "express";
import { QuestionService } from "./question.service.js";

export class QuestionController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const questions = await QuestionService.findAll();

      res.json(questions);
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

      const question = await QuestionService.findById(id);

      if (!question) {
        res.status(404).json({
          message: "Pregunta no encontrada",
        });

        return;
      }

      res.json(question);

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
      const { categoryId, authorId, acceptedAnswerId, title, content, status } =
        req.body;

      if (!categoryId || !authorId || !title || !content || !status) {
        res.status(400).json({
          message:
            "categoryId, authorId, title, content y status son obligatorios",
        });

        return;
      }

      const question = await QuestionService.create({
        categoryId,
        authorId,
        acceptedAnswerId,
        title,
        content,
        status,
      });

      res.status(201).json(question);

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

      const question = await QuestionService.findById(id);

      if (!question) {
        res.status(404).json({
          message: "Pregunta no encontrada",
        });

        return;
      }

      const updatedQuestion = await QuestionService.update(
        question,
        req.body
      );

      res.json(updatedQuestion);

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

      const question = await QuestionService.findById(id);

      if (!question) {
        res.status(404).json({
          message: "Pregunta no encontrada",
        });

        return;
      }

      await QuestionService.delete(question);

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

      const question = await QuestionService.findEagerById(id);

      if (!question) {
        res.status(404).json({
          message: "Pregunta no encontrada",
        });

        return;
      }

      res.json(question);

    } catch (error) {
      next(error);
    }
  }
}