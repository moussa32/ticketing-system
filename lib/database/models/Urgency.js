import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Urgency = sequelize.define(
  "urgency",
  {
    urgency_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    urgency_name: { type: DataTypes.STRING(100), allowNull: false },
    duration: { type: DataTypes.NUMBER, allowNull: false },
  },
  {
    tableName: "urgency",
    timestamps: true,
  }
);

export default Urgency;
