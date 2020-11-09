import React from 'react';
import "./LoginPanel.css"
import RegisterButton from "./RegisterButton";
import {withTranslation} from "react-i18next";
import axios from "axios";

class RegisterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            password2: ''
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePassword2 = this.handleChangePassword2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({
            userName: event.target.value
        });
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleChangePassword2(event) {
        this.setState({
            password2: event.target.value
        });
    }

    handleSubmit() {
        axios.post("/users/", {
            userName: this.state.userName,
            password: this.state.password,
            password2: this.state.password2
        })

    }

    render() {
        const {t} = this.props
        return (
            <form className="FormPanel">
                <label>
                    {t("user.name")}:
                    <input type="text" value={this.state.userName} onChange={this.handleChangeUsername}/>
                </label>
                <label>
                    {t("user.password")}:
                    <input type="password" value={this.state.password} onChange={this.handleChangePassword}/>
                </label>
                <label>
                    {t("user.passwordRepeat")}:
                    <input type="password" value={this.state.password2} onChange={this.handleChangePassword2}/>
                </label>
                <RegisterButton onClick={this.handleSubmit}/>
            </form>
        );
    }
}

export default withTranslation()(RegisterPanel);