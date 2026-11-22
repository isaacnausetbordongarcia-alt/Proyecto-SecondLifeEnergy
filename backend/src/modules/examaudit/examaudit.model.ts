import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ExamAudit extends Model<
  InferAttributes<ExamAudit>,
  InferCreationAttributes<ExamAudit>
> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare operation: "CREATE" | "MODIFY" | "READ" | null;
  declare userId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ExamAudit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    operation: {
      type: DataTypes.ENUM("CREATE", "MODIFY", "READ"),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "examen_audit", // el enunciado pide este nombre de tabla
    timestamps: true,
  }
);