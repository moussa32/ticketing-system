// TicketAttach.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const TicketAttach = sequelize.define("TicketAttach", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING(255), allowNull: false },
  ticket_id: { type: DataTypes.INTEGER, allowNull: false },
  reply_id: { type: DataTypes.INTEGER }
}, {
  tableName: "ticket_attach",
  timestamps: false
});

export default TicketAttach;
