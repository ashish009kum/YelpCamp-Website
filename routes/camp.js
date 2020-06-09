var exrpess =require("express");
var router = exrpess.Router({mergeParams:true});
var Camp   = require("../models/campground");
var middleware = require("../middleware");

router.get("/",function(req,res){
    var nomatch =null;
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Camp.find({tittle:regex},function(err,camp){
            if(err){
                console.log(err);
            }
            else{
                if(camp.length<1){
                    nomatch ="No such CampGround Exists Please Try Again";
                }
                res.render("index",{a:camp,nomatch:nomatch});
            }
        });
    }
    else{
        Camp.find({},function(err,all){
            if(err){
                console.log(err);
            }
            else{
                res.render("index",{a:all,nomatch:nomatch, page: 'campgrounds'});
            }
        });
    }
});

router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("new");
});

router.get("/:id",function(req,res){
    Camp.findById(req.params.id).populate("comments").exec(function(err,all){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{a:all});
        }
    });
});


router.post("/", middleware.isLoggedIn, function(req,res){
    var name =req.body.name;
    var image =req.body.image;
    var desc =req.body.description;
    var price =req.body.price;
    var author={
        id:req.user._id,
        username :req.user.username
    }
    Camp.create({tittle: name,image:image,description:desc,price:price,author:author},function(err,all){
        if(err){
        console.log(err);
        }
        else{
        console.log("ok");
        }
    });
    res.redirect("/capground");
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;