import { Request, Response, NextFunction } from "express";
import { SimulationService } from "./Simulation.service.js";

export class SimulationController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const simulations = await SimulationService.findAll();

            res.json(simulations);
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

            const simulation = await SimulationService.findById(id);

            if (!simulation) {
                res.status(404).json({
                    message: "Simulation not found",
                });

                return;
            }

            res.json(simulation);

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
            const {
                title,
                description,
                platform,
                url,
                objectives,
                materials,
            } = req.body;

            if (!title || !platform || !url || !objectives) {
                res.status(400).json({
                    message: "title, platform, url and objectives are required",
                });

                return;
            }

            const simulation = await SimulationService.create({
                title,
                description,
                platform,
                url,
                objectives,
                materials,
            });

            res.status(201).json(simulation);

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

            const simulation = await SimulationService.findById(id);

            if (!simulation) {
                res.status(404).json({
                    message: "Simulation not found",
                });

                return;
            }

            const {
                title,
                description,
                platform,
                url,
                objectives,
                materials,
            } = req.body;

            const updatedSimulation = await SimulationService.update(
                simulation,
                {
                    title,
                    description,
                    platform,
                    url,
                    objectives,
                    materials,
                }
            );

            res.json(updatedSimulation);

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

            const simulation = await SimulationService.findById(id);

            if (!simulation) {
                res.status(404).json({
                    message: "Simulation not found",
                });

                return;
            }

            await SimulationService.delete(simulation);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}