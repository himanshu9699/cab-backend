// const connection = require('./db');
// var date=new Date();
// var year=date.getFullYear();
// var month=date.getMonth()+1;
// var day=date.getDate();
// var hour=date.getHours();
// var minutes=date.getMinutes();
// var seconds=date.getSeconds();
// var currnetDate=`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
// // console.log(currnetDate);
//   const query2 = `
//     SELECT *
//     FROM main
//     WHERE cab_type = ? AND ((booking_time <= ? AND booking_completed >= ?))`;
//   connection.query(query2, [3, currnetDate, currnetDate],(err,result) =>
//   {
//     // const available=result.length===0;
//     // console.log(result);
//     if(result.length>2)
//     {
//         console.log(5);
//     }
//     else{
//         console.log(result);
//     }
//   })
// var a=new Date();
// var b=new Date(a.getTime()+5*60000);
// console.log(b.getMinutes());
// console.log(a.getMinutes());

var old_date=new Date();
var date=new Date(old_date.getTime()+5*60000);

var year=date.getFullYear();
console.log(year);
var month=date.getMonth()+1;
var day=date.getDate();
var hour=date.getHours();
var minutes=date.getMinutes();
var seconds=date.getSeconds();
var currnetDate=`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
console.log(currnetDate);