var express = require("express");
var router = express.Router();
var Campground =require("../models/campground");
router.get("/",function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index.ejs",{campgrounds:allCampgrounds,currentUser:req.user});
        }

    });
});

router.post("/",isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;    
    var des = req.body.description; 
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcamp = {name: name, image: image, description:des,author:author};
   
    Campground.create(newcamp,function(err,newcamp){
        if(err){
            
            console.log(err);
           
        }else{
            res.redirect("/campgrounds");
        }
    });
    
});

router.get("/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs")
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show.ejs",{campground:foundcamp});
            console.log(foundcamp);
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;