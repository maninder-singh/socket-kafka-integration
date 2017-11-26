var sticky = require("sticky-session"), 
http = require('http'),
fs = require('fs'),
socket = require("./socket.js"),
kafka = require("./kafka"),
config = require("./config"),
index = fs.readFileSync(__dirname + '/index.html'),
app;


// if(cluster.isMaster){
//     console.log(`Master ${process.pid} is running`);
    
//     for(let i = 0; i < numCPUs; i++){
//         cluster.fork();
//     }

//     cluster.on("exit",(worker,code,signal) => {
//         console.log(`workder ${worker.process.pid} died`);
//     });

// }else{

//     app = http.createServer(function(req, res) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(index);
//         });
        
//         socket.init(app);
//         kafka.init(socket.io);
//         app.listen(config.HTTP_PORT);

//     console.log(`Worker ${process.pid} started`);
// }

app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
    });

if (!sticky.listen(app, 3000)) {
  // Master code
  app.once('listening', function() {
    console.log('server started on 3000 port');
  });
} else {
  // Worker code
  socket.init(app);
  kafka.init(socket.io);
  app.listen(config.INTERNAL_HTTP_PORT);
}