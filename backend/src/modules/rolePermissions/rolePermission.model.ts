import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class RolePermission extends Model<
    InferAttributes<RolePermission>,
    InferCreationAttributes<RolePermission>
> {
    static findById(id: number) {
        throw new Error("Method not implemented.");
    }
    declare roleId: number;

    declare permissionId: number;
}

RolePermission.init(
    {
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

        permissionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        
    },
    {
        sequelize,

        tableName: "role_permissions",

        timestamps: false,
    }
);