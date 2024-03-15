const connection=require('./db');
connection.query('SELECT * FROM main', (err, results) =>
{
    console.log(results);
});