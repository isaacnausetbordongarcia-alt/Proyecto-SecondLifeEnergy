import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../../config/database.js";

export class ResourceTag extends Model<
    InferAttributes<ResourceTag>,
    InferCreationAttributes<ResourceTag>
> {
    declare resourceId: number;
    declare tagId: number;
}

ResourceTag.init(
    {
        resourceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            references: { model: "Resources", key: "id" },
            onDelete: "CASCADE",
        },
        tagId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            references: { model: "Tags", key: "id" },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "ResourceTags",
        timestamps: false,
    }
);