import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import StartScreen from "./start/StartScreen";

class App extends Component {
    constructor(props) {
        super(props);

        setInterval(function () {
            let token = localStorage.getItem("accessToken");
            if (!token)
                return
            fetch("/users/refresh", {
                    method: 'POST',
                    headers: {"Access-Token": token}
                }
            ).then(data => data.json())
                .then(data => localStorage.setItem("accessToken", data.accessToken))
        }, 1000 * 60 * 30 ) //every 30  Minutes
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>drawing.io</h2>
                </div>
                <StartScreen/>

            </div>
        );
    }
}

export default App;
