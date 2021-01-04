import React from 'react';
import {Form} from "react-bootstrap";
import JoinLobbyButton from "./JoinLobbyButton";
import {withTranslation} from "react-i18next";
import axios from "axios";

class JoinLobby extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            token: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeToken = this.handleChangeToken.bind(this)
    }

    handleSubmit() {
        axios.get(`/lobbies/?urlToken=${this.state.token}`).then(result => {
            console.log(result)
            this.props.handleJoinLobbySubmit(result)
        })

    }

    handleChangeToken(event) {
        this.setState({
            token: event.target.value
        });
    }

    render() {
        const {t} = this.props
        return (
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label>{t("lobby.token")}:</Form.Label>
                        <Form.Control type="text" placeholder={t("lobby.token")} value={this.state.token}
                                      onChange={this.handleChangeToken}/>
                    </Form.Group>

                </Form>
                <Form.Group>
                    <JoinLobbyButton joinLobby={this.handleSubmit}/>
                </Form.Group>
            </div>
        );
    }
}

export default withTranslation()(JoinLobby);