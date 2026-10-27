import { SimulationArticles } from "./SimulationArticles.model.js";

export class SimulationArticlesService {

    static async findAll() {
        return SimulationArticles.findAll({
            order: [
                ["simulationId", "ASC"],
                ["articleId", "ASC"],
            ],
        });
    }


    static async FindById(simulationId: number, articleId: number) {
        return SimulationArticles.findOne({
            where: { simulationId, articleId },
        });
    }


    static async create(data: {
        simulationId: number;
        articleId: number;
    }) {
        return SimulationArticles.create(data);
    }


    static async delete(simulationArticle: SimulationArticles) {
        await simulationArticle.destroy();
    }
}