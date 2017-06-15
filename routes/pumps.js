'use strict'

var express = require('express');

// Exports
module.exports = (app, Pump, Bartender) => { 

  app.post('/api/pump', function(req, res) {
    var reqPump = req.body.pump;

    var newPump = { 
      name: reqPump.name, 
      ingredientName: reqPump.ingredientName
    };

    // update the pump if the name is in the db
    var query = { _id: reqPump._id };
    if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }

    Pump.findOneAndUpdate(query, newPump, {upsert:true, new : true}, function(err, pump) {
      if (pump) {
        console.log("Update Drink");
        return res.json({ pump: pump });
      }
      else if (err) {
        return res.json({ error: err });
      }
      else {
        console.log("Add Drink");
        return res.json({ pump: pump });
      }
    });

  });

  app.post('/api/pump/on', function(req, res) {
    var pumpId = parseInt(req.body.pump);

    if (pumpId >= 0 && pumpId <= 4)
    {
      var pump = 'pump' + req.body.pump;

      Bartender.startPump(pump);

      return res.json({success: true});
    }

    return res.json({error: true});
  });

  app.post('/api/pump/off', function(req, res) {
    var pumpId = parseInt(req.body.pump);

    if (pumpId >= 0 && pumpId <= 4)
    {
      var pump = 'pump' + req.body.pump;

      Bartender.stopPump(pump);

      return res.json({success: true});
    }

    return res.json({error: true});
  });
};