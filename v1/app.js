var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
var campgrounds = [
    {name: "Salmon Creek",image:"https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Granite Hill",image:"https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Mountain Goat's Rest",image:"https://pixabay.com/get/53e3d5414851aa14f1dc84609620367d1c3ed9e04e507440722d7bdc904dcc_340.jpg"},
    {name: "Salmon Creek",image:"https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Granite Hill",image:"https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Mountain Goat's Rest",image:"https://pixabay.com/get/53e3d5414851aa14f1dc84609620367d1c3ed9e04e507440722d7bdc904dcc_340.jpg"},
    {name: "Salmon Creek",image:"https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Granite Hill",image:"https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Mountain Goat's Rest",image:"https://pixabay.com/get/53e3d5414851aa14f1dc84609620367d1c3ed9e04e507440722d7bdc904dcc_340.jpg"}
]
app.get("/",function(req,res){
    res.render("landing.ejs");
});


app.get("/campgrounds",function(req,res){
    res.render("campgrounds.ejs",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;    
    var newcamp = {name: name, image: image};
    campgrounds.push(newcamp); 
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs")
});

app.listen(3000,function(){
    console.log("Yelpcamp has started!");
})