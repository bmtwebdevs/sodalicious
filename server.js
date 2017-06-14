const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');

const bodyParser = require('body-parser');

const bartender = require('./bartender');

var drinkRoutes = require('./routes/drinks');
var pumpRoutes = require('./routes/pumps');

var db = mongoose.createConnection('localhost', 'sodalicious');

var port = process.env.PORT || 3000;        // set our port

var drinkSchema = require('./models/Drink.js').DrinkSchema;
var Drink = db.model('drinks', drinkSchema);

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bodyParser.json());

/**
 * Route initialization.
 */
// Routes
drinkRoutes(app, Drink);

pumpRoutes(app, bartender);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});