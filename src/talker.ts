import {mapValues, find, pull, forEach, some} from 'lodash';
import {Controller} from './controller';
import * as express from 'express';
import * as path from 'path';

/*
    any method from this class send some message to the clients
    and nothing more
*/

export class Talker {
    public controller:Controller;
    public sockets = []; // managed by controller
    
    public constructor(controller:Controller) {
        this.controller = controller;
    }
    
    init(socket) {
        socket.emit('action', {
            type:'init'
        });
    }
}
