var app = require('./config/server');

var server = app.listen(80, function() {
    console.log('Servidor online na porta 80');
});

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket) {
    console.log('Usuario conectou: ');

    socket.on('disconnect', function() {
        console.log('Usuario desconectou');
    });

    socket.on('msgParaServidor', function(data) {
        /**
         * Atualiza eventos de diálogo
         */
        socket.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem});
        socket.broadcast.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem});
        
        /**
         * Atualiza eventos de participantes
         */

        if (parseInt(data.apelidoAtualizadoNosClientes) === 0) {
            socket.emit('participantesParaCliente', { apelido: data.apelido});
            socket.broadcast.emit('participantesParaCliente', { apelido: data.apelido});
        }
    });
});
