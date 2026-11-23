import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class UserRole extends Model<
    InferAttributes<UserRole>,
    InferCreationAttributes<UserRole>
> {
    declare userId: number;

    declare roleId: number;

    declare assignedAt: CreationOptional<Date>;
}

UserRole.init(
    {
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },

        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },

        assignedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,

        tableName: "user_roles",

        timestamps: false,
    }
);
