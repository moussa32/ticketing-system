import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Category = sequelize.define(
  "Category",
  {
    category_id: { type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    urgency_name: { type: DataTypes.STRING(100), allowNull: false },
    urgency_id: { type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Urgency',
      key: 'urgency_id',
    },
    onDelete: 'CASCADE',},
  },
  {
    tableName: "Category",
    timestamps: true
  }
);

export default Category;