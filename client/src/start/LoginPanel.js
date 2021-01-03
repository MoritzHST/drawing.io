import React from 'react';
import "./LoginPanel.css"
import LoginButton from "./LoginButton";
import {withTranslation} from "react-i18next";
import {Form} from 'react-bootstrap';
import axios from 'axios'

class LoginPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
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

    handleSubmit() {
        axios.post("/users/login", {
            userName: this.state.userName,
            password: this.state.password
        })
            .then(result => {
                if (result && !result.data.error) {
                    localStorage.setItem("accessToken", result.data.user.accessToken)
                    this.props.onLogin(result.data)
                }
            })
            .catch(error => {
                console.log(error)
                throw(new Error(error))
            })

    }

    render() {
        const {t} = this.props
        return (
            <Form>
                <Form.Group controlId="formLoginUserName">
                    <Form.Label>{t("user.name")}</Form.Label>
                    <Form.Control type="text" placeholder={t("user.name")} value={this.state.userName}
                                  onChange={this.handleChangeUsername}/>
                </Form.Group>
                <Form.Group controlId="formLoginPassword">
                    <Form.Label>{t("user.password")}:</Form.Label>
                    <Form.Control type="password" value={this.state.password} onChange={this.handleChangePassword}/>
                </Form.Group>
                <Form.Group>
                    <LoginButton onClick={this.handleSubmit}/>
                </Form.Group>

            </Form>
        );
    }
}

export default withTranslation()(LoginPanel);