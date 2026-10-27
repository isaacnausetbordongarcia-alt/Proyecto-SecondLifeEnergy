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

  declare altText: string | null;

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
      references: { model: "articles", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
      type: DataTypes.INTEGER.UNSIGNED,
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