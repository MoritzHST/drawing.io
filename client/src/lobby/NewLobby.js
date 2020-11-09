import React from 'react';
import CreateLobbyButton from "./CreateLobbyButton";
import {withTranslation} from "react-i18next";

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

    render() {
        let valuePrivate = "private"
        let valuePublic = "public"

        const {t} = this.props

        return (
            <div>
                <form className="FormPanel">
                    <label>
                        {t("lobby.publicity")}:
                        <div>
                            <input type="radio"
                                   value={valuePrivate}
                                   onChange={this.configPublicityChange}
                                   checked={this.state.publicity === valuePrivate}/> {t("lobby.publicityValue.private")}:
                            <input type="radio"
                                   value={valuePublic}
                                   onChange={this.configPublicityChange}
                                   checked={this.state.publicity === valuePublic}/> {t("lobby.publicityValue.public")}:
                        </div>
                    </label>
                    <label>
                        {t("lobby.timer")}:
                        <div>
                            <input type="number" max="180" min="60" onChange={this.configTimerChange}
                                   value={this.state.timer}/>
                        </div>
                    </label>
                    <label>
                        {t("lobby.rounds")}:
                        <div>
                            <input type="number" max="15" min="3" onChange={this.configRoundChange}
                                   value={this.state.rounds}/>
                        </div>
                    </label>
                    <CreateLobbyButton onClick={this.handleSubmit}/>
                </form>
            </div>

        );
    }
}

export default withTranslation()(NewLobby);