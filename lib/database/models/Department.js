// Department.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Department = sequelize.define("Department", {
  dept_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dept_name: { type: DataTypes.STRING(100), allowNull: false }
}, {
  tableName: "department",
  timestamps: false
});

export default Department;
