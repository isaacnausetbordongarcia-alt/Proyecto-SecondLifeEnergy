import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class AuditLog extends Model<InferAttributes<AuditLog>, InferCreationAttributes<AuditLog>> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare entity: string;
    declare entityId: number;
    declare action: string;
    declare previousValues: object | null;
    declare newValues: object | null;
    declare createdAt: CreationOptional<Date>;
}

AuditLog.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "Users", key: "id" },
        },
        entity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        entityId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        previousValues: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        newValues: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "AuditLogs",
        timestamps: false,
    }
);