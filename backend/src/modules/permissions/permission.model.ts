import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Permission extends Model<
    InferAttributes<Permission>,
    InferCreationAttributes<Permission>
> {
    declare id: CreationOptional<number>;

    declare code: string;

    declare description: string | null;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        code: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,

        tableName: "permissions",

        timestamps: false,
    }
);