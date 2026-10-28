import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ArticleReview extends Model<
  InferAttributes<ArticleReview>,
  InferCreationAttributes<ArticleReview>
> {
  declare id: CreationOptional<number>;

  declare articleId: number;

  declare reviewerId: number;

  declare decision: string;

  declare comments: string | null;

  declare createdAt: CreationOptional<Date>;
}

ArticleReview.init(
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

    reviewerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    decision: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    createdAt: DataTypes.DATE,
  },
  {
    sequelize,

    tableName: "article_reviews",

    timestamps: true,
    updatedAt: false,
  }
);