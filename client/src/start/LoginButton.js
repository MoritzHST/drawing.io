import React from 'react';
import Button from "../shared/Button"

class LoginButton extends React.Component {
    constructor(props) {
        super(props)

        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin() {
        this.props.onSubmit()
    }

    render() {
        const login = 'Login';

        return (
            <div onClick={this.handleLogin}>
                <Button label={login}/>
            </div>
        );
    }
}

export default LoginButton;