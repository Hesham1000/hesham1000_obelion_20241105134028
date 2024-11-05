const DiaryEntry = require('../models/DiaryEntryModel');

// Create a new diary entry
exports.createDiaryEntry = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newEntry = await DiaryEntry.create({ title, content });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all diary entries
exports.getAllDiaryEntries = async (req, res) => {
  try {
    const entries = await DiaryEntry.findAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single diary entry by ID
exports.getDiaryEntryById = async (req, res) => {
  const { id } = req.params;

  try {
    const entry = await DiaryEntry.findByPk(id);
    if (entry) {
      res.status(200).json(entry);
    } else {
      res.status(404).json({ error: 'Diary entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a diary entry by ID
exports.updateDiaryEntry = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const entry = await DiaryEntry.findByPk(id);
    if (entry) {
      entry.title = title;
      entry.content = content;
      await entry.save();
      res.status(200).json(entry);
    } else {
      res.status(404).json({ error: 'Diary entry not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a diary entry by ID
exports.deleteDiaryEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const entry = await DiaryEntry.findByPk(id);
    if (entry) {
      await entry.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Diary entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
