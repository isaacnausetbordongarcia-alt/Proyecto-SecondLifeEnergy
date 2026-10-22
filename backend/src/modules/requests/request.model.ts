import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Request extends Model<
    InferAttributes<Request>,
    InferCreationAttributes<Request>
> {
    declare id: CreationOptional<number>;

    declare reference: string;

    declare contactName: string;

    declare contactEmail: string;

    declare notes: string | null;

    declare status: CreationOptional<string>;

    declare createdAt: CreationOptional<Date>;
}

Request.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        reference: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },

        contactName: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        contactEmail: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: "pending",
        },

        createdAt: DataTypes.DATE,
    },
    {
        sequelize,

        tableName: "requests",

        timestamps: true,

        updatedAt: false,
    }
);