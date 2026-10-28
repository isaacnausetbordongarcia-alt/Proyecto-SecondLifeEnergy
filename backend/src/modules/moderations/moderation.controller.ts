import { Request, Response, NextFunction } from "express";
import { ModerationService } from "./moderation.service.js";

export class ModerationController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const moderations = await ModerationService.findAll();

      res.json(moderations);
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

      const moderation = await ModerationService.findById(id);

      if (!moderation) {
        res.status(404).json({
          message: "Moderación no encontrada",
        });

        return;
      }

      res.json(moderation);

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
      const { moderatorId, questionId, answerId, action, reason } = req.body;

      if (!moderatorId || !action) {
        res.status(400).json({
          message: "moderatorId y action son obligatorios",
        });

        return;
      }

      if (!questionId && !answerId) {
        res.status(400).json({
          message: "Debes indicar questionId o answerId",
        });

        return;
      }

      const moderation = await ModerationService.create({
        moderatorId,
        questionId,
        answerId,
        action,
        reason,
      });

      res.status(201).json(moderation);

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

      const moderation = await ModerationService.findById(id);

      if (!moderation) {
        res.status(404).json({
          message: "Moderación no encontrada",
        });

        return;
      }

      const updatedModeration = await ModerationService.update(
        moderation,
        req.body
      );

      res.json(updatedModeration);

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

      const moderation = await ModerationService.findById(id);

      if (!moderation) {
        res.status(404).json({
          message: "Moderación no encontrada",
        });

        return;
      }

      await ModerationService.delete(moderation);

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

      const moderation = await ModerationService.findEagerById(id);

      if (!moderation) {
        res.status(404).json({
          message: "Moderación no encontrada",
        });

        return;
      }

      res.json(moderation);

    } catch (error) {
      next(error);
    }
  }
}