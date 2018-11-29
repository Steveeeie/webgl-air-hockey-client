import React, { Component, Fragment } from 'react'
import io from 'socket.io-client'
import { CLIENT_URL, SERVER_URL } from './constants'
import ThreeScene from './components/ThreeScene'
import './App.css'

class App extends Component {
    state = {
        socket: null,
        started: false,
        readyUpButtonShown: false,
        createButtonShown: true,
        joinButtonShown: true,
        joinInputShown: true,
        joinInputValue: '',
        playerNumber: null,
        assetPositions: null,
        movementX: null,
        movementY: null,
        gameURL: null,
        gameURLShown: false

    }

    componentWillMount() {
        const gameid =  window.location.pathname.split('/')[1]
        if(gameid) this.handleJoinGame(gameid)
    }

    showReadyUpButton() {
        this.setState({
            createButtonShown: false,
            gameURLShown: false,
            readyUpButtonShown: true,
        })
    }

    handleCreateGame() {
        fetch(`${SERVER_URL}/create-game`)
            .then(res => res.json())
            .then(({ gameID }) => {
                this.setState({
                    createButtonShown: false,
                    gameURL: `${CLIENT_URL}/${gameID}`,
                    gameURLShown: true
                })
                this.bindSocketEvents(gameID)
            })
    }

    handleJoinGame(gameid) {
        this.setState({ createButtonShown: false })
        this.bindSocketEvents(gameid)
    }

    bindSocketEvents(gameID) {
        const socket = io(`${SERVER_URL}/${gameID}`)
        socket.on('player-number-assigned', data => this.setState({ playerNumber: data }))
        socket.on('status-updated', data => (data === 'ready' ? this.showReadyUpButton() : this.handleStart()))
        socket.on('simulation-updated', data => this.updateMovement(data))
        this.setState({ socket })
    }

    handleReadyUp() {
        this.state.socket.emit('player-ready')
        this.setState({ readyUpButtonShown: false })
        document.body.requestPointerLock()
    }

    handleJoinInputChange(event) {
        this.setState({ joinInputValue: event.target.value })
    }

    handleStart() {
        this.setState({ started: true })
        window.addEventListener('click', () => document.body.requestPointerLock())
        window.addEventListener('mousemove', e => {
            this.setState({ movementX: e.movementX, movementY: e.movementY })
        })
        setInterval(() => {
            if (this.state.movementX === false && this.state.movementY === false) {
                this.state.socket.emit('player-moved', { x: 0, y: 0 })
            } else {
                this.state.socket.emit('player-moved', { x: this.state.movementX, y: this.state.movementY })
                this.setState({ movementX: false, movementY: false })
            }
        }, 0)
    }

    updateMovement(data) {
        this.setState({ assetPositions: data })
    }

    render() {
        return (
            <Fragment>
                <div className="interface">
                    {this.state.createButtonShown && <button onClick={() => this.handleCreateGame()}>Create Game</button>}
                    {this.state.readyUpButtonShown && <button onClick={() => this.handleReadyUp()}>Ready</button>}
                    {this.state.gameURLShown && <p>{this.state.gameURL}</p>}
                </div>
                <ThreeScene
                    assetPositions={this.state.assetPositions}
                    started={this.state.started}
                    playerNumber={this.state.playerNumber}
                />
            </Fragment>
        )
    }
}

export default App
