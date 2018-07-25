var app = require('./config/server');

var server = app.listen(80, function() {
    console.log('Servidor online na porta 80');
})

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('Usuario conectou: ');

    socket.on('disconnect', function() {
        console.log('Usuario desconectou');
    })
});
