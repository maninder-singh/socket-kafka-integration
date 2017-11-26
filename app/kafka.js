const config = require("./config"),
    kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    redisClient = require("./redis"),
    client = new kafka.Client(`${config.KAFKA.CONSUMER.HOST}:${config.KAFKA.CONSUMER.PORT}`);
    consumer = new Consumer(client,[{topic: config.KAFKA.CONSUMER.TOPIC, partition: 0}],{autoCommit:false});

exports.init = (io) => {    
    consumer.on('message', function (message) {
        var data;
        try{
            data = JSON.parse(message.value);
        }catch(e){
            data = message.value;
        }

        if(data.id){
            redisClient.get(`${config.MODULE_NAME}:${data.id}`).then((response) => {
                var socket = io.sockets.connected[data.id];
                if(socket){
                    socket.emit("KafkaConsumerResponse",{"data":data});
                    redisClient.del(`${config.MODULE_NAME}:${data.id}`);
                }
            },(error) => {
               console.log("error : " + error);
            });
        }
    });
};

