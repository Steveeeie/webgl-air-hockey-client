<template>
  <div class="interface">
    <button v-if="createButtonShown" v-on:click="handleCreateGame">Create Game</button>
    <input  v-if="joinInputShown" v-model="joinInputValue" type="text" />
    <button v-if="joinButtonShown" v-on:click="handleJoinGame">Join Game</button>
    <button v-if="readyUpButtonShown" v-on:click="handleReadyUp">Ready</button>
    <Scene :assetPositions="assetPositions" :started="started" :playerNumber="playerNumber" />
  </div>
</template>

<script>
import io from 'socket.io-client'
import Scene from './components/Scene.vue'
const serverURL = 'http://localhost:7070'

export default {
  name: 'app',
  data() {
    return {
      socket: null,
      started: false,
      readyUpButtonShown: false,
      createButtonShown: true,
      joinButtonShown: true,
      joinInputShown: true,
      joinInputValue: null,
      playerNumber: null,
      assetPositions: null,
      movementX: null,
      movementY: null
    }
  },
  components: {
    Scene
  },
  methods: {
    hideCreateButton: function(){
      this.createButtonShown = false
    },
    hideJoinButton: function(){
      this.joinButtonShown = false
    },
    hideJoinInput: function(){
      this.joinInputShown = false
    },
    showReadyUpButton: function() {
      this.createButtonShown = false
      this.joinButtonShown = false
      this.joinInputShown = false
      this.readyUpButtonShown = true
    },
    handleCreateGame: function(){
      fetch(`${serverURL}/create-game`).then((res) => {
        return res.json()
      }).then((json) => {
        this.createButtonShown = false
        this.joinButtonShown = false
        this.joinInputValue= json.gameID
        this.bindSocketEvents(json.gameID)
      })
    },
    handleJoinGame: function(){
      this.createButtonShown = false
      this.joinButtonShown = false
      this.joinInputShown = false
      this.bindSocketEvents(this.joinInputValue)
    },
    bindSocketEvents: function(gameID) {
      this.socket = io(`${serverURL}/${gameID}`);
      this.socket.on('player-number-assigned', (data) => this.playerNumber = data)
      this.socket.on('status-updated', (data) => data === 'ready' ? this.showReadyUpButton() : this.handleStart())
      this.socket.on('simulation-updated', (data) => this.updateMovement(data))
    },
    handleReadyUp: function() {
      this.socket.emit('player-ready')
      this.readyUpButtonShown = false
      document.body.requestPointerLock()
    },
    handleStart: function(){
      this.started = true
      window.addEventListener('click', () => {
        document.body.requestPointerLock()
      })
      window.addEventListener('mousemove', (e) => {
        this.movementX = e.movementX
        this.movementY = e.movementY
      })
      setInterval(() => {
        if(this.movementX === false && this.movementY === false){
          this.socket.emit('player-moved', {x: 0 , y: 0 })
        }else{
          this.socket.emit('player-moved', {x: this.movementX , y: this.movementY })
          this.movementX = false
          this.movementY = false
        }
      }, 0);
    },
    updateMovement: function(data){
      this.assetPositions = data
    }
  }
}
</script>

<style>
  body{
    background: black;
  }
  *{
    box-sizing: border-box;
    color: #fff;
  }
  input{
    color: #000;
  }
  canvas{
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  button{
    background-color: rgba(255,255,255,0.1)
  }
  button:first-child{
    margin-right: 32px;
  }
  .interface{
    padding: 24px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
</style>
