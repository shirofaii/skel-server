import {mapValues, find, pull, forEach, some} from 'lodash';
import {Talker} from './talker';
import * as express from 'express';
import * as path from 'path';

export class Controller {
    public expressApp;
    public talker:Talker;
    
    public constructor() {
        this.talker = new Talker(this);
    }
    
    toReduxState() {
        return {}
    }
    
    connect(socket):void {
        this.talker.sockets.push(socket);
        socket.on('disconnect', (socket) => this.disconnect(socket));
        socket.on('action', action => this.handleActions(action));
        
        this.talker.init(socket);
    }
    
    disconnect(socket):void {
        pull(this.talker.sockets, socket);
    }
    
    handleActions(action):void {
        switch(action.type) {
        }
    }
    
    serveWith(app) {
        this.expressApp = app
    }
}
