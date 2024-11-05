javascript
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
