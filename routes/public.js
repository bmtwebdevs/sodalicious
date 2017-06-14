'use strict'
var bodyParser = require('body-parser');
var express = require('express');


// Globals
var router = express.Router();

// Middlewares
router.use(bodyParser.json());

// Routes
router.get('/drinks', function(req, res) {
  return res.json([{id:1, drink: 'bloody mary'}, {id:2, drink: 'margarita'}]);
});

// Exports
module.exports = router;