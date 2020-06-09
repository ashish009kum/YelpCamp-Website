var Comment = require("../models/Comment");
var Camp    = require("../models/campground");

var middleobj = {};

middleobj.isauthorized  =function(req,res,next){
    if(req.isAuthenticated()){
        a = req.params.id;
        Camp.findById(a,function(err,camp){
            if(camp.author.id.equals(req.user._id) || req.user.isAdmin)
            {
                return next();
            }
            else{
                req.flash("error","You Are Not Permitted To Do that");
                res.redirect("back");
            }
        });
    }
    else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middleobj.iscommentauthorized  = function(req,res,next){
    if(req.isAuthenticated()){
        a = req.params.comment_id;
        Comment.findById(a,function(err,comm){
            if(comm.author.id.equals(req.user._id) || req.user.isAdmin)
            {   
               return next();
            }
            else{
                req.flash("error","You Are Not Permitted To Do that");
                res.redirect("back");
            }
        });
    }
    else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middleobj.isLoggedIn =function(req, res, next){       //refresh the server if not working
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error","You need to be logged in to do that");
        res.redirect("/login");
    }

module.exports = middleobj;