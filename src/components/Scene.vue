<template>
  <div>
    <div id="three-container"></div>
    <p>{{started}}</p>
    <p>Player Number: {{playerNumber}}</p>
    <p>{{assetPositions}}</p>
  </div>
</template>

<script>
import { WebGLRenderer, BufferGeometryLoader, PerspectiveCamera, Vector3, Mesh, Scene } from 'three'
import { pointlight1, dirlight1, dirlight2, hemLight1, ambLight1 } from '../lights'
import materials from '../materials'

export default {
  name: 'THREE',
  props: ['assetPositions', 'playerNumber', 'started'],
  data() {
    return {
      player2CameraSet: false,
      camera: null,
      scene: null,
      renderer: null,
      paddle1: null,
      paddle2: null,
      puck: null,
      table: null
    }
  },
  methods: {
    init: function() {

      //Renderer
      const container = document.getElementById('three-container')
      this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
      this.renderer.setPixelRatio( window.devicePixelRatio * 1.5 )
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)

      //Scene
      this.scene = new Scene()

      //Camera
      this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000 )
      this.camera.position.set(0, 8, 21)
      this.camera.lookAt( new Vector3(0,-3,0) )

      //Geometry
      const GeometryLoader = new BufferGeometryLoader()

      GeometryLoader.load('/meshes/table.json', ( geometry ) => {
        this.table = new Mesh( geometry, materials.table );
        this.scene.add( this.table );
      })

      GeometryLoader.load('/meshes/paddle.json', ( geometry ) => {
        this.paddle1 = new Mesh( geometry, materials.accessories );
        this.paddle2 = new Mesh( geometry, materials.accessories );
        this.paddle1.position.z = -8
        this.paddle2.position.z = 8
        this.scene.add( this.paddle1, this.paddle2 );
      })

      GeometryLoader.load('/meshes/puck.json', ( geometry ) => {
        this.puck = new Mesh( geometry, materials.accessories );
        this.scene.add( this.puck );
      })

      //Lights
      this.scene.add(pointlight1, dirlight1, dirlight2, hemLight1, ambLight1)
    },
    animate: function() {
      requestAnimationFrame(this.animate)

      console.log(this.cameraIsSet)

      if(!this.player2CameraSet && this.playerNumber === 2){
        this.player2CameraSet = true
        this.camera.position.set(0, 8, -21)
        this.camera.lookAt( new Vector3(0,-3,0) )
      }

      if(this.started){
        this.puck.position.x = this.assetPositions.puck.x / 2
        this.puck.position.z = this.assetPositions.puck.y / 2
        this.paddle1.position.x = this.assetPositions.paddle1.x / 2
        this.paddle1.position.z = this.assetPositions.paddle1.y / 2
        this.paddle2.position.x = this.assetPositions.paddle2.x / 2
        this.paddle2.position.z = this.assetPositions.paddle2.y / 2
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
