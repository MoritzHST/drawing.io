import React from 'react';
import NewLobbyButton from "./NewLobbyButton";
import JoinLobbyButton from "./JoinLobbyButton";
import {Form} from "react-bootstrap";

class MainMenu extends React.Component {

    render() {
        return (
            <Form>
                <Form.Group>
                    <NewLobbyButton handleNewLobby={this.props.handleNewLobby}/>
                </Form.Group>
                <Form.Group>
                    <JoinLobbyButton handleJoinLobby={this.props.handleJoinLobby}/>
                </Form.Group>
            </Form>

        );
    }
}

export default MainMenu;