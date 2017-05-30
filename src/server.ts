const express = require('express');
const app = express();
const server = require('http').Server(app);
const ioServer = require('socket.io')(server);
const fs = require('fs');

import {Controller} from './controller';

process.on('uncaughtException', function(e) {
    fs.writeFileSync('crash.log', e.toString() + '\n' + e.stack.toString());
    console.log(e.toString() + '\n' + e.stack.toString());
})

server.listen(80);

app.use(express.static('wwwroot'));

const controller = new Controller();
controller.serveWith(app);

ioServer.on('connection', function (socket) {
    controller.connect(socket);
});

ioServer.on('disconnect', function (socket) {
    controller.disconnect(socket);
});
