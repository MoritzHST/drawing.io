class WebSocketHandler {
    constructor(socketio) {
        this._io = socketio
        this.sockets = []
        this._io.on('connection', socket => {
            console.log((new Date()) + ' Connection accepted.');

            this.sockets[socket.id] = socket

            console.log(socket.id)

            this.registerEvent({id: socket.id}, "test", () => {
                console.log("test")
            })
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
                delete this.sockets[socket.id]
            });
        });
    }

    registerEvent(query, event, callback) {
        let relevantObjects = []
        if (query) {
            for (let entry in this.sockets){
                for (let key in query){
                    if (this.sockets[entry][key] === query[key]){
                        relevantObjects[entry] = this.sockets[entry][key]
                    }
                }
            }
        }
        else {
            relevantObjects = this.sockets
        }

        for (let entry in relevantObjects){
            this.sockets[entry].on(event, callback)
        }
    }
}

module.exports = WebSocketHandler