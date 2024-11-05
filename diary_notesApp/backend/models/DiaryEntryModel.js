const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('None', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

class DiaryEntry extends Model {}

DiaryEntry.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, { 
  sequelize, 
  modelName: 'DiaryEntry',
  timestamps: false 
});

module.exports = DiaryEntry;
