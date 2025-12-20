import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Categories = sequelize.define(
  "Categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    urgencyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "urgency",
        key: "urgency_id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Categories;
