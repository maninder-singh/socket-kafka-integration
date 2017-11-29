const config = require("./config"),
    kafka = require('kafka-node'),
    consumerGroup = new kafka.ConsumerGroup({
                host: `${config.KAFKA.ZOOKEEPER.HOST}:${config.KAFKA.ZOOKEEPER.PORT}`,
                kafkaHost: `${config.KAFKA.CONSUMER.HOST}:${config.KAFKA.CONSUMER.PORT}`,
                ssl: config.KAFKA.CONSUMER.SSL,
                groupId: `${config.KAFKA.CONSUMER.GROUP}`,
                protocol: config.KAFKA.CONSUMER.PROTOCOL,
                fromOffset: config.KAFKA.CONSUMER.FROM_OFFSET,
            },config.KAFKA.CONSUMER.TOPIC);

exports.init = (io) => {
    consumerGroup.on('message', function (message) {
        console.log("Kafka consumer message listner call");
        var data;
        try{
            data = JSON.parse(message.value);
        }catch(e){
            data = message.value;
        }

        if(data.id){
            var socket = io.sockets.in(data.id);
            if(socket){
                socket.emit("KafkaConsumerResponse",{"data":data});
            }
        }
    });
};

