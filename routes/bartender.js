'use strict'

var express = require('express');

var Twitter = require("twitter");

var Slack = require("slack");

// Exports
module.exports = (app, Bartender, Drink, Pump) => {

    function makeDrink(id, size, res) {

        Drink.findOne({_id: id}, function(err, drink) {

            if(err) {
                return res.json({success:false, error: err});

            } else {

            //console.log("drink");
            //console.log(drink);

            var pumps = [];

            Pump.find({}).exec(function (err, pumpData) {
                console.log('Pump Data');
                console.log(pumpData)            ;

                var i = 0;
                for (var i = 0; i < pumpData.length; i++) {
                    pumps[pumpData[i].name] = pumpData[i].ingredientName;
                }


            console.log("Pumps:");
            console.log(pumps);
            
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

                if (process.env.SOCIAL==='YES') {

                console.log('Tweeting/slacking...');

                var message = 'One ' + drink.name + ' coming up! #sodalicious #letsgetcrunk';

                var client = new Twitter({
                    consumer_key: process.env.CONSUMER_KEY,
                    consumer_secret: process.env.CONSUMER_SECRET,
                    access_token_key: process.env.ACCESS_KEY,
                    access_token_secret: process.env.ACCESS_SECRET
                });

                client.post('statuses/update', {
                    status: message
                },
                function(error, tweet, response) {
                    //console.log(tweet);
                });

                Slack.chat.postMessage({
                    token: process.env.SLACK_TOKEN,
                    channel: 'C5T01FBMM', 
                    text: message
                }, (err, data) => { console.log('Slack: ' + err); })

                console.log('...done');
                }

                Bartender.pump(ingredients);
            }
            });

            return res.json({success:true});
            
            }
      
    });
   }
  
  app.get('/barmake', function(req, res) {
    var d = req.query.drink;
    var size = req.query.size || 10;

    Drink.findOne({name: d}, function(err, drink) {
        if(err) {
            return res.json({success:false, error: err});
        } else {
            makeDrink(drink._id, size, res);
        }
    });
  });
  
  app.get('/bartender', function(req, res) {
      var id = req.query.id;
      var size = req.query.size || 10;

      makeDrink(id, size, res);
  });

};