var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkowner = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundcampground){
            if(err){
                req.flash("error","Campground no found");
                res.redirect("back");
            }else{
                if(foundcampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have [ermission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","You need to be logged in to do that!");
        res.redirect("back");
    }
    
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You dont have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn =function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in for that!");
    res.redirect("/login");
}

module.exports = middlewareObj;