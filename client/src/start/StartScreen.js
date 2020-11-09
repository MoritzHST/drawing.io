import React from 'react';
import GuestButton from "./GuestButton"
import LoginPanel from "./LoginPanel";
import "./StartScreen.css"
import RegisterButton from "./RegisterButton";
import RegisterPanel from "./RegisterPanel";
import LoginButton from "./LoginButton";

class StartScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRegistering: false
        }
        this.handleGuest = this.handleGuest.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleRegister(state) {
        if (!this.state.isRegistering)
            this.setState({
                isRegistering: true
            })
    }

    handleGuest(data) {
        if (data.error) {
            console.log(data.error)
        }
        else {
            this.props.onLogin(data)
        }
    }

    handleLogin(data) {
        if (this.state.isRegistering)
            this.setState({
                isRegistering: false
            })
        else{
            if (data.error) {
                console.log(data.error)
            }
            else {
                this.props.onLogin(data)
            }

        }

    }

    render() {
        return (
            <div className="StartScreen">
                <div>
                    {(!this.state.isRegistering) ? <LoginPanel onLogin={this.handleLogin}/> : <RegisterPanel onRegister={this.handleRegister}/>}
                </div>

                <div>
                    {(!this.state.isRegistering) ? <RegisterButton onClick={this.handleRegister}/> :
                        <LoginButton onClick={this.handleLogin}/>}
                    <GuestButton onChooseGuest={this.handleGuest}/>
                </div>
            </div>
        );
    }
}

export default StartScreen;