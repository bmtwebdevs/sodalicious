var pump0, pump1, pump2, pump3, pump4;

var five = require('johnny-five');

console.log("Bartender Waking Up".green);

var board = new five.Board({port:'COM5', repl: false});

board.on('ready', function() {
    
    pump0 = new five.Led(3);
    pump1 = new five.Led(4);
    pump2 = new five.Led(5);
    pump3 = new five.Led(6);
    pump4 = new five.Led(7);
/*
    board.repl.inject({
        p0: pump0,
        p1: pump1,
        p2: pump2,
        p3: pump3,
        p4: pump4
    });*/

    console.log('Bartender Ready'.green);
});

exports.pump = function(ingredients) {
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
  console.log(("Starting " + pump).blue);

  var p = exports.usePump(pump);
  p.on();
};

exports.stopPump = function (pump) {
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