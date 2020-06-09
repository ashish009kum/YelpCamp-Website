var exrpess =require("express");
var router = exrpess.Router({mergeParams:true});
var methodoverride = require('method-override');
var Camp   = require("../models/campground");
var Comment   = require("../models/Comment");
var passport =require("passport");
var middleware =require("../middleware");   //by default it Access The Index file


router.get("/capground/:id/edit", middleware.isauthorized, function(req,res){
        a = req.params.id;
        Camp.findById(a,function(err,camp){
            if(err){
                console.log(err);
            }
            else{
                res.render("edit",{a:camp});
            }
        });
});

router.put("/capground/:id", middleware.isauthorized,function(req,res){
    var campa ={
        tittle : req.body.tittle,
        image : req.body.image,
        description : req.sanitize(req.body.description),
        price:     req.body.price
    }
    Camp.findByIdAndUpdate(req.params.id, campa, function(err,camp){
         if(err){
            console.log(err);
        }
        else{
            req.flash("success" , "Campground Edited SuccessFully!!!");
            res.redirect("/capground/"+req.params.id);
        }
    });
});

router.get("/capground/:id/comment/:comment_id/edit", middleware.iscommentauthorized, function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment){
        if(err){
            console.log(err);
        }
        else{
            res.render("commentedit",{camp:req.params.id,comment:comment});
        }
    });
});

router.put("/capground/:id/comment/:comment_id", middleware.iscommentauthorized, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,com){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success" , "Comment Edited SuccessFully!!!");
            res.redirect("/capground/"+req.params.id);
        }
    });   
});

router.delete("/capground/:id/comment/:comment_id", middleware.iscommentauthorized, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }        
        else{
            req.flash("success" , "Deleted SuccessFully!!!");
            res.redirect("/capground/"+req.params.id);
        }
    });
});


module.exports =router;