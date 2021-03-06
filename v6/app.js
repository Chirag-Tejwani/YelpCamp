var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var User = require("./models/user")
var seedDB = require("./seeds");
var Comment = require("./models/comment");
seedDB();

//passport config
app.use(require("express-session")({
    secret: "once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/",function(req,res){
    res.render("landing.ejs");
});


app.get("/campgrounds",function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index.ejs",{campgrounds:allCampgrounds,currentUser:req.user});
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

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
          console.log(err);  
        }else{
            res.render("comments/new.ejs",{campground:campground});
        }
    })
    
});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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

//=============
// AUTH ROUTES
//=============

//show register form
app.get("/register",function(req,res){
    res.render("register.ejs");
});

//sign up logic
app.post("/register",function(req,res){
    var newUser = new User ({username: req.body.username});
    User.register(newUser , req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

//show logon form
app.get("/login",function(req,res){
    res.render("login.ejs");
});

//handling logon logic
app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),function(req,res){
});

//logout route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(3000,function(){
    console.log("Yelpcamp has started!");
})