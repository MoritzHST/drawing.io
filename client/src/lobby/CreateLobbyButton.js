import React from 'react';
import Button from "../shared/Button"
import {withTranslation} from "react-i18next";

class CreateLobbyButton extends React.Component {
    constructor(props){
        super(props)

        this.createLobby = this.createLobby.bind(this)
    }

    createLobby() {
        fetch("")
            .then()
    }


    render() {
        const {t} = this.props
        return (
            <div onClick={this.props.handleCreateLobby}>
                <Button label={t("lobby.createLobby")}/>
            </div>
        );
    }
}

export default  withTranslation()(CreateLobbyButton);