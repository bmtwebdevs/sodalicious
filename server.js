var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//var db = mongoose.createConnection('localhost', 'sodalicious');

//var drinkSchema = require('./models/Drink.js').DrinkSchema;
//var drink = db.model('drinks', drinkSchema);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/public/', function(req, res) {
    res.sendfile('index.html')   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started: http://localhost:' + port + '/');

