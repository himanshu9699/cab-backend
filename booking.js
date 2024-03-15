const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection=require('./db');

const app = express();
const port = 3001;

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.json());

// Route to fetch bookings
app.get('/bookings', (req, res) => {
  connection.query('SELECT * FROM bookings', (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).send('Error fetching bookings');
      return;
    }
    res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
