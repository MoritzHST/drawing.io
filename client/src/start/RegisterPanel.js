import React from 'react';
import "./LoginPanel.css"
import RegisterButton from "./RegisterButton";
import {withTranslation} from "react-i18next";
import axios from "axios";
import {Form} from "react-bootstrap";

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
            <Form>
                <Form.Group controlId="formRegisterUserName">
                    <Form.Label>{t("user.name")}</Form.Label>
                    <Form.Control type="text" placeholder={t("user.name")} value={this.state.userName}
                                  onChange={this.handleChangeUsername}/>
                </Form.Group>
                <Form.Group controlId="formRegisterPassword">
                    <Form.Label>{t("user.password")}:</Form.Label>
                    <Form.Control type="password" value={this.state.password} onChange={this.handleChangePassword}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{t("user.passwordRepeat")}:</Form.Label>
                    <Form.Control type="password" value={this.state.password2} onChange={this.handleChangePassword2}/>
                </Form.Group>
                <Form.Group>
                <RegisterButton onClick={this.handleSubmit}/>
                </Form.Group>
            </Form>
        );
    }
}

export default withTranslation()(RegisterPanel);