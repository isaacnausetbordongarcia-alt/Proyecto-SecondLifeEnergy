import { Request, Response, NextFunction } from "express";
import { SimulationArticlesService } from "./SimulationArticle.service.js";
import { SimulationService } from "../Simulation/Simulation.service.js";
import { ArticleService } from "../Article/Article.service.js";

export class SimulationArticlesController {

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const simulationArticles = await SimulationArticlesService.findAll();

            res.json(simulationArticles);
        } catch (error) {
            next(error);
        }
    }


    static async getOne(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const simulationId = Number(req.params.simulationId);
            const articleId = Number(req.params.articleId);

            const simulationArticle = await SimulationArticlesService.findOne(
                simulationId,
                articleId
            );

            if (!simulationArticle) {
                res.status(404).json({
                    message: "Simulation article not found",
                });

                return;
            }

            res.json(simulationArticle);

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
            const { simulationId, articleId } = req.body;

            if (!simulationId || !articleId) {
                res.status(400).json({
                    message: "simulationId and articleId are required",
                });

                return;
            }

            const simulation = await SimulationService.findById(simulationId);

            if (!simulation) {
                res.status(404).json({
                    message: "Simulation not found",
                });

                return;
            }

            const article = await ArticleService.findById(articleId);

            if (!article) {
                res.status(404).json({
                    message: "Article not found",
                });

                return;
            }

            const existing = await SimulationArticlesService.findOne(
                simulationId,
                articleId
            );

            if (existing) {
                res.status(409).json({
                    message: "Article is already linked to this simulation",
                });

                return;
            }

            const simulationArticle = await SimulationArticlesService.create({
                simulationId,
                articleId,
            });

            res.status(201).json(simulationArticle);

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
            const articleId = Number(req.params.articleId);

            const simulationArticle = await SimulationArticlesService.findOne(
                simulationId,
                articleId
            );

            if (!simulationArticle) {
                res.status(404).json({
                    message: "Simulation article not found",
                });

                return;
            }

            await SimulationArticlesService.delete(simulationArticle);

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}