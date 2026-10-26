import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class KitComponent extends Model<
    InferAttributes<KitComponent>,
    InferCreationAttributes<KitComponent>
> {
    declare kitId: number;

    declare componentId: number;

    declare quantity: number;
}

KitComponent.init(
    {
        kitId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },

        componentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },

        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
            validate: { min: 1 },
        },
    },
    {
        sequelize,

        tableName: "kit_components",

        timestamps: false,
    }
);
