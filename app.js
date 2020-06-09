var express    = require("express");
var app        = express();
var  bodyparser = require("body-parser");
var  mongoose   = require("mongoose");
var Camp        = require("./models/campground.js");
var seeDB       = require("./seed.js");
var Comment       = require("./models/Comment.js");
var User        = require("./models/user");
var passport    = require("passport");
var Localstartegy = require("passport-local");
var expressSanitizer = require("express-sanitizer");
var flash          = require("connect-flash");
var methodoverride = require('method-override');
var passportlocalmongoose =require("passport-local-mongoose");
app.locals.moment = require("moment");

var comment = require("./routes/comment");
var auth    = require("./routes/authentication");
var camp    = require("./routes/camp");
var deletea    = require("./routes/deletea");
var edit    = require("./routes/edit");

// seeDB();
mongoose.connect("mongodb://localhost/yelp_camp_v8",{useNewUrlParser:true , useUnifiedTopology:true});
app.use(require("express-session")({
    secret:"This is Secret",
    resave:false,
    saveUninitialized:false
}));

app.use(expressSanitizer());
app.use(methodoverride("_method"));
app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({extended:true}));

passport.use(new Localstartegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());
//call this Before every Route
app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",auth);
app.use("/capground",camp);
app.use("/capground/:id/comment",comment);
app.use(deletea);
app.use(edit);


app.listen(3000,function(){
    console.log("Server is Running");
});