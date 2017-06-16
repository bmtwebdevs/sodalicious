var pump0, pump1, pump2, pump3, pump4, awake = false;

var five = require('johnny-five');

try {
  if (process.env.BAR !== 'NO') {

  console.log("Bartender Waking Up".green);

  var board = new five.Board({port:'COM5', repl: false});
  
  board.on('ready', function() {
      pump0 = new five.Led(3);
      pump1 = new five.Led(4);
      pump2 = new five.Led(5);
      pump3 = new five.Led(6);
      pump4 = new five.Led(7);

      console.log('Bartender Ready'.green);

      awake = true;
  });

  board.on("fail", function(event) {
    /*
      Event {
        type: "info"|"warn"|"fail",
        timestamp: Time of event in milliseconds,
        class: name of relevant component class,
        message: message [+ ...detail]
      }
    */
    console.log("%s sent a 'fail' message: %s", event.class, event.message);
  });

  board.on('error', function(err) {
    console.log("Ooops", err);
    return;
  });
  }
} catch(err) {
  console.log('Bartender not initialised. Is it plugged in?', err);
}

exports.clean = function(time) {

  var t = time || 5000;

    setTimeout(function () {      pumpMilliseconds('pump0', time);    }, 50);
    setTimeout(function () {      pumpMilliseconds('pump1', time);    }, 50);
    setTimeout(function () {      pumpMilliseconds('pump2', time);    }, 50);
    setTimeout(function () {      pumpMilliseconds('pump3', time);    }, 50);
    setTimeout(function () {      pumpMilliseconds('pump4', time);    }, 50);
      
};

exports.pump = function(ingredients) {
    if (awake === false) {
      console.log("Go away, I'm sleeping!");
      return;
    }
    console.log('Making drink...'.blue);

    for (var i in ingredients) {
        (function(i) {
            setTimeout(function () {
                pumpMilliseconds(ingredients[i].pump, ingredients[i].amount);
            }, ingredients[i].delay);
        })(i);
    }
};

function pumpMilliseconds(pump, time) {
  exports.startPump(pump);

  setTimeout(function () {
    exports.stopPump(pump);
  }, time);
}

exports.startPump = function (pump) {
  console.log(new Date())

  console.log(("Starting " + pump).blue);

  var p = exports.usePump(pump);
  p.on();
};

exports.stopPump = function (pump) {
  console.log(new Date())
  
  console.log(("Stopping " + pump).blue);

  var p = exports.usePump(pump);
  p.off();
};

exports.usePump = function (pump) {
  var using;
  switch(pump) {
    case 'pump0':
      using = pump0;
      break;
    case 'pump1':
      using = pump1;
      break;
    case 'pump2':
      using = pump2;
      break;
    case 'pump3':
      using = pump3;
      break;
    case 'pump4':
      using = pump4;
      break;
    default:
      using = null;
      break;
  }
  return using;
};