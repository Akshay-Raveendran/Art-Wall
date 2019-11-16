var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mysql = require('mysql')
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'defaultitis',
    database: 'yelpcamp'
})

var campgrounds=[];

var a=nameinserted;
var b=imageinserted;

var e=[{name:a,image:b}]

yelpcamp.query(
    'INSERT INTO yelpcamp (name,image) VALUES ?',
    [d.map(item => [d.name, c.image])],
    

);