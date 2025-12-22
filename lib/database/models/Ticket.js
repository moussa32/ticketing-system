// Ticket.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Ticket = sequelize.define("Ticket", {
  ticket_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  subject: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.STRING(500), allowNull: false },
  status: DataTypes.STRING(50),
  category_id: DataTypes.INTEGER,
  urgency_id: DataTypes.INTEGER,
  dept_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER
}, {
  tableName: "ticket",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

export default Ticket;
