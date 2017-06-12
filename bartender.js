var pump0, pump1, pump2, pump3, pump4;

var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function() {
    
    pump0 = new five.Led(0);
    pump1 = new five.Led(1);
    pump2 = new five.Led(2);
    pump3 = new five.Led(3);
    pump4 = new five.Led(4);

    board.repl.inject({
        p0: pump0,
        p1: pump1,
        p2: pump2,
        p3: pump3,
        p4: pump4
    });

    console.log("\033[31m[MSG] Bartender Ready\033[91m");
});