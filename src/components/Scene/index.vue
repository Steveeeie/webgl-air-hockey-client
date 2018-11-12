<template>
  <div>
    <div id="three-container"></div>
    <p>{{started}}</p>
    <p>Player Number: {{playerNumber}}</p>
    <p>{{assetPositions}}</p>
  </div>
</template>

<script>
import { WebGLRenderer, PerspectiveCamera, Vector3, Scene } from 'three'
import loadGeometry from './geometry/loadGeometry'
import loadLights from './lights/loadLights'

export default {
  name: 'THREE',
  props: ['assetPositions', 'playerNumber', 'started'],
  data() {
    return {
      cameraRotation: 0,
      cameraSet: false,
      camera: null,
      scene: null,
      renderer: null,
      paddle1: null,
      paddle2: null,
      puck: null,
    }
  },
  methods: {
    init: function() {
      const container = document.getElementById('three-container')
      this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
      this.renderer.setPixelRatio( window.devicePixelRatio * 1.5 )
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
      this.scene = new Scene()
      this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000 )
      loadGeometry(this.scene, this.paddle1, this.paddle2, this.puck)
      loadLights(this.scene)
    },
    animate: function() {
      requestAnimationFrame(this.animate)
      console.log()
      if(!this.cameraSet){
        const inGameCameraPosition = this.playerNumber === 1 ? [ 0, 8, 21 ] : [ 0, 8, -21 ]
        this.player2CameraSet = true
        this.camera.position.set(...inGameCameraPosition)
        this.camera.lookAt( new Vector3(0,-3,0) )
      }
      if(this.started){
        this.puck.position.x = this.assetPositions.puck.x / 2
        this.puck.position.z = this.assetPositions.puck.y / 2
        this.paddle1.position.x = this.assetPositions.paddle1.x / 2
        this.paddle1.position.z = this.assetPositions.paddle1.y / 2
        this.paddle2.position.x = this.assetPositions.paddle2.x / 2
        this.paddle2.position.z = this.assetPositions.paddle2.y / 2
      }else{
        this.cameraRotation += 0.001;
        this.camera.position.y = 10;
        this.camera.position.x = Math.sin(this.cameraRotation) * 20;
        this.camera.position.z = Math.cos(this.cameraRotation) * 20;
        this.camera.lookAt( new Vector3(0,-3,0) )
      }
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted() {
      this.init();
      this.animate()
  }
}
</script>

<style>
  #three-container{
    background-color: #160d21;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
</style>
