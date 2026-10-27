import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class StockMovement extends Model<
  InferAttributes<StockMovement>,
  InferCreationAttributes<StockMovement>
> {
  declare id: CreationOptional<number>;

  declare articleId: number;

  declare userId: number;

  declare type: string;

  declare quantity: number;

  declare reason: string | null;

  declare createdAt: CreationOptional<Date>;
}

StockMovement.init(
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
      onDelete: "RESTRICT",
    },

    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
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

    tableName: "stock_movements",

    timestamps: true,
    updatedAt: false,
  }
);