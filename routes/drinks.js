'use strict'

var express = require('express');

// Exports
module.exports = (app, Drink) => {
  
  app.get('/drinks', function(req, res) {
<<<<<<< HEAD

    var query = {};
    
    if(req.query.q) {
      var regex = new RegExp(req.query.q, 'i');
      query = { name: regex };
    }

    Drink.find(query, function (err, drinks) {
=======
    Drink.find({}).sort({name: 'asc'}).exec(function (err, drinks) {
>>>>>>> master
      return res.json(drinks);
    });
  });

  app.post('/drink', function(req, res) {
    //var drink = new Drink(req.body);
    var drink = { name: req.body.name, description: req.body.description, ingredients: req.body.ingredients, image: req.body.image };
    // update the drink if the name is in the db
    var query = { name: drink.name };
    
    Drink.findOneAndUpdate(query, drink, {upsert:true}, function(err, drink) {
        if (drink) {
          console.log("Update Drink");
          return res.json({ drink: drink });
        }
        else if (err) {
          return res.json({ error: err });
        }
        else {
          console.log("Add Drink");
          return res.json({ drink: drink });
        }

        
    });
  });
};