import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Tickets = sequelize.define(
  "Tickets",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.ENUM(
        "Open",
        "In Progress",
        "Pending",
        "Resolved",
        "Closed"
      ),
      allowNull: false,
      defaultValue: "Open",
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Categories",
        key: "id",
      },
    },
  },
  {
    tableName: "Tickets",
    timestamps: true,
  }
);

export default Tickets;
