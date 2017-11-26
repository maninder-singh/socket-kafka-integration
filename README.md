# socket.io-kafka-node-cluster

A proof of concept for working of socket.io with nodejs cluster module.
This application listen on kafka consumer message and send to browser as soon as it processed
and also uses redis for storing the socket.io data so that all the worker process access them 
when needed.


## Prerequisite

1. [NodeJs](https://nodejs.org/en/) >= 0.12.0
2. [Kafka](https://kafka.apache.org/)
3. [Redis](https://redis.io/)

## Setup Guide

* If Redis and kafka are hosted somewhere provide those details in 
[config.js](./app/config.js) file otherwise follow below steps to setup locally 

* Run redis server
```
$  redis-server

```
* Run Kafka ( execute each command in different terminal window )

```
$ bin/zookeeper-server-start.sh config/zookeeper.properties
$ bin/kafka-server-start.sh config/server.properties
$ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test
$ bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
 
```

* Run the application

```
$ npm install
$ node start 

```

## Usage

* Open browser and go to following url `http://localhost:3000`

* Copy the socket id present on webpage and go to terminal where 
`bin/kafka-consolo-producer.sh` command is running

* Paste data into kafka producer terminal in following format
```
   {"id":"paste socket_id copy from webpage here."}
   
```

* Kafka response should be shown in developer tools console 
