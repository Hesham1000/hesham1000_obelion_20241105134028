const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const diaryRoutes = require('./routes/diaryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.use('/api', diaryRoutes);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
