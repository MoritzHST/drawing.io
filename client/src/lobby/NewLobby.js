import React from 'react';
import CreateLobbyButton from "./CreateLobbyButton";
import {withTranslation} from "react-i18next";
import {Form} from "react-bootstrap";
import axios from "axios";

class NewLobby extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            publicity: "private",
            timer: 120,
            rounds: 6
        }

        this.configPublicityChange = this.configPublicityChange.bind(this)
        this.configTimerChange = this.configTimerChange.bind(this)
        this.configRoundChange = this.configRoundChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    configPublicityChange(event) {
        this.setState({
            publicity: event.target.value
        });
    }

    configTimerChange(event) {
        this.setState({
            timer: event.target.value
        })
    }

    configRoundChange(event) {
        this.setState({
            rounds: event.target.value
        })
    }

    handleSubmit(){
        axios.post("/lobbies/", {
            timer: this.state.timer,
            publicity: this.state.publicity,
            rounds: this.state.rounds
        }).then(result => {
            this.props.onCreateLobby(result)
        })
    }

    render() {
        let valuePrivate = "private"
        let valuePublic = "public"

        const {t} = this.props

        return (
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label>{t("lobby.publicity")}:</Form.Label>
                        <Form.Control as="select"
                                      onChange={this.configPublicityChange}>
                            <option value={valuePrivate}> {t("lobby.publicityValue.private")} </option>
                            <option value={valuePublic}> {t("lobby.publicityValue.public")} </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t("lobby.timer")}:</Form.Label>
                        <Form.Control type="range" max="180" min="60" onChange={this.configTimerChange}
                                      value={this.state.timer}/>
                        <Form.Text>{this.state.timer}</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t("lobby.rounds")}:</Form.Label>
                        <Form.Control type="range" max="15" min="3" onChange={this.configRoundChange}
                                      value={this.state.rounds}/>
                        <Form.Text>{this.state.rounds}</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <CreateLobbyButton handleCreateLobby={this.handleSubmit}/>
                    </Form.Group>
                </Form>
            </div>

        );
    }
}

export default withTranslation()(NewLobby);