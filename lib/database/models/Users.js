import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Users = sequelize.define(
  "Users",
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { 
      type: DataTypes.ENUM('admin', 'agent', 'customer'), 
      allowNull: false, 
      defaultValue: 'customer' 
    },
    password: { type: DataTypes.STRING, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  {
    tableName: "Users",
    timestamps: true
  }
);

export default Users;