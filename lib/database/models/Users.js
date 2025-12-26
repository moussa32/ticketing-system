import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Users = sequelize.define("Users", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: "Active",
  },
  is_temp_pass: {
    type: DataTypes.CHAR(1),
    defaultValue: "N",
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "roles",
      key: "role_id",
    },
  },
}, {
  tableName: "users",
  timestamps: false,
});

export default Users;
