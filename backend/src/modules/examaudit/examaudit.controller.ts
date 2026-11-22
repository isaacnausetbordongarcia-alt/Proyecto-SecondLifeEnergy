import { Request, Response, NextFunction } from "express";
import { ExamAuditService } from "./examaudit.service.js";

const OPERATIONS = ["CREATE", "MODIFY", "READ"];

export class ExamAuditController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const examAudits = await ExamAuditService.findAll();
      res.json(examAudits);
    } catch (error) {
      next(error);
    }
  }


  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      res.json(examAudit);
    } catch (error) {
      next(error);
    }
  }


  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { description, operation, userId } = req.body;

      if (!description || !userId) {
        res.status(400).json({ message: "description y userId son obligatorios" });
        return;
      }

      if (operation != null && !OPERATIONS.includes(operation)) {
        res.status(400).json({ message: "operation debe ser CREATE, MODIFY, READ o null" });
        return;
      }

      const examAudit = await ExamAuditService.create({ description, operation, userId });
      res.status(201).json(examAudit);
    } catch (error) {
      next(error);
    }
  }


  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      const { operation } = req.body;
      if (operation != null && !OPERATIONS.includes(operation)) {
        res.status(400).json({ message: "operation debe ser CREATE, MODIFY, READ o null" });
        return;
      }

      const updated = await ExamAuditService.update(examAudit, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }


  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      await ExamAuditService.delete(examAudit);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }


  static async getEagerlyById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findEagerById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      res.json(examAudit);
    } catch (error) {
      next(error);
    }
  }


  static async getOperationCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExamAuditService.findOperationCreate();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}