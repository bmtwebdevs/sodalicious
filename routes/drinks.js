'use strict'

var express = require('express');
var mongoose = require('mongoose');

// Exports
module.exports = (app, Drink) => {
  
  app.get('/api/drinks', function(req, res) {

    var query = {};
    
    if(req.query.q) {
      var regex = new RegExp(req.query.q, 'i');
      query = { name: regex };
    }
    
    Drink.find(query).sort({name: 'asc'}).exec(function (err, drinks) {
      return res.json(drinks);
    });
  });

  app.delete('/api/drink', function(req, res) {
    Drink.findOneAndRemove({_id: req.body.id}, function(err, drink) {
      if(err) {
        return res.json({success:false, error: err});
      } else {
        return res.json({success:true});
      }
      
    });
  });

  app.post('/api/drink', function(req, res) {
    var reqDrink = req.body.drink;
    
    var newDrink = { 
      name: reqDrink.name, 
      description: reqDrink.description,
      image: reqDrink.image,
      ingredients: []
    };
    
    for(var i = 0; i < reqDrink.ingredients.length; i++){
      newDrink.ingredients.push({
        name: reqDrink.ingredients[i].name,
        amount: reqDrink.ingredients[i].amount
      });
    }
    
    // update the drink if the name is in the db
    var query = { _id: reqDrink._id };
    if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }
    
    Drink.findOneAndUpdate(query, newDrink, {upsert:true, new : true}, function(err, drink) {
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