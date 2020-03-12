var mysql   = require('mysql');
var dotenv = require('dotenv').config({path:'./.env'});
//console.log(process.env.DB_USER);
var conn = mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
conn.connect(function(err){
    if(err) throw err;
    //console.log("connected");
})

module.exports = conn;