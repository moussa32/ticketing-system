// ReplyTicket.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const ReplyTicket = sequelize.define("ReplyTicket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  reply_message: { type: DataTypes.STRING(500), allowNull: false },
  ticket_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: DataTypes.INTEGER
}, {
  tableName: "reply_tickets",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false
});

export default ReplyTicket;
