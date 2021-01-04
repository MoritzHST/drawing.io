class Lobby {
    constructor(lobbyData){
        this._timer = lobbyData.timer
        this._publicity = lobbyData.publicity
        this._rounds = lobbyData.rounds
        this._id = lobbyData._id
        this._urlToken = lobbyData.urlToken
        this._players = []
    }

    addPlayer(player){
        delete player.accessToken
        if (this._players.length < 10 )
            this._players.push(player)
    }

    removePlayer(player) {
    }

    getAllPlayers(){
        return this._players
    }
}

module.exports = Lobby