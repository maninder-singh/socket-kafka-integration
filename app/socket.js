let socketio = require('socket.io'),
    redis = require("socket.io-redis"),
    config = require("./config"),
    io;

exports.init = (app) => {    
    io = socketio.listen(app);
    io.adapter(redis({host:config.REDIS.HOST,port:config.REDIS.PORT}));
    io.on('connection', function(socket) {
        socket.on("JoinRoom",function (room) {
                socket.join(room);
        });
        socket.emit('ConnectionEstablised', { message: 'Welcome!', id: socket.id});
    });
    exports.io = io;
}