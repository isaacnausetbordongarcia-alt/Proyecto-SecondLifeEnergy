import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Answer extends Model<
  InferAttributes<Answer>,
  InferCreationAttributes<Answer>
> {
  declare id: CreationOptional<number>;

  declare questionId: number;

  declare authorId: number;

  declare content: string;

  declare status: string;

  declare createdAt: CreationOptional<Date>;
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    questionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "questions", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    authorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
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

    tableName: "answers",

    timestamps: true,
    updatedAt: false,
  }
);