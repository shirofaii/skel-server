import {Controller} from './controller'

/*
    any method from this class send some message to the clients
    and nothing more
*/

export class Talker {
    controller:Controller
    sockets = [] // managed by controller

    constructor(controller:Controller) {
        this.controller = controller
    }

    init(socket):void {
        socket.emit('action', {
            type:'init',
        })
    }
}
