// CustomerSupport.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const CustomerComplaint = sequelize.define("CustomerComplaint", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.STRING(250), allowNull: false },
  user_id: DataTypes.INTEGER,
  ticket_id: DataTypes.INTEGER
}, {
  tableName: "customer_complaint",
  timestamps: false
});

export default CustomerComplaint;
