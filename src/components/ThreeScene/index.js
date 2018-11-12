import React, { Component } from 'react'
import { WebGLRenderer, PerspectiveCamera, Vector3, Scene } from 'three'
import { puck, paddle1, paddle2, table } from './meshes'
import lights from './lights'
import Styles from './styles.module.css'

class ThreeScene extends Component {
    componentDidMount() {
        this.runThreeScene()
    }

    runThreeScene() {
        let cameraRotation = 0
        let cameraSet = false
        const container = document.getElementById('three-container')
        const renderer = new WebGLRenderer({ alpha: true, antialias: true })
        const scene = new Scene()
        const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
        paddle1.position.z = -8
        paddle2.position.z = 8
        scene.add(puck, paddle1, paddle2, table, ...lights)
        renderer.setPixelRatio(window.devicePixelRatio * 1.5)
        renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(renderer.domElement)

        const animate = () => {
            const { started, playerNumber, assetPositions } = this.props
            requestAnimationFrame(animate);
            if (started) {
                if (!cameraSet) {
                    const cameraPositionZ = playerNumber === 1 ? 21 : -21
                    cameraSet = true
                    camera.position.set(0, 8, cameraPositionZ);
                    camera.lookAt(new Vector3(0, -3, 0))
                }
                puck.position.x = assetPositions.puck.x / 2
                puck.position.z = assetPositions.puck.y / 2;
                paddle1.position.x = assetPositions.paddle1.x / 2;
                paddle1.position.z = assetPositions.paddle1.y / 2;
                paddle2.position.x = assetPositions.paddle2.x / 2;
                paddle2.position.z = assetPositions.paddle2.y / 2
            }else{
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