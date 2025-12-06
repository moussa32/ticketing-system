import { DataTypes } from "sequelize";
import sequelize from "../../lib/database/connection.js"; // adjust path

const Ticket = sequelize.define(
  "Ticket",
  {
    ticket_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "category_id",
      },
      allowNull: true,
    },
    urgency_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "urgency",
        key: "urgency_id",
      },
      allowNull: true,
    },
    dept_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "department",
        key: "dept_id",
      },
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "user_id",
      },
      allowNull: true,
    },
  },
  {
    tableName: "ticket",
    timestamps: false, // since we already have created_at/updated_at
  }
);

export default Ticket;
