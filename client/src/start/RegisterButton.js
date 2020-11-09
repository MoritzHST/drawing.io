import React from 'react';
import Button from "../shared/Button"
import {withTranslation} from "react-i18next";

class RegisterButton extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.onClick()
    }

    render() {
        const {t} = this.props
        return (
            <div onClick={this.handleClick}>
                <Button label={t("start.register")}/>
            </div>
        );
    }
}

export default withTranslation()(RegisterButton);