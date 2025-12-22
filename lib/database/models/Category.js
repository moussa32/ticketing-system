// Category.js
import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Category = sequelize.define("Category", {
  category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category_name: { type: DataTypes.STRING(150), allowNull: false },
  urgency_id: { type: DataTypes.INTEGER }
}, {
  tableName: "category",
  timestamps: false
});

export default Category;
