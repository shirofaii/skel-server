import {mapValues, find, pull, forEach, some} from 'lodash'
import {Talker} from './talker'
import * as express from 'express'
import * as path from 'path'

export class Controller {
    expressApp
    talker:Talker

    constructor() {
        this.talker = new Talker(this)
    }

    connect(socket):void {
        this.talker.sockets.push(socket)
        socket.on('disconnect', s => this.disconnect(s))
        socket.on('action', a => this.handleActions(a))

        this.talker.init(socket)
    }

    disconnect(socket):void {
        pull(this.talker.sockets, socket)
    }

    handleActions(action):void {
        switch (action.type) {
        }
    }

    serveWith(app):void {
        this.expressApp = app
    }
}
