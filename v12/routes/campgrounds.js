var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

router.get("/",function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index.ejs",{campgrounds:allCampgrounds,currentUser:req.user});
        }

    });
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;    
    var des = req.body.description; 
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcamp = {name: name, image: image, description:des,author:author, price:price };
   
    Campground.create(newcamp,function(err,newcamp){
        if(err){
            
            console.log(err);
           
        }else{
            res.redirect("/campgrounds");
        }
    });
    
});

router.get("/new",middleware.isLoggedIn,function(req,res){
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
//EDIT ROUTE
router.get("/:id/edit",middleware.checkowner,function(req,res)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,function(err,foundcampground)
        {
            res.render("campgrounds/edit.ejs",{campground:foundcampground});
        });
    }
});

//UPATE
router.put("/:id",middleware.checkowner,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcamp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

//DESTROY
router.delete("/:id",middleware.checkowner,function(req,res){
    Campground.findOneAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
});



module.exports = router;