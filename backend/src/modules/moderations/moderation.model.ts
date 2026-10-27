import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Moderation extends Model<
  InferAttributes<Moderation>,
  InferCreationAttributes<Moderation>
> {
  declare id: CreationOptional<number>;

  declare moderatorId: number;

  declare questionId: number | null;

  declare answerId: number | null;

  declare action: string;

  declare reason: string | null;

  declare createdAt: CreationOptional<Date>;
}

Moderation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    moderatorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "moderators", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    questionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "questions", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    answerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "answers", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    reason: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    createdAt: DataTypes.DATE,
  },
  {
    sequelize,

    tableName: "moderations",

    timestamps: true,
    updatedAt: false,
  }
);