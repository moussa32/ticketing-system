import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const TicketAttach = sequelize.define(
  "ticket_attach",
  {
    id: { type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    url: { type: DataTypes.STRING(100), allowNull: false },
    tikcet_id: { type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Ticket',
      key: 'ticket_id',
    },
    onDelete: 'CASCADE',},
  },
  {
    tableName: "ticket_attach",
    timestamps: true
  }
);

export default TicketAttach;