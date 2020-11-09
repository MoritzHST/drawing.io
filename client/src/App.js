import React, {Suspense, Component} from 'react';
import './App.css';
import StartScreen from "./start/StartScreen";
import UserPreviewNavigation from "./user/UserPreviewNavigation";
import MainMenu from "./menu/MainMenu";
import NewLobby from "./lobby/NewLobby";
import JoinLobby from "./lobby/JoinLobby";
import LanguageSelector from "./LanguageSelector";
import {withTranslation} from 'react-i18next'
import axios from "axios";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            state: "start"
        }

        setInterval(_ => {
            this.refreshAccessToken()
        }, 1000 * 60 * 30) //every 30  Minutes


        this.handleLogin = this.handleLogin.bind(this)
        this.handleNewLobby = this.handleNewLobby.bind(this)
        this.handleJoinLobby = this.handleJoinLobby.bind(this)

        axios.interceptors.request.use(config => {
            config.headers["Access-Token"] =  localStorage.getItem("accessToken");;
            config.params = {
                lng : this.props.i18n.language
            }
            return config;
        });
    }

    refreshAccessToken() {
        let token = localStorage.getItem("accessToken");
        if (!token)
            return
        axios.post("/users/refresh", {}
        ).then(data => {
            localStorage.setItem("accessToken", data.data.accessToken)
        })
            .catch(error => {
                this.setState({
                    user: {}
                })
            })

    }

    handleLogin(data) {
        this.setState({user: data.user, state: "menu"})
    }

    handleNewLobby() {
        this.setState({state: "newLobby"})
    }

    handleJoinLobby() {
        this.setState({state: "joinLobby"})
    }

    render() {
        const {t} = this.props
        return (
            <div className="App">
                <Suspense fallback={(<div>Loading</div>)}>
                    <div className="App-header">
                        <h2>{t("title")}</h2>
                        <LanguageSelector/>
                        <UserPreviewNavigation user={this.state.user}/>
                    </div>
                    {this.state.state === 'start' ? <StartScreen onLogin={this.handleLogin}/> : null}
                    {this.state.state === 'menu' ?
                        <MainMenu handleNewLobby={this.handleNewLobby} handleJoinLobby={console.log}/> : null}
                    {this.state.state === 'newLobby' ? <NewLobby/> : null}
                    {this.state.state === 'joinLobby' ? <JoinLobby/> : null}
                </Suspense>
            </div>
        );
    }
}

export default withTranslation()(App);
