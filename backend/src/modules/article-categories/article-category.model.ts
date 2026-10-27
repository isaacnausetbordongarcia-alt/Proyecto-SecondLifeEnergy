import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ArticleCategory extends Model<
  InferAttributes<ArticleCategory>,
  InferCreationAttributes<ArticleCategory>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare description: string | null;

  declare parentCategoryId: number | null;
}

ArticleCategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    parentCategoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "article_categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,

    tableName: "article_categories",

    timestamps: false,
  }
);