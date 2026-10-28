import { Request, Response, NextFunction } from "express";
import { SimulationResourceService } from "./simulation-resource.service.js";

export class SimulationResourceController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const simulationResources = await SimulationResourceService.findAll();

      res.json(simulationResources);
    } catch (error) {
      next(error);
    }
  }


  static async getByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const simulationId = Number(req.params.simulationId);
      const resourceId = Number(req.params.resourceId);

      const simulationResource = await SimulationResourceService.findByIds(
        simulationId,
        resourceId
      );

      if (!simulationResource) {
        res.status(404).json({
          message: "Relación simulación-recurso no encontrada",
        });

        return;
      }

      res.json(simulationResource);

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
      const { simulationId, resourceId } = req.body;

      if (!simulationId || !resourceId) {
        res.status(400).json({
          message: "simulationId y resourceId son obligatorios",
        });

        return;
      }

      const existing = await SimulationResourceService.findByIds(
        simulationId,
        resourceId
      );

      if (existing) {
        res.status(409).json({
          message: "Esta relación simulación-recurso ya existe",
        });

        return;
      }

      const simulationResource = await SimulationResourceService.create({
        simulationId,
        resourceId,
      });

      res.status(201).json(simulationResource);

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
      const simulationId = Number(req.params.simulationId);
      const resourceId = Number(req.params.resourceId);

      const simulationResource = await SimulationResourceService.findByIds(
        simulationId,
        resourceId
      );

      if (!simulationResource) {
        res.status(404).json({
          message: "Relación simulación-recurso no encontrada",
        });

        return;
      }

      await SimulationResourceService.delete(simulationResource);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }


  static async getEagerlyByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const simulationId = Number(req.params.simulationId);
      const resourceId = Number(req.params.resourceId);

      const simulationResource = await SimulationResourceService.findEagerByIds(
        simulationId,
        resourceId
      );

      if (!simulationResource) {
        res.status(404).json({
          message: "Relación simulación-recurso no encontrada",
        });

        return;
      }

      res.json(simulationResource);

    } catch (error) {
      next(error);
    }
  }
}