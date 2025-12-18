// CustomerSupport.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const CustomerSupport = sequelize.define("CustomerSupport", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.STRING(250), allowNull: false },
  user_id: DataTypes.INTEGER,
  ticket_id: DataTypes.INTEGER
}, {
  tableName: "customer_support",
  timestamps: false
});

export default CustomerSupport;
