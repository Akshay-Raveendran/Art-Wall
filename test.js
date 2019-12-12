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

// var campgrounds = [
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
// ];
console.log(campgrounds);


app.get("/",function(req,res){
    res.render("landing")
})


app.get("/campgrounds", function(req, res){
    res.render("campgrounds",{campgrounds:campgrounds});
});


app.post("/campgrounds",function(req,res){
    
    //console.log(req.body)
	var x = req.body.name;
	var y = req.body.image;
    
    //console.log(x)
    connection.query("insert into yelpcamp (name,image) VALUES (?,?)", [x,y] ,function(err, result)      
    {                                                      
      if (err)
         throw err;
    });
    
	res.redirect("/campgrounds")
});


app.get("/campgrounds/new",function(req,res){
	res.render("new");
})

app.listen(9000,function(){
	console.log("app listening on 9000!")
})