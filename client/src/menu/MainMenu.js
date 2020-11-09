import React from 'react';
import NewLobbyButton from "./NewLobbyButton";
import JoinLobbyButton from "./JoinLobbyButton";
class MainMenu extends React.Component {

    render() {
        return (
            <div>
                <NewLobbyButton handleNewLobby={this.props.handleNewLobby} />
                <JoinLobbyButton handleJoinLobby={this.props.handleJoinLobby} />
            </div>

        );
    }
}

export default MainMenu;