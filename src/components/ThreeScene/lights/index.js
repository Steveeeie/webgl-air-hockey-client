import { AmbientLight, SpotLight, HemisphereLight, PointLight } from 'three'

const ambLight = new AmbientLight(0xffb783, 0.2)
const hemLight1 = new HemisphereLight(0xffffff, 0x777788, 0.3)
const pointlight1 = new PointLight(0xffffff, 0.6)
const spotLight1 = new SpotLight(0xbd5467, 0.2)
const spotLight2 = new SpotLight(0x3c7fff, 0.2)
ambLight.position.set(0, 0, 0)
hemLight1.position.set(0.5, 1, 0.75)
pointlight1.position.set(0, 3.75, 0)
pointlight1.castShadow = true
pointlight1.shadow.mapSize.width = 1024
pointlight1.shadow.mapSize.height = 1024
pointlight1.shadow.camera.near = 0.5
pointlight1.shadow.camera.far = 100
spotLight1.position.set(20, 20, 20)
spotLight1.castShadow = true
spotLight1.shadow.mapSize.width = 1024
spotLight1.shadow.mapSize.height = 1024
spotLight1.shadow.camera.near = 0.5
spotLight1.shadow.camera.far = 100
spotLight2.position.set(-20, 20, -20)
spotLight2.castShadow = true
spotLight2.shadow.mapSize.width = 1024
spotLight2.shadow.mapSize.height = 1024
spotLight2.shadow.camera.near = 0.5
spotLight2.shadow.camera.far = 100

export default [ambLight, hemLight1, pointlight1, spotLight1, spotLight2]
