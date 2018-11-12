import { AmbientLight, DirectionalLight, HemisphereLight, PointLight } from 'three'

const loadLights = (scene) => {
    const ambLight1 = new AmbientLight( 0x000000, 0.01 )
    const dirlight1 = new DirectionalLight( 0xffffff, 0.5, 40 )
    const dirlight2 = new DirectionalLight( 0xffffff, 0.5, 40 )
    const hemLight1 = new HemisphereLight( 0xeeeeff, 0x777788, 0.01 )
    const pointlight1 = new PointLight( 0xffffff, 0.5, 15 )
    ambLight1.position.set( 0, 0, 0 )
    dirlight1.position.set( -13.90, 10.00, 19.24 )
    dirlight2.position.set( 13.90, 10.00, -19.24 )
    hemLight1.position.set( 0.5, 1, 0.75 )
    pointlight1.position.set( 0, 3.75, 0 )
    scene.add(ambLight1, hemLight1, pointlight1, dirlight1, dirlight2)
}

export default loadLights