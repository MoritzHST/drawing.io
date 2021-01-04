const Lobby = require("../buisiness/Lobby")

class LobbySocketHandler {

    constructor(webSocketHandler) {
        this._websocketHandler = webSocketHandler
        this._lobbys = []
        this.subscribeLobby()
    }

    subscribeLobby() {
        this._websocketHandler.registerEvent({}, `join_lobby`, (data) => {
            let lobby = JSON.parse(data);
            let lobbyObj
            if (!this._lobbys[lobby.lobby.urlToken]) {
                lobbyObj = new Lobby(lobby.lobby)
                this._lobbys[lobby.lobby.urlToken] = lobbyObj
            }
            else
                lobbyObj = this._lobbys[lobby.lobby.urlToken]
            lobbyObj.addPlayer(lobby.user)
            this._websocketHandler.emit(`lobby$${lobby.lobby.urlToken}$new_player`, JSON.stringify({
                newPlayer: {
                    userName: lobby.user.userName,
                    guest: lobby.user.guest
                },
                allPlayers: lobbyObj.getAllPlayers()
            }))
        })
    }

}

module.exports = LobbySocketHandler

