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
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "faq",
    timestamps: false // ← because only created_at exists, no updated_at
  }
);

export default Faq;
