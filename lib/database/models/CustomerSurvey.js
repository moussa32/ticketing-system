import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const CustomerSurvey = sequelize.define(
  "CustomerSurvey",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    },

    feedback: {
      type: DataTypes.STRING(250),
      allowNull: true
    },

    satisfaction: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },

    submitted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "user_id"
      }
    }
  },
  {
    tableName: "customer_survey",
    timestamps: false // because only submitted_at exists
  }
);

export default CustomerSurvey;
