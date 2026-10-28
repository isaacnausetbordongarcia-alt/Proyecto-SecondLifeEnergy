import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class SimulationArticles extends Model<
    InferAttributes<SimulationArticles>,
    InferCreationAttributes<SimulationArticles>
> {
    declare simulationId: number;
    declare articleId: number;
}

SimulationArticles.init(
    {
        simulationId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            references: { model: "Simulations", key: "id" },
            onDelete: "CASCADE",
        },
        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            references: { model: "Articles", key: "id" },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "SimulationArticles",
        timestamps: false,
    }
);