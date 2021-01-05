class WebSocketHandler {
    constructor(socketio) {
        this._io = socketio
        this.sockets = []
        this.handlers = []
        this.disconnectHandlers = []
        this._io.on('connection', socket => {
            console.log((new Date()) + ' Connection accepted.');
            this.sockets[socket.id] = socket

            for (let entry in this.handlers){
                if (Object.keys(this.handlers[entry].query).length === 0 || this.meetsQuery(socket, this.handlers[entry].query)){
                    socket.on(entry, (data) => {
                        this.handlers[entry].callback(data, socket)
                    })
                }
            }

            // const connection = request.accept()
            // connection.on("message", async function(message){
            //   try {
            //     let data = JSON.parse(message.utf8Data)
            //     const user = await auth.validateToken(data.accessToken)
            //     delete user.accessToken
            //     connection.emit(`lobby$${data.lobby.urlToken}`, user)
            //   }
            //   catch (e){
            //     connection.close("Invalid AccessToken")
            //   }
            // })

            socket.on('disconnect', () => {
                console.log('user disconnected');
                for (let i in this.disconnectHandlers){
                    this.disconnectHandlers[i]();
                }
                delete this.sockets[socket.id]
            });
        });
    }

    registerEvent(query, event, callback) {
        let eventObj = {}
        eventObj.query = query
        eventObj.callback = callback
        this.handlers[event] = eventObj
        let relevantObjects = this.getRelevantSockets(query);

        for (let entry in relevantObjects) {
            this.sockets[entry].on(event, (data) => {
                callback(data, this.sockets[entry])
            })
        }
    }

    getRelevantSockets(query) {
        let relevantObjects = []
        if (Object.keys(query).length !== 0) {
            for (let entry in this.sockets) {
                if (this.meetsQuery(this.sockets[entry], query)) {
                    relevantObjects[entry] = this.sockets[entry]["id"]
                }
            }
        } else {
            relevantObjects = this.sockets
        }
        return relevantObjects;
    }

    sendBroadcast(query, event, data){
        let relevantObjects = this.getRelevantSockets(query);

        for (let entry in relevantObjects) {
            this.sockets[entry].broadcast.emit(event, data)
        }
    }

    registerDisconnectListener(handler){
        this.disconnectHandlers.push(handler)
    }

    emit(event, message){
        this._io.emit(event, message)
    }

    meetsQuery(socket, query) {
        return this.checkQuery(socket, query)
    }

    checkQuery(socket, query) {
        let retVal = true;
        for (let key in query) {
            if (socket.hasOwnProperty(key) && typeof socket[key] == "object" ) {
                retVal = retVal && this.checkQuery(socket[key], query[key])
            }
            else if (socket.hasOwnProperty(key)){
                retVal = retVal && socket[key] === query[key]
            }
            else
                retVal = retVal && false
        }
        return retVal;
    }
}

module.exports = WebSocketHandler