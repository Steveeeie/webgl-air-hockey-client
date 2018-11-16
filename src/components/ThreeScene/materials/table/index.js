import { TextureLoader, MeshStandardMaterial } from 'three'
import environment from '../../environment'
import albedoFile from './table_albedo.jpg'
import metalnessFile from './table_metalness.jpg'
import normalFile from './table_normal.jpg'
import roughnessFile from './table_roughness.jpg'

const albedoMap = new TextureLoader().load(albedoFile)
const metalnessMap = new TextureLoader().load(metalnessFile)
const normalMap = new TextureLoader().load(normalFile)
const roughnessMap = new TextureLoader().load(roughnessFile)
albedoMap.anisotropy = 4

const table = new MeshStandardMaterial({
    envMap: environment,
    map: albedoMap,
    metalness: 1,
    metalnessMap: metalnessMap,
    normalMap: normalMap,
    roughness: 1,
    roughnessMap: roughnessMap,
})

export default table
