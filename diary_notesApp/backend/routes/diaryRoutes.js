const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');

// POST /diary - Create a new diary entry
router.post('/diary', diaryController.createDiaryEntry);

// GET /diaries - Retrieve all diary entries
router.get('/diaries', diaryController.getAllDiaryEntries);

// GET /diary/:id - Retrieve a specific diary entry by ID
router.get('/diary/:id', diaryController.getDiaryEntryById);

// PUT /diary/:id - Update a diary entry
router.put('/diary/:id', diaryController.updateDiaryEntry);

// DELETE /diary/:id - Delete a diary entry
router.delete('/diary/:id', diaryController.deleteDiaryEntry);

module.exports = router;

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('diary_notesApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const DiaryEntry = sequelize.define('DiaryEntry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'DiaryEntries',
  timestamps: false,
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = sequelize;