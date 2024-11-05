const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('diary_notesApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const DiaryEntry = require('../models/DiaryEntryModel');

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = sequelize;
sql
CREATE TABLE DiaryEntries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

CREATE PROCEDURE InsertDiaryEntry(IN entryTitle VARCHAR(255), IN entryContent TEXT)
BEGIN
    INSERT INTO DiaryEntries (title, content) VALUES (entryTitle, entryContent);
END;

CREATE PROCEDURE GetAllDiaryEntries()
BEGIN
    SELECT * FROM DiaryEntries;
END;

CREATE PROCEDURE GetDiaryEntryById(IN entryId INT)
BEGIN
    SELECT * FROM DiaryEntries WHERE id = entryId;
END;

CREATE PROCEDURE UpdateDiaryEntry(IN entryId INT, IN newTitle VARCHAR(255), IN newContent TEXT)
BEGIN
    UPDATE DiaryEntries SET title = newTitle, content = newContent WHERE id = entryId;
END;

CREATE PROCEDURE DeleteDiaryEntry(IN entryId INT)
BEGIN
    DELETE FROM DiaryEntries WHERE id = entryId;
END;

const DiaryEntry = require('../models/DiaryEntryModel');

// Controller for creating a new diary entry
exports.createDiaryEntry = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required fields.' });
    }

    // Create a new diary entry
    const newEntry = await DiaryEntry.create({ title, content });

    // Return the created entry as a JSON response
    return res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error creating diary entry:', error);
    return res.status(500).json({ error: 'An error occurred while creating the diary entry.' });
  }
};

// Controller for retrieving all diary entries
exports.getAllDiaryEntries = async (req, res) => {
  try {
    // Fetch all diary entries
    const entries = await DiaryEntry.findAll();

    // Return the entries as a JSON response
    return res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching diary entries:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the diary entries.' });
  }
};

// Controller for retrieving a specific diary entry by ID
exports.getDiaryEntryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the diary entry by ID
    const entry = await DiaryEntry.findByPk(id);

    // Check if the entry exists
    if (!entry) {
      return res.status(404).json({ error: 'Diary entry not found.' });
    }

    // Return the entry as a JSON response
    return res.status(200).json(entry);
  } catch (error) {
    console.error('Error fetching diary entry:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the diary entry.' });
  }
};

// Controller for updating a diary entry
exports.updateDiaryEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Find the diary entry by ID
    const entry = await DiaryEntry.findByPk(id);

    // Check if the entry exists
    if (!entry) {
      return res.status(404).json({ error: 'Diary entry not found.' });
    }

    // Update the diary entry
    await entry.update({ title, content });

    // Return the updated entry as a JSON response
    return res.status(200).json(entry);
  } catch (error) {
    console.error('Error updating diary entry:', error);
    return res.status(500).json({ error: 'An error occurred while updating the diary entry.' });
  }
};

// Controller for deleting a diary entry
exports.deleteDiaryEntry = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the diary entry by ID
    const entry = await DiaryEntry.findByPk(id);

    // Check if the entry exists
    if (!entry) {
      return res.status(404).json({ error: 'Diary entry not found.' });
    }

    // Delete the diary entry
    await entry.destroy();

    // Return a success message as a JSON response
    return res.status(200).json({ message: 'Diary entry deleted successfully.' });
  } catch (error) {
    console.error('Error deleting diary entry:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the diary entry.' });
  }
};