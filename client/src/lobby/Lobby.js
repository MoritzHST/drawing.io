import React from "react";
import client from "../shared/WebSocketClient";

class Lobby extends React.Component {
    constructor(props) {
        super(props);

        let data = {}
        data.lobby = props.lobby
        data.accessToken = props.user.accessToken
        client.socket().emit(`lobby$${data.lobby.urlToken}`, data)
    }

    useEffect(){

    }

    render() {
        return (
            <div onClick={this.props.startGame}>
                Lobby
            </div>

        );
    }
}

export default Lobby;