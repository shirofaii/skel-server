import * as express from 'express'
import * as http from 'http'
import * as io from 'socket.io'
import * as fs from 'fs'
import {Controller} from './controller'

const app = express()
const server = http.createServer(app)
const ioServer = io(server)

process.on('uncaughtException', e => {
    fs.writeFileSync('crash.log', e.toString() + '\n' + e.stack.toString())
    console.log(e.toString() + '\n' + e.stack.toString())
})

server.listen(1213)

const controller = new Controller()
controller.serveWith(app)

ioServer.on('connection', socket => {
    controller.connect(socket)
})

ioServer.on('disconnect', socket => {
    controller.disconnect(socket)
})
