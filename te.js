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
});

var campgrounds = [];
var newCampgrounds;

connection.query('SELECT * from yelpcamp', function(err, results) {
    for(var i=0;i<results.length;i++){
        var a=JSON.stringify(results[i].name).replace(/"/g, '');
        var b=JSON.stringify(results[i].image).replace(/"/g, ''); 
        var d = {name: a, image: b}
        campgrounds.push(d);
    }

console.log(campgrounds);
   });



app.get("/",function(req,res){
    res.render("landing")
});


app.get("/campgrounds", function(req, res){
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

const port = 9000;
app.listen(port, () => {
  console.log(`Server initiated succesfully on ${port}`);
});