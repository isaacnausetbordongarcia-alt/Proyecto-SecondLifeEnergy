import { Request, Response, NextFunction } from "express";
import { AnswerService } from "./answer.service.js";

export class AnswerController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const answers = await AnswerService.findAll();

      res.json(answers);
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

      const answer = await AnswerService.findById(id);

      if (!answer) {
        res.status(404).json({
          message: "Respuesta no encontrada",
        });

        return;
      }

      res.json(answer);

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
      const { questionId, authorId, content, status } = req.body;

      if (!questionId || !authorId || !content || !status) {
        res.status(400).json({
          message: "questionId, authorId, content y status son obligatorios",
        });

        return;
      }

      const answer = await AnswerService.create({
        questionId,
        authorId,
        content,
        status,
      });

      res.status(201).json(answer);

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

      const answer = await AnswerService.findById(id);

      if (!answer) {
        res.status(404).json({
          message: "Respuesta no encontrada",
        });

        return;
      }

      const updatedAnswer = await AnswerService.update(
        answer,
        req.body
      );

      res.json(updatedAnswer);

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

      const answer = await AnswerService.findById(id);

      if (!answer) {
        res.status(404).json({
          message: "Respuesta no encontrada",
        });

        return;
      }

      await AnswerService.delete(answer);

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

      const answer = await AnswerService.findEagerById(id);

      if (!answer) {
        res.status(404).json({
          message: "Respuesta no encontrada",
        });

        return;
      }

      res.json(answer);

    } catch (error) {
      next(error);
    }
  }
}