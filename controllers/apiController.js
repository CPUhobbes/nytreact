'use strict';

const Articles = require('../models/Articles');

//this is the function that is called in the index router that will load the page
let controllers = {
    
    getArticles: (req, res) => {
        Articles.find({}).exec(function (err, doc){ 
             res.json(doc);
        });
       
    },

    saveArticles: (req, res) => {
        //Articles.find({}).exec(function (err, doc){ 
       //     res.send(doc);
       // });
       console.log("Title - "+ req.query.title);
       //console.log(req);
       //res.send("cool");

      Articles.findOneAndUpdate({title:req.query.title}, {title: req.query.title, abstract: req.query.abstract, url: req.query.url },
        {safe: true, upsert: true, new : true},
      function(err, model) {
          if(err){
              console.log(err);
          }
          // Article.findOne({_id: req.params.id}, 
    
          //   function(err, result) {
          //     if(err){
          //         console.log(err);
          //     }
          //     res.json(result.comments);
          //   }
          // );
          res.send("cool");
        }
      );




    },

    deleteArticles: (req, res) => {
        Articles.find({}).exec(function (err, doc){ 
            res.send(doc);
        });
    }
}

module.exports = controllers;