import { TextureLoader, MeshStandardMaterial } from 'three'
import environment from '../../environment'

import albedoFile from './table_albedo.jpg'
import metalnessFile from './table_metalness.jpg'
import roughnessFile from './table_roughness.jpg'
import normalFile from './table_normal.jpg'

const anisotropy = 4;

//Albedo Map
const albedoMap = new TextureLoader().load( albedoFile )
albedoMap.anisotropy = anisotropy

//Metalness Map
const metalnessMap = new TextureLoader().load( metalnessFile )
metalnessMap.anisotropy = anisotropy

//Roughness Map
const roughnessMap = new TextureLoader().load( roughnessFile )
roughnessMap.anisotropy = anisotropy

//Normal Map
const normalMap = new TextureLoader().load( normalFile )
normalMap.anisotropy = anisotropy

//Material
const table = new MeshStandardMaterial({
  envMap: environment,
  map: albedoMap,
  metalness: 0.9,
  metalnessMap: metalnessMap,
  normalMap: normalMap,
  roughness: 1.5,
  roughnessMap: roughnessMap
})

export default table
