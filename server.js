var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var countPainters = 0;
app.get('/', (req, res) => {
  res.send('<h1>Art sockets rule the world</h1>');
});


io.on('connection', function (socket) {
    // Deze functie wordt uitgevoerd wanneer een gebruiker
    // met de chatserver is verbonden
    console.log(countPainters + ' online');
 
    // Luister naar een binnenkomend bericht
    socket.on('painterOnline', function (data) {
        countPainters++;
        // io.socket.emit = verstuur bericht naar alle verbonden gebruikers
        io.emit('message',  { message : countPainters + " viewers now online"} );
    });

    socket.on('painterOffline', function (data) {
        countPainters--;
        // io.socket.emit = verstuur bericht naar alle verbonden gebruikers
        io.emit('message',  { message : countPainters + " viewers now online"} );
    });

    
    socket.on('painterStarted', function (data) {
        console.log('painter Started');
        // io.socket.emit = verstuur bericht naar alle verbonden gebruikers
        io.emit('message',  { message : "session starting"} );
    });

    socket.on('painterPainting', function (data) {
        console.log('painter painting '+ data);
        // io.socket.emit = verstuur bericht naar alle verbonden gebruikers
        io.emit('message',  {message: data + " started painting", painter: data }  );
    });

    socket.on('painterNewPainting', function (data) {
        console.log('new painting');
        // io.socket.emit = verstuur bericht naar alle verbonden gebruikers
        io.emit('message',  { message : "new painting added"} );
    });

});

http.listen(3000, () => {
    console.log('listening on *:3000');
  });
  