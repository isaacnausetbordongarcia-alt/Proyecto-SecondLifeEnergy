import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class RequestItem extends Model<
    InferAttributes<RequestItem>,
    InferCreationAttributes<RequestItem>
> {
    declare id: CreationOptional<number>;

    declare requestId: number;

    declare articleId: number;

    declare quantity: number;
}

RequestItem.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        requestId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "requests", key: "id" },
            onDelete: "CASCADE",
        },

        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "Articles", key: "id" },
        },

        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: { min: 1 },
        },
    },
    {
        sequelize,

        tableName: "RequestItems",

        timestamps: false,
    }
);