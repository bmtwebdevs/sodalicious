'use strict'

var express = require('express');

// Exports
module.exports = (app, Bartender) => {
  
  app.post('/pump/on', function(req, res) {
    var pumpId = parseInt(req.body.pump);

    if (pumpId >= 0 && pumpId <= 4)
    {
      var pump = 'pump' + req.body.pump;

      Bartender.startPump(pump);

      return res.json({success: true});
    }

    return res.json({error: true});
  });

  app.post('/pump/off', function(req, res) {
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