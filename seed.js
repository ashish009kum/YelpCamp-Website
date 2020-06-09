var  mongoose = require("mongoose");
var Camp      = require("./models/campground.js");
var Comment   = require("./models/Comment.js");


var dat =[ 
    {
             tittle:"Maunt Tabu",image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg",description:"This is What we Want to Say"},
            { 
            tittle:"Mount Everest",image:"https://cdn.pixabay.com/photo/2016/03/30/02/57/camping-1289930__340.jpg",description:"Nights Under The open sky are far better than five star Hotels"
            },
            {
              tittle:"Himalaya",image:"https://cdn.pixabay.com/photo/2017/07/31/21/55/people-2561455__340.jpg",description:"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:"
            }
];

function seeDB(){
    Camp.remove({},function(err){
        if(err){
            console.log(err);
        }
           console.log("Removed");
            dat.forEach(function(a){
                Camp.create(a,function(err,added){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Added");
                    }
                    Comment.create(
                        {
                        title:"This place is really very good You have to go there",
                        author:"ashish"
                                },function(err,com){
                    if(err){
                        console.log(err);
                    }
                    else{
                        added.comments.push(com);
                        added.save(function(err,da){
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("comment Addded");
                            }
                        });
                    }
                  });
                });
            });
       }); 
    };


module.exports = seeDB;