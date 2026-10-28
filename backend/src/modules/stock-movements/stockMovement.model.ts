import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// El ERD define type como string; estos valores son una propuesta //<--- esto se lo preguntamos a tibu xk la ia no para decirme de usar esto
export const STOCK_MOVEMENT_TYPES = ["in", "out", "adjustment"] as const;

export type StockMovementType = (typeof STOCK_MOVEMENT_TYPES)[number];

export class StockMovement extends Model<
    InferAttributes<StockMovement>,
    InferCreationAttributes<StockMovement>
> {
    declare id: CreationOptional<number>;

    declare articleId: number;

    declare userId: number;

    declare type: string;

    declare quantity: number;

    declare reason: CreationOptional<string | null>;

    declare createdAt: CreationOptional<Date>;
}

StockMovement.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        type: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        reason: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        createdAt: DataTypes.DATE,
    },
    {
        sequelize,

        tableName: "stock_movements",

        timestamps: true,

        updatedAt: false,
    }
);
