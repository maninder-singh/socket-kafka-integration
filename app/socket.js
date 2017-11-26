const socketio = require('socket.io'),
    redis = require("socket.io-redis"),
    config = require("./config"),
    redisClient = require("./redis");

let io;

exports.init = (app) => {    
    io = socketio.listen(app);
    io.adapter(redis({host:config.REDIS.HOST,port:config.REDIS.PORT}));
    io.on('connection', function(socket) {
        console.log(`socket.io running on  ${process.pid}`);
        socket.on("JoinRoom",function (rooms) {
            rooms.forEach(function (room) {
                redisClient.set(`${config.MODULE_NAME}:${room}`,room);
                socket.join(room);
            });
        });
        socket.emit('ConnectionEstablised', { message: 'Welcome!', id: socket.id });
    });
    exports.io = io;
}