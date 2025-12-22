// Role.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Role = sequelize.define("Role", {
  role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role_name: { type: DataTypes.STRING(100), allowNull: false }
}, {
  tableName: "roles",
  timestamps: false
});

export default Role;
