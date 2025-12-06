import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';

const Urgency = sequelize.define('Urgency', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true,
  tableName: 'Urgencies'
});

export default Urgency;
