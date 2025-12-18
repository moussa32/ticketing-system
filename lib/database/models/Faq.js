import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Faq = sequelize.define(
  "Faq",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  },
  {
    tableName: "faq",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

export default Faq;
