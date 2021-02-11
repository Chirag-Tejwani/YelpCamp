var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
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
            res.render("campgrounds/index.ejs",{campgrounds:allCampgrounds});
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
    res.render("campgrounds/new.ejs")
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show.ejs",{campground:foundcamp});
            console.log(foundcamp);
        }
    });
   
    
});

app.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
          console.log(err);  
        }else{
            res.render("comments/new.ejs",{campground:campground});
        }
    })
    
});

app.post("/campgrounds/:id/comments",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                    console.log(err);
               }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
           });
       }
    });
});

app.listen(3000,function(){
    console.log("Yelpcamp has started!");
})