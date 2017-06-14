'use strict'

var express = require('express');

// Exports
module.exports = (app, Drink) => {
  
  app.get('/drinks', function(req, res) {
    Drink.find({}, function (err, drinks) {
      return res.json(drinks);
    });
  });

  app.post('/drink', function(req, res) {
    //var drink = new Drink(req.body);
    var drink = { name: req.body.name, description: req.body.description, ingredients: req.body.ingredients};
    // update the drink if the name is in the db
    var query = { name: drink.name };
    
    Drink.findOneAndUpdate(query, drink, {upsert:true}, function(err, drink) {
        if (drink) {
          console.log("Update Drink");
          return res.json({ drink: drink });
        }

        if (err) {
          return res.json({ error: err });
        }
    });
  });
};