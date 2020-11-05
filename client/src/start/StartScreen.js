import React from 'react';
import GuestButton from "./GuestButton"
import LoginPanel from "./LoginPanel";
import "./StartScreen.css"

class StartScreen extends React.Component {
    constructor(props) {
        super(props)

        this.handleGuest = this.handleGuest.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleGuest(event){

    }

    handleLogin(credentials){
        console.log(JSON.stringify(credentials))
    }

    render() {
        return (
            <div className="StartScreen">
                <div>
                    <LoginPanel onLogin={this.handleLogin}/>
                </div>

                <div>
                    <GuestButton onChooseGuest={this.handleGuest}/>
                </div>
            </div>
        );
    }
}

export default StartScreen;