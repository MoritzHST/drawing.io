import React from "react";
import {ListGroup} from "react-bootstrap";
import client from "../shared/WebSocketClient";

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: []
        }
        let data = {}
        data.lobby = props.lobby
        data.user = props.user
        client.socket().emit("join_lobby", JSON.stringify(data))

        client.socket().on("join_lobby", data => {
            console.log(data);
        })
        client.socket().on(`lobby$${data.lobby.urlToken}$new_player`, data => {
            let playerData = JSON.parse(data)
            console.log(playerData)
            this.setState({
                players: playerData.allPlayers
            })
        })
    }

    useEffect(){

    }

    render() {
        return (
            <div onClick={this.props.startGame}>
                Lobby

                <ListGroup>
                    {this.state.players.map((item, index) => (
                        <ListGroup.Item key={index}>{item.userName}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>

        );
    }
}

export default Lobby;