var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "clouds rest",
        image: "https://images.unsplash.com/photo-1542338106-1b4bfe84d5df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ad quas atque reprehenderit rem ipsum nisi doloribus mollitia dolorem quae facere corporis? Aperiam delectus, asperiores quia voluptatem exercitationem quaerat vitae."
    },

    {
        name: "Knighty night",
        image: "https://images.unsplash.com/photo-1568872321643-14b2408cd5f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
        description:  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ad quas atque reprehenderit rem ipsum nisi doloribus mollitia dolorem quae facere corporis? Aperiam delectus, asperiores quia voluptatem exercitationem quaerat vitae."
    },

    {
        name: "bhootiya jagah",
        image: "https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ad quas atque reprehenderit rem ipsum nisi doloribus mollitia dolorem quae facere corporis? Aperiam delectus, asperiores quia voluptatem exercitationem quaerat vitae."
    } 
]

function seedDB(){
    //REmove all campgrounds
    Campground.remove({},function(err){
        if(err){
          console.log(err);  
        }
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    //console.log("added a campground");
                    //create comment
                    Comment.create({
                        text: "are mast jagah hai bas jhaadiyon me hagna hoga",
                        author: "rabindranath tagore"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                            campground.comments.push(comment);
                            campground.save();
                            //console.log("created new comment");
                        }
                         
                    });
                }
            })
        });
    });
}

module.exports = seedDB;

