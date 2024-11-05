const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');

// Create a new diary entry
router.post('/diary', diaryController.createDiaryEntry);

// Get all diary entries
router.get('/diary', diaryController.getAllDiaryEntries);

// Get a single diary entry by ID
router.get('/diary/:id', diaryController.getDiaryEntryById);

// Update a diary entry by ID
router.put('/diary/:id', diaryController.updateDiaryEntry);

// Delete a diary entry by ID
router.delete('/diary/:id', diaryController.deleteDiaryEntry);

module.exports = router;
