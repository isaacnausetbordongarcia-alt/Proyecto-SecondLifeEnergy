import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Question extends Model<
  InferAttributes<Question>,
  InferCreationAttributes<Question>
> {
  declare id: CreationOptional<number>;

  declare categoryId: number;

  declare authorId: number;

  declare acceptedAnswerId: number | null;

  declare title: string;

  declare content: string;

  declare status: string;

  declare createdAt: CreationOptional<Date>;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    authorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    acceptedAnswerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "answers", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    createdAt: DataTypes.DATE,
  },
  {
    sequelize,

    tableName: "questions",

    timestamps: true,
    updatedAt: false,
  }
);