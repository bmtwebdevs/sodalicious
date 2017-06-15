'use strict'

var express = require('express');

// Exports
module.exports = (app, Bartender, Drink) => {
  
  app.get('/bartender', function(req, res) {

    Drink.findOne({_id: req.query.id}, function(err, drink) {

      if(err) {
        return res.json({success:false, error: err});

      } else {

        //console.log("drink");
        //console.log(drink);

        var pumps = [];
        pumps['pump0'] = 'Vodka';
        pumps['pump1'] = 'Rum';
        pumps['pump2'] = 'Sprite';
        pumps['pump3'] = 'Orange Juice';
        pumps['pump4'] = 'Gin';
        
        var ingredients = [];

        // how many parts
        var parts = 0;
        var biggest = 0;
        for (var ingredient of drink.ingredients) {
            parts += ingredient.amount;
            if (ingredient.amount > biggest) {
                biggest = ingredient.amount;
            }
        }

        var size = req.query.size || 10;
        
        for (var ingredient of drink.ingredients) {
            //console.log('IN:')
            //console.log(ingredient);

            for (var pump in pumps) {
                //console.log("PUMP:");
                //console.log(pump);

                if (pumps[pump] === ingredient.name) {
                    console.log("using: " + pump);
                    
                    var iSize = (ingredient.amount / parts) * size;

                    var iDelay = ((biggest - ingredient.amount) / parts) * size;

                    console.log('Amount: ' + iSize);
                    console.log('Delay: ' + iDelay);

                    ingredients.push({
                        pump: pump,
                        amount: iSize * 1000,
                        delay: iDelay * 1000
                    });
                    break;
                }
            }

            
        }

        if (ingredients.length > 0) {
            Bartender.pump(ingredients)
        }

        return res.json({success:true});
      }
      
    });
    
  });

};