import React from 'react';
import Button from "../shared/Button"

class RegisterButton extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.onClick()
    }

    render() {
        const register = 'Register';

        return (
            <div onClick={this.handleClick}>
                <Button label={register}/>
            </div>
        );
    }
}

export default RegisterButton;