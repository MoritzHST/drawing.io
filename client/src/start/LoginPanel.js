import React from 'react';
import "./LoginPanel.css"
import LoginButton from "./LoginButton";

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
        fetch("/users/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password
            })
        })
            .then(result => result.json())
            .then(result => {
                localStorage.setItem("accessToken", result.accessToken)
                this.props.onLogin(result)
            })

    }

    render() {
        return (
            <form className="LoginPanel">
                <label>
                    Username:
                    <input type="text" value={this.state.userName} onChange={this.handleChangeUsername}/>
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handleChangePassword}/>
                </label>
                <LoginButton onClick={this.handleSubmit}/>
            </form>
        );
    }
}

export default LoginPanel;