var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
    res.render("landing.ejs");
});


app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index.ejs",{campgrounds:allCampgrounds});
        }

    });
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;    
    var des = req.body.description; 
    var newcamp = {name: name, image: image, description:des};
    Campground.create(newcamp,function(err,newcamp){
        if(err){
            
            console.log(err);
           
        }else{
            
            res.redirect("/campgrounds");
        
        }
    });
    
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs")
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcamp){
        if(err){
            console.log(err);
        }else{
            res.render("show.ejs",{campground:foundcamp});
            console.log(foundcamp);
        }
    });
   
    
});

app.listen(3000,function(){
    console.log("Yelpcamp has started!");
})