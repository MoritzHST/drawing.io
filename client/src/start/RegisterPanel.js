import React from 'react';
import "./LoginPanel.css"
import RegisterButton from "./RegisterButton";

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
        fetch("/users/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password,
                password2: this.state.password2
            })
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
                <label>
                    Repeat Password:
                    <input type="password" value={this.state.password2} onChange={this.handleChangePassword2}/>
                </label>
                <RegisterButton onClick={this.handleSubmit} />
            </form>
        );
    }
}

export default RegisterPanel;