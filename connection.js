const mysql = require("mysql");

const con = mysql.createConnection({
  host: "guvi.c8dazahfss6a.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "administrator",
  database: "guvi",
});

con.connect((err) => 

{
  if (err) throw err;
  console.log("Connnected to Database");
});

module.exports = con;