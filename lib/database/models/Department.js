import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Department = sequelize.define(
  "department",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
  },
  {
    tableName: "Departments",
    timestamps: false,
  }
);

export default Department;
