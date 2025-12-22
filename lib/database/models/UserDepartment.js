// UserDepartment.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const UserDepartment = sequelize.define("UserDepartment", {
  user_id: { type: DataTypes.INTEGER, primaryKey: true },
  dept_id: { type: DataTypes.INTEGER, primaryKey: true }
}, {
  tableName: "user_department",
  timestamps: false
});

export default UserDepartment;
