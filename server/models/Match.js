const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  candidateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Jobs',
      key: 'id'
    }
  },
  candidateLiked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  companyLiked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  matched: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  matchedAt: {
    type: DataTypes.DATE,
    defaultValue: null
  }
});

module.exports = Match;

