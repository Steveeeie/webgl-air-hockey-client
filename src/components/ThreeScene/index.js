import React, { Component } from 'react'
import { WebGLRenderer, PerspectiveCamera, Vector3, Scene, PCFSoftShadowMap, Color, Fog } from 'three'
import { puck, paddle1, paddle2, table } from './meshes'
import lights from './lights'
import Styles from './styles.module.css'

class ThreeScene extends Component {
    componentDidMount() {
        this.runThreeScene()
    }

    runThreeScene() {

        //Renderer
        const container = document.getElementById('three-container')
        const renderer = new WebGLRenderer({ alpha: true, antialias: true })
        container.appendChild(renderer.domElement)
        renderer.setPixelRatio(window.devicePixelRatio * 0.75)
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = PCFSoftShadowMap

        //Scene
        const scene = new Scene()
        const fogColor = new Color(0x160d21)
        scene.background = fogColor;
        scene.fog = new Fog(fogColor, 0.0025, 70);
        scene.add(puck, paddle1, paddle2, table, ...lights)

        //Camera
        const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
        let cameraRotation = 0
        let cameraSet = false

        const animate = () => {
            const { started, playerNumber, assetPositions } = this.props
            requestAnimationFrame(animate)
            if (started) {
                if (!cameraSet) {
                    const cameraPositionZ = playerNumber === 1 ? 21 : -21
                    cameraSet = true
                    camera.position.set(0, 8, cameraPositionZ)
                    camera.lookAt(new Vector3(0, -3, 0))
                }
                puck.position.x = assetPositions.puck.x / 2
                puck.position.z = assetPositions.puck.y / 2
                paddle1.position.x = assetPositions.paddle1.x / 2
                paddle1.position.z = assetPositions.paddle1.y / 2
                paddle2.position.x = assetPositions.paddle2.x / 2
                paddle2.position.z = assetPositions.paddle2.y / 2
            } else {
                cameraRotation += 0.0025
                camera.position.y = 10
                camera.position.x = Math.sin(cameraRotation) * 20
                camera.position.z = Math.cos(cameraRotation) * 20
                camera.lookAt(new Vector3(0, -3, 0))
            }
            renderer.render(scene, camera)
        }

        animate()
    }

    render() {
        return <div id="three-container" className={Styles.ThreeScene} />
    }
}

export default ThreeScene