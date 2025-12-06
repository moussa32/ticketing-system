import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Sessions = sequelize.define(
  "Sessions",
  {
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    token: { type: DataTypes.STRING, allowNull: false, unique: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    expiresAt: { type: DataTypes.DATE, allowNull: false }
  },
  {
    tableName: "Sessions",
    timestamps: true
  }
);

export default Sessions;
