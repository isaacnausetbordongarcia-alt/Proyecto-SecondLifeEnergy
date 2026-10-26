import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class RolePermission extends Model<
    InferAttributes<RolePermission>,
    InferCreationAttributes<RolePermission>
> {
    declare roleId: number;

    declare permissionId: number;
}

RolePermission.init(
    {
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },

        permissionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        sequelize,

        tableName: "role_permissions",

        timestamps: false,
    }
);
