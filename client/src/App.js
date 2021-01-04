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
import AlertBox from "./shared/AlertBox";
import { Nav, Navbar, Jumbotron } from 'react-bootstrap';
import Lobby from "./lobby/Lobby";
import client from "./shared/WebSocketClient"


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            state: "start",
            error: ''
        }

        setInterval(_ => {
            this.refreshAccessToken()
        }, 1000 * 60 * 30) //every 30  Minutes


        this.handleLogin = this.handleLogin.bind(this)
        this.handleNewLobby = this.handleNewLobby.bind(this)
        this.handleJoinLobby = this.handleJoinLobby.bind(this)
        this.handleUnmountAlert = this.handleUnmountAlert.bind(this)
        this.handleCreateLobby = this.handleCreateLobby.bind(this)
        this.handleJoinLobbySubmit = this.handleJoinLobbySubmit.bind(this)

        axios.interceptors.request.use(config => {
            config.headers["Access-Token"] = localStorage.getItem("accessToken");

            config.params = {
                lng: this.props.i18n.language
            }
            return config;
        });

        axios.interceptors.response.use(null, error => {
            this.setState({
                error: error.response.data.error
            })
        });
    }

    handleUnmountAlert() {
        this.setState({
            error: ''
        })
    }

    refreshAccessToken() {
        let token = localStorage.getItem("accessToken");
        console.log(token)
        if (!token) {
            return
        }
        axios.post("/users/refresh", {}
        ).then(data => {
            localStorage.setItem("accessToken", data.data.accessToken)
            client.setAccessToken(data.data.accessToken)
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

    handleCreateLobby(result) {
        const data = result.data
        this.setState({lobby: data, state: "lobby"})
    }

    handleJoinLobbySubmit(result) {
        const data = result.data
        this.setState({lobby: data, state: "lobby"})
    }

    render() {
        const {t} = this.props
        return (
            <div className="App">
                <Suspense fallback={(<div>Loading</div>)}>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand>{t("title")}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <LanguageSelector/>
                                <UserPreviewNavigation user={this.state.user}/>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    {this.state.error && this.state.error !== "" ?
                        <AlertBox unmountChild={this.handleUnmountAlert} errorMsg={this.state.error}/> : null}
                    <Jumbotron className={"AppBody"}>
                        {this.state.state === 'start' ? <StartScreen onLogin={this.handleLogin}/> : null}
                        {this.state.state === 'menu' ?
                            <MainMenu handleNewLobby={this.handleNewLobby} handleJoinLobby={this.handleJoinLobby}/> : null}
                        {this.state.state === 'newLobby' ? <NewLobby onCreateLobby={this.handleCreateLobby}/> : null}
                        {this.state.state === 'joinLobby' ? <JoinLobby handleJoinLobbySubmit={this.handleJoinLobbySubmit}/> : null}
                        {this.state.state === 'lobby'? <Lobby lobby={this.state.lobby} user={this.state.user}/> : null}
                    </Jumbotron>
                </Suspense>
            </div>
        );
    }
}

export default withTranslation()(App);
