const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  salary: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  workMode: {
    type: DataTypes.ENUM('presential', 'remote', 'hybrid'),
    defaultValue: 'presential'
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyLogo: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Job;

