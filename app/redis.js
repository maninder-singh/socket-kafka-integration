const redis = require("redis"),
      config = require("./config"),
      client = redis.createClient(config.REDIS.PORT,config.REDIS.HOST);

client.on("connect",function () {
    console.log(`connected to redis client @ ${config.REDIS.HOST}:${config.REDIS.PORT}`);
});

exports.set = (key,value) => {
  client.set(key,value,function (err, reply) {
      if(reply){
          console.log(`Key stored successfully : ${reply}`);
      }
  });
};

exports.get = (key) => {
  return new Promise((resolve,reject) => {
      client.get(key,function (err, reply) {
          if(err || !reply){
              reject(err);
          }
          resolve(reply);
      });
  });
};

exports.del = (key) => {
    client.del(key,(err,reply) => {
        if(err){
            console.log("error occur while deleting key : " + key);
            return;
        }
        console.log(`Key deleted successfully : `,reply);
    });
};

