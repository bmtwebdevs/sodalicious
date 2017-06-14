'use strict'

var express = require('express');

// Exports
module.exports = (app, Drink) => {
  
  app.get('/drinks', function(req, res) {
    return res.json([{id:1, drink: 'bloody mary'}, {id:2, drink: 'margarita'}]);
  });

  app.post('/drinks', function(req, res) {

    Drink.findOneAndUpdate({ _id: req.body._id }, 
        {
          name: req.body.name,
          //image: req.body.image,
          //ingredients: req.body.ingredients
        }, 
        function (err, drink) {
          if (drink) {
            console.log("Update Drink");
            res.send(drink);
          }
      });

  });
};