var mongoose = require("mongoose");
var campSchema = new mongoose.Schema({
    tittle: String,
    image: String,
    description: String,
    createdat: {type:Date ,default: Date.now},
    comments: [
           {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Comment"
           }
        ],
    author:{
       id:{
          type:mongoose.Schema.Types.ObjectId,
          ref: "User"
       },
       username:String
    },
    price:Number
});

var Camp = mongoose.model("Camp",campSchema);

module.exports=Camp;
