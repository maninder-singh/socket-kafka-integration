// ModuleName
exports.MODULE_NAME = "SocketIOKafKa";

// HTTP Server
exports.HTTP_PORT = 3000;
exports.INTERNAL_HTTP_PORT = 0;

// Kafka
exports.KAFKA = {
    ZOOKEEPER : {
      HOST:"zookeeper",
      PORT:2181
    },
    CONSUMER:{
        HOST:"localhost",
        PORT:9092,
        TOPIC:"test",
        GROUP:"ExampleTestGroup",
        PROTOCOL:['roundrobin'],
        FROM_OFFSET:'latest',
        SSL:true
    }
};

// Redis
exports.REDIS = {
    HOST:"localhost",
    PORT:6379
};