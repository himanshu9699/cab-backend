const date = new Date();
// Set the time zone to Asia/Kolkata
const indiaTime = date.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});

console.log(indiaTime); // "2023-08-04T18:30:00.000+05:30"