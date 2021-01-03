import React from 'react';

class JoinLobby extends React.Component {

    render() {
        return (
            <div onClick={this.props.handleJoinLobby}>
                Join Lobby
            </div>

        );
    }
}

export default JoinLobby;