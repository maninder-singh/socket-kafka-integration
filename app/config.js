// ModuleName
exports.MODULE_NAME = "SocketIOKafKa";

// HTTP Server
exports.HTTP_PORT = 3000;
exports.INTERNAL_HTTP_PORT = 0;
// Kafka 
exports.KAFKA = {
    CONSUMER:{
        HOST:"localhost",
        PORT:2181,
        TOPIC:"test"
    }
};

// Redis
exports.REDIS = {
    HOST:"localhost",
    PORT:6379
};