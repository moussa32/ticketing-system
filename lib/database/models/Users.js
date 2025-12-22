// Users.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Users = sequelize.define("Users", {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: DataTypes.STRING(50),
  last_name: DataTypes.STRING(50),
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  status: { type: DataTypes.STRING(50), defaultValue: "Active" },
  is_temp_pass: { type: DataTypes.CHAR(1), defaultValue: "N" },
  role_id: { type: DataTypes.INTEGER }
}, {
  tableName: "users",
  timestamps: false
});

export default Users;
