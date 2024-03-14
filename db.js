// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'buicmfjk0d3fibca9nmn-mysql.services.clever-cloud.com',
  user: 'un5zi0dw1aoq8eir',
  password: 'gsoFQIia5jDHCnXMlQFY',
  database: 'buicmfjk0d3fibca9nmn'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = connection;
