import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class KitComponent extends Model<
  InferAttributes<KitComponent>,
  InferCreationAttributes<KitComponent>
> {
  declare kitId: number;

  declare componentId: number;

  declare quantity: CreationOptional<number>;
}

KitComponent.init(
  {
    kitId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: { model: "kits", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    componentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: { model: "components", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,

    tableName: "kit_components",

    timestamps: false,
  }
);