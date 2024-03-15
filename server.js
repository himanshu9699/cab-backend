const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dijkstra = require('./dijkstra')
const carPricing = require('./carPricing')
const connection = require('./db');
// const moment = require('moment/moment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// var d = [];

// Dummy data for cab fare calculation
const graph = {
    A: { B: 5, C: 7 },
    B: { A: 5, E: 20, D: 15 },
    C: { A: 7, E: 35, D: 5 },
    D: { B: 15, C: 5, F: 20 },
    E: { B: 20, C: 35, F: 10 },
    F: { E: 10, D: 20 }
  };
  app.get('/bookings', (req, res) => {
    connection.query('SELECT * FROM main', (err, results) => {
      if (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).send('Error fetching bookings');
        return;
      }
      console.log(results);
      res.json(results);
    });
  });

// Route to calculate shortest time and estimated cost
app.post('/calculate', (req, res) => {
  var { source, destination, cabType, email } = req.body;
  const shortestTime = dijkstra(graph, source, destination);
  const estimatedCost = shortestTime * carPricing(cabType); // Dummy calculation

  var old_date1=new Date();
  var old_date=new Date(old_date1.getTime() + (5 * 60 * 60 * 1000));
  // var old_date = old_date1.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
  var year1=old_date.getFullYear();
  var month1=old_date.getMonth()+1;
  var day1=old_date.getDate();
  var hour1=old_date.getHours();
  var minutes1=old_date.getMinutes();
  var seconds1=old_date.getSeconds();
  var currnetDate1=`${year1}-${month1}-${day1} ${hour1}:${minutes1}:${seconds1}`;

  var date=new Date(old_date.getTime()+(shortestTime*60000));
  // var date = date1.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});

  var year=date.getFullYear();
  var month=date.getMonth()+1;
  var day=date.getDate();
  var hour=date.getHours();
  var minutes=date.getMinutes();
  var seconds=date.getSeconds();
  var currnetDate=`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  const a=5;
  const b=5;
  var d;
  // var shortestTime=12;

  // function getData(){
  //   const promise = new Promise((resolve,reject)=>{
    var query2 = `
    SELECT booking_completed
    FROM main
    WHERE cab_type = ? AND booking_completed>?`;
  // console.log(cabType);
    connection.query(query2, [cabType,currnetDate1],async(err,result)=>
    {
      // if(err) reject(err);

      console.log(result);
      // console.log(currnetDate)
      await r(result)
      
      // console.log(currnetDate);

    })


   async function r(data) {
    console.log(data)
    // res.json({ shortestTime, estimatedCost });
    if(data.length===0)
      {
  
          const query = 'INSERT INTO main (email, cab_type, source, destination,booking_time, booking_completed) VALUES (?, ?, ?, ?,?,?)';
          connection.query(query, [email, cabType, source, destination, currnetDate1,currnetDate]) 
          res.json({ shortestTime, estimatedCost });
      }
    else{
        res.json({a,b});
      }
  }

  // func()
  // r()



  
  // console.log(d);
    // var data5=await result;
    //   const available = result.length === 0;
    // console.log(data5);
      // if(data5.length===0)
      // {
  
      //     const query = 'INSERT INTO main (email, cab_type, source, destination,booking_time, booking_completed) VALUES (?, ?, ?, ?,?,?)';
      //     connection.query(query, [email, cabType, source, destination, currnetDate1,currnetDate]) 
      //     res.json({ shortestTime, estimatedCost });
      // }
      // else if(result.length>0){
      //     res.json({a,b});
      // }
      // res.json({a,b});
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
