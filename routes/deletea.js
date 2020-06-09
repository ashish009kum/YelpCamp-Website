var exrpess =require("express");
var router = exrpess.Router({mergeParams:true});
var methodoverride = require('method-override');
var Camp   = require("../models/campground");
var Comment = require("../models/Comment");
var middleware =require("../middleware");   //by default it Access The Index file

router.delete("/capground/:id", middleware.isauthorized,function(req,res){
    Camp.findByIdAndRemove(req.params.id,function(err){        
        if(err){
        res.redirect("/capground");
    }
    else{
        req.flash("success" , "Campground Deleted SuccessFully!!!");
        res.redirect("/capground");
    }
   });
});


router.delete("/capground/:id/comment/:comment_id",function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
        }
        else{
            req.flash("success" , "Comment Deleted SuccessFully!!!");
            res.redirect("/capground/"+req.params.id);
        }
    });
});


module.exports =router;