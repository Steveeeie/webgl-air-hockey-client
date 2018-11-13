import React, { Component, Fragment } from 'react'
import io from 'socket.io-client'
import ThreeScene from './components/ThreeScene'
import './App.css'

const serverURL = 'http://localhost:7070'

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
    movementY: null
  }

  showReadyUpButton() {
    this.setState({
      createButtonShown: false,
      joinButtonShown: false,
      joinInputShown: false,
      readyUpButtonShown: true
    })
  }

  handleCreateGame() {
    fetch(`${serverURL}/create-game`).then((res) => {
      return res.json()
    }).then((json) => {
      this.setState({
        createButtonShown: false,
        joinButtonShown: false,
        joinInputValue: json.gameID
      })
      this.bindSocketEvents(json.gameID)
    })
  }

  handleJoinGame() {
    this.setState({
      createButtonShown: false,
      joinButtonShown: false,
      joinInputShown: false
    })
    this.bindSocketEvents(this.state.joinInputValue)
  }

  bindSocketEvents(gameID) {
    const socket = io(`${serverURL}/${gameID}`)
    socket.on('player-number-assigned', (data) => this.setState({ playerNumber: data }))
    socket.on('status-updated', (data) => data === 'ready' ? this.showReadyUpButton() : this.handleStart())
    socket.on('simulation-updated', (data) => this.updateMovement(data))
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
    window.addEventListener('mousemove', (e) => {
      this.setState({ movementX: e.movementX, movementY: e.movementY })
    })
    setInterval(() => {
      if (this.state.movementX === false && this.state.movementY === false) {
        this.state.socket.emit('player-moved', { x: 0, y: 0 })
      } else {
        this.state.socket.emit('player-moved', { x: this.state.movementX, y: this.state.movementY })
        this.setState({ movementX: false, movementY: false })
      }
    }, 0);
  }

  updateMovement(data) {
    this.setState({ assetPositions: data });
  }

  render() {
    return (
      <Fragment>
        <div className="interface">
          {this.state.createButtonShown && <button onClick={() => this.handleCreateGame()}>Create Game</button>}
          {this.state.joinInputShown && <input onChange={event => this.handleJoinInputChange(event)} value={this.state.joinInputValue} type="text" />}
          {this.state.joinButtonShown && <button onClick={() => this.handleJoinGame()}>Join Game</button>}
          {this.state.readyUpButtonShown && <button onClick={() => this.handleReadyUp()}>Ready</button>}
        </div >
        <ThreeScene assetPositions={this.state.assetPositions} started={this.state.started} playerNumber={this.state.playerNumber} />
      </Fragment>
    );
  }
}

export default App;
