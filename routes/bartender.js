'use strict'

var express = require('express');

var Twitter = require("twitter");

var Slack = require("slack");

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
            console.log('Tweeting...');

            var message = 'One ' + drink.name + ' coming up! #sodalicious #letsgetcrunk';

            var client = new Twitter({
                consumer_key: 'j8TQmYNsYMc33edQawVa9qAgs',
                consumer_secret: '33RhfAIFT1Joq4kclblHoQRmt6wAMTVHu8NeJi3bcAXwB26xwy',
                access_token_key: '6310552-HpuUN0d0BOqYm5aYFJijFKURjAIq9fBXc4WPLNeQfM',
                access_token_secret: 'hkc5d5D8BmVApNz7yG5wg6GIe9FQvxPqprISDRYS3s4YL'
            });

            client.post('statuses/update', {
                status: 'One ' + drink.name + ' coming up! #sodalicious'
            },
            function(error, tweet, response) {
                //console.log(tweet);
            });

            Slack.chat.postMessage({
                token: 'xoxp-51066723040-99640917427-199096583463-000ca8f604256badc54f96f95b208351',
                channel: 'C5T01FBMM', 
                text: message
            }, (err, data) => { console.log('Slack: ' + err); })

            console.log('...done');

            Bartender.pump(ingredients);
        }

        return res.json({success:true});
      }
      
    });
    
  });

};