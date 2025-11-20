import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Users = sequelize.define(
  "Users",
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }
  },
  {
    tableName: "Users",
    timestamps: true
  }
);

export default Users;