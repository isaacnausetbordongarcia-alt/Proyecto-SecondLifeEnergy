import { SimulationResource } from "./simulation-resource.model.js";
import { Simulation } from "../simulations/simulation.model.js";
import { Resource } from "../resources/resource.model";

export class SimulationResourceService {

  static async findAll() {
    return SimulationResource.findAll({
      order: [
        ["simulationId", "ASC"],
        ["resourceId", "ASC"],
      ],
    });
  }


  static async findByIds(simulationId: number, resourceId: number) {
    return SimulationResource.findOne({
      where: { simulationId, resourceId },
    });
  }


  static async create(data: {
    simulationId: number;
    resourceId: number;
  }) {
    return SimulationResource.create(data);
  }


  static async delete(simulationResource: SimulationResource) {
    await simulationResource.destroy();
  }

  static async findEagerByIds(simulationId: number, resourceId: number) {
    return SimulationResource.findOne({
      where: { simulationId, resourceId },
      include: [
        { model: Simulation, as: "simulation" },
        { model: Resource, as: "resource" },
      ],
    });
  }
}