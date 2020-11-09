import React from 'react';
import Button from "../shared/Button"
import {withTranslation} from "react-i18next";

class NewLobbyButton extends React.Component {

    render() {
        const {t} = this.props

        return (
            <div onClick={this.props.handleNewLobby}>
                <Button label={t("lobby.newLobby")}/>
            </div>
        );
    }
}

export default withTranslation()(NewLobbyButton);