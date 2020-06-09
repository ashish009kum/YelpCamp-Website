var exrpess =require("express");
var router = exrpess.Router();
var User   = require("../models/user");
var Camp   = require("../models/campground");
var passport =require("passport");
var passportlocalmongoose  = require("passport-local-mongoose");
var localstrategy = require("passport-local");
var bosyparser = require("body-parser");

router.get("/",function(req,res){
    res.render("home");
});


router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    var newUser = new User(
        {  
            username: req.body.username,
            firstname:    req.body.first,
            lastname:    req.body.last,
            age:    req.body.age,
            email:  req.body.email,
            avatar: req.body.avatar,
            about:  req.body.about
        });
    if(req.body.admincode=="secretcode123"){
        newUser.isAdmin =true;
    }
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message ,page: 'register'});
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome To YelpCamp "+user.username);
            res.redirect("/capground");
        });
    });
});

router.get("/login",function(req,res){
    res.render("login",{page: 'login'});
});

router.post("/login",  passport.authenticate("local",{
    successRedirect: "/capground",
    failureRedirect:"/login",
    failureFlash:"Sorry There's Something Wrong",
    successFlash:"Welcome To YelpCamp"
}), function(req,res){
});

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged You Out!!");
    res.redirect("/capground");
});


router.get("/user/:id",function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            res.redirect("back");
        }
        else{
            Camp.find().where("author.id").equals(user._id).exec(function(err,camp){    //to find Campground of the Author
                if(err){
                    res.redirect("back");
                }
                else{
                    res.render("userpro",{user:user,camp:camp});
                }
            });
        }
    });
});

module.exports = router;