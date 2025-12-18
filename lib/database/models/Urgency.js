// Urgency.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Urgency = sequelize.define("Urgency", {
  urgency_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  urgency_name: { type: DataTypes.STRING(100), allowNull: false },
  duration: { type: DataTypes.INTEGER }
}, {
  tableName: "urgency",
  timestamps: false
});

export default Urgency;
