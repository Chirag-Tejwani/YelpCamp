var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);
// Campground.create(    
//     {
//         name: "Granite Hill",
//         image:"https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&h=350",
//         description: "Bekaar hill hai ye ekdum mat jana kabhi bhi"

//     }, function(err,campground){
//         if(err){
//             console.log("CODE PHAT GAYA");
//             console.log(err);
//         }else{
//             console.log("newly created campground:");
//             console.log(campground);
//         }
//     }
// );


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
    Campground.findById( req.params.id,function(err,foundcamp){
        if(err){
            console.log(err);
        }else{
            res.render("show.ejs",{campground:foundcamp});
        }
    });
   
    
});

app.listen(3000,function(){
    console.log("Yelpcamp has started!");
})