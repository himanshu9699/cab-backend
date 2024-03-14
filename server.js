const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dijkstra = require('./dijkstra')
const carPricing = require('./carPricing')
const connection = require('./db');
const moment = require('moment/moment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dummy data for cab fare calculation
const fareRates = {
  perKilometer: 1.5,
  perMinute: 0.5,
};
const graph = {
    A: { B: 5, C: 7 },
    B: { A: 5, E: 20, D: 15 },
    C: { A: 7, E: 35, D: 5 },
    D: { B: 15, C: 5, F: 20 },
    E: { B: 20, C: 35, F: 10 },
    F: { E: 10, D: 20 }
  };

// Route to calculate shortest time and estimated cost
app.post('/calculate', (req, res) => {
  const { source, destination, cabType, email } = req.body;
  const shortestTime = dijkstra(graph, source, destination);
  const estimatedCost = shortestTime * carPricing(cabType); // Dummy calculation

  var old_date=new Date();
  var date=new Date(old_date.getTime()+shortestTime*60000);

  var year=date.getFullYear();
  var month=date.getMonth()+1;
  var day=date.getDate();
  var hour=date.getHours();
  var minutes=date.getMinutes();
  var seconds=date.getSeconds();
  var currnetDate=`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  const a=0;
  const b=0;

  const query2 = `
    SELECT *
    FROM main
    WHERE cab_type = ? AND ((booking_time <= ? AND booking_completed >= ?))`;
  connection.query(query2, [cabType, currnetDate, currnetDate],(err,result)=>
  {

    //   const available = result.length === 0;
    console.log(result.length);
      if(result.length===0)
      {
  
          const query = 'INSERT INTO main (email, cab_type, source, destination,booking_completed) VALUES (?, ?, ?, ?,?)';
          connection.query(query, [email, cabType, source, destination,currnetDate]) 
          res.json({ shortestTime, estimatedCost });
      }
      else{
          res.json({a,b});
      }
  }
  )
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
