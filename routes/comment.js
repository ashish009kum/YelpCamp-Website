var exrpess =require("express");
var router = exrpess.Router({mergeParams:true});
var Camp   = require("../models/campground");
var Comment   = require("../models/Comment");
var middleware =require("../middleware");   //by default it Access Index File

router.get("/new", middleware.isLoggedIn, function(req,res){
    Camp.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            res.render("newcom",{a:camp});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req,res){
    Camp.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,come){
                if(err){
                    console.log(err)
                }
                else{
                    come.author.id = req.user._id;
                    come.author.username = req.user.username;    //Author Automaticaly Added using username
                    come.save();
                    camp.comments.push(come);
                    camp.save();
                    req.flash("success","SuccessFully Added Comment");
                    res.redirect("/capground/"+camp._id);
                  }
                });
            }
    });
});


module.exports = router;