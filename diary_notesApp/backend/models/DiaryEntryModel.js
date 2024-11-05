const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('diary_notesApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class DiaryEntry extends Model {}

DiaryEntry.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  sequelize,
  modelName: 'DiaryEntry',
  tableName: 'DiaryEntries',
  timestamps: false,
});

module.exports = DiaryEntry;