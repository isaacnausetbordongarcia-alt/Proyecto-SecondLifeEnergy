import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>;

    declare name: string;

    declare email: string;

    declare passwordHash: string;

    declare isActive: CreationOptional<boolean>;

    declare createdAt: CreationOptional<Date>;

    declare updatedAt: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },

        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        createdAt: DataTypes.DATE,

        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,

        tableName: "users",

        timestamps: true,
    }
);