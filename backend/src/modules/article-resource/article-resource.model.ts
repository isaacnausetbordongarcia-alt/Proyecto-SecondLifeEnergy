import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../../config/database.js";

export class ArticleResource extends Model<
    InferAttributes<ArticleResource>,
    InferCreationAttributes<ArticleResource>
> {
    declare articleId: number;
    declare resourceId: number;
}

ArticleResource.init(
    {
        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            references: { model: "Articles", key: "id" },
            onDelete: "CASCADE",
        },
        resourceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            references: { model: "Resources", key: "id" },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "ArticleResources",
        timestamps: false,
    }
);