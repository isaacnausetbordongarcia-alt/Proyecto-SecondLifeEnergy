import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ArticleImage extends Model<
    InferAttributes<ArticleImage>,
    InferCreationAttributes<ArticleImage>
> {
    declare id: CreationOptional<number>;

    declare articleId: number;

    declare url: string;

    declare altText: CreationOptional<string | null>;

    declare sortOrder: CreationOptional<number>;
}

ArticleImage.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },

        altText: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        sortOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,

        tableName: "article_images",

        timestamps: false,
    }
);
