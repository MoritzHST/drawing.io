import React from 'react';
import Button from "../shared/Button"

class LoginButton extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.onClick()
    }

    render() {
        const login = 'Login';

        return (
            <div onClick={this.handleClick}>
                <Button label={login}/>
            </div>
        );
    }
}

export default LoginButton;