import React from 'react';
import Button from "../shared/Button"
import {withTranslation} from "react-i18next";

class GuestButton extends React.Component {
    constructor(props){
        super(props)

        this.handleGuest = this.handleGuest.bind(this)
    }

    handleGuest(state){
        const curLanguage = this.props.i18n.language
        fetch("/users/guest", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                language: curLanguage
            })
        })
            .then(result => result.json())
            .then(result => {
                if (!result.error)
                    localStorage.setItem("accessToken", result.user.accessToken)
                this.props.onChooseGuest(result)
            })
            .catch(error => {
                throw(new Error(error))
            })
    }

    render() {
        const {t} = this.props
        return (
            <div onClick={this.handleGuest}>
                <Button className="guest-button" label={t("start.playAsGuest")}/>
            </div>
        );
    }
}

export default withTranslation()(GuestButton);