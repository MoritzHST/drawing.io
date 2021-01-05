import React from "react";
import {ListGroup, Card, Container, Row, Col, Form} from "react-bootstrap";
import client from "../shared/WebSocketClient";
import {withTranslation} from "react-i18next";

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        let data = {}
        data.lobby = props.lobby
        data.user = props.user
        this.state = {
            players: [],
            data: data,
            message: "",
            messages: []
        }
        client.socket().emit("join_lobby", JSON.stringify(data))

        client.socket().on(`lobby$${data.lobby.urlToken}$new_player`, data => {
            let playerData = JSON.parse(data)
            this.setState({
                players: playerData.allPlayers
            })
        })

        client.socket().on(`lobby$${data.lobby.urlToken}$chat`, message =>{
            this.state.messages.push(JSON.parse(message))
            this.setState({
                    messages: this.state.messages
                }
            )
        })

        this.handleChangeMessage = this.handleChangeMessage.bind(this)
        this.handleSendMessage = this.handleSendMessage.bind(this)
    }

    componentWillUnmount() {
        client.socket().off(`lobby$${this.state.data.lobby.urlToken}$new_player`)
    }

    handleChangeMessage(event) {
        this.setState({
            message: event.target.value
        })
    }

    handleSendMessage(keyEvent){
        keyEvent.preventDefault()
        console.log("event")
        if (keyEvent.which === 13) {
            console.log("if")
            console.log(`lobby$${this.state.data.lobby.urlToken}$chat`)
            client.socket().emit(`lobby$${this.state.data.lobby.urlToken}$chat`, JSON.stringify({
                message: this.state.message,
                from: this.state.data.user
            }))
        }
    }

    render() {
        const {t} = this.props
        return (
            <div onClick={this.props.startGame}>
                <Container>
                    <Row>
                        <Col>
                            <Card style={{width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title>{t("players")}</Card.Title>

                                    <ListGroup variant="flush">
                                        {this.state.players.map((item, index) => (
                                            <ListGroup.Item key={index}>{item.userName}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col>
                            <Card style={{width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title>{t("chat")}</Card.Title>
                                    <ListGroup variant="flush">
                                        {this.state.messages.map((item, index) => (
                                            <ListGroup.Item key={index}>{`${item.from.userName}\n${item.message}`}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Form onSubmit={function(event) {event.preventDefault()}}>
                                        <Form.Group controlId="chatSendMessage">
                                            <Form.Control type="text" value={this.state.message} onKeyUp={this.handleSendMessage} onChange={this.handleChangeMessage}/>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col>
                            <Card style={{width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title>{t("lobby.lobby")}</Card.Title>

                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{t("lobby.publicity")}: {t(`lobby.publicityValue.${this.state.data.lobby.publicity}`)}</ListGroup.Item>
                                        <ListGroup.Item>{t("lobby.rounds")}: {this.state.data.lobby.rounds} </ListGroup.Item>
                                        <ListGroup.Item>{t("lobby.timer")}: {this.state.data.lobby.timer} </ListGroup.Item>
                                        <ListGroup.Item>{t("lobby.token")}: {this.state.data.lobby.urlToken} </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>


        );
    }
}

export default withTranslation()(Lobby);