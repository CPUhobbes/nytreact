'use strict';

const Articles = require('../models/Articles');

//this is the function that is called in the index router that will load the page
let controllers = {
    
    getArticles: (req, res) => {
        Articles.find({}).exec(function (err, doc){ 
             res.send(doc);
        });
       
    },

    saveArticles: (req, res) => {
        Articles.find({}).exec(function (err, doc){ 
            res.send(doc);
        });
    },

    deleteArticles: (req, res) => {
        Articles.find({}).exec(function (err, doc){ 
            res.send(doc);
        });
    }
}

module.exports = controllers;