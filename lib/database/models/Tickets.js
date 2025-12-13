import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Tickets = sequelize.define(
  "Tickets",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { 
      type: DataTypes.ENUM('Open', 'In Progress', 'Pending', 'Resolved', 'Closed'), 
      allowNull: false, 
      defaultValue: 'Open' 
    },
    priority: { 
      type: DataTypes.ENUM('Low', 'Medium', 'High', 'Urgent'), 
      allowNull: false, 
      defaultValue: 'Medium' 
    },
    assignedTo: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    customerId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  },
  {
    tableName: "Tickets",
    timestamps: true
  }
);

export default Tickets;
