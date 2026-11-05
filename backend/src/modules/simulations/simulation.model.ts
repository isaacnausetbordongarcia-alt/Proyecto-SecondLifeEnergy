import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Simulation extends Model<
    InferAttributes<Simulation>,
    InferCreationAttributes<Simulation>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string | null;
    declare platform: string;
    declare url: string;
    declare objectives: string;
    declare materials: string | null;
}

Simulation.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        platform: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        objectives: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        materials: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "Simulations",
        timestamps: false,
    }
);