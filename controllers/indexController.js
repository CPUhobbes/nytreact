'use strict';

//this is the function that is called in the index router that will load the page
let controllers = {
    
    loadIndex: (req, res) => {
        
        res.send('index.html');
    }
}

module.exports = controllers;