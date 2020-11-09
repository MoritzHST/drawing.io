import React from 'react';
import Button from "../shared/Button"
import {withTranslation} from "react-i18next";

class JoinLobbyButton extends React.Component {

    render() {
        const {t} = this.props;

        return (
            <div onClick={this.props.handleJoinLobby}>
                <Button label={t("lobby.joinLobby")}/>
            </div>
        );
    }
}

export default withTranslation()(JoinLobbyButton);