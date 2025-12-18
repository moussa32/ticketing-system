// CustomerSurvey.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const CustomerSurvey = sequelize.define("CustomerSurvey", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: DataTypes.INTEGER,
  feedback: DataTypes.STRING(250),
  user_id: DataTypes.INTEGER
}, {
  tableName: "customer_survey",
  timestamps: true,
  createdAt: "submitted_at",
  updatedAt: false
});

export default CustomerSurvey;
