import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class SimulationResource extends Model<
  InferAttributes<SimulationResource>,
  InferCreationAttributes<SimulationResource>
> {
  declare simulationId: number;

  declare resourceId: number;
}

SimulationResource.init(
  {
    simulationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: { model: "simulations", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    resourceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: { model: "resources", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,

    tableName: "simulation_resources",

    timestamps: false,
  }
);