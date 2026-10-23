import { Simulation } from "./Simulation.model.js";

export class SimulationService {

    static async findAll() {
        return Simulation.findAll({
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return Simulation.findByPk(id);
    }


    static async create(data: {
        title: string;
        description?: string | null;
        platform: string;
        url: string;
        objectives: string;
        materials?: string | null;
    }) {
        return Simulation.create(data);
    }


    static async update(
        simulation: Simulation,
        data: {
            title?: string;
            description?: string | null;
            platform?: string;
            url?: string;
            objectives?: string;
            materials?: string | null;
        }
    ) {
        return simulation.update(data);
    }


    static async delete(simulation: Simulation) {
        await simulation.destroy();
    }
}