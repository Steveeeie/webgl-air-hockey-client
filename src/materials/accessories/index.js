import { TextureLoader, MeshStandardMaterial } from 'three'
import environment from '../../environment'

import albedoFile from './accessories_albedo.jpg'
import roughnessFile from './accessories_roughness.jpg'
import normalFile from './accessories_normal.jpg'

//Albedo Map
const albedoMap = new TextureLoader().load( albedoFile )

//Roughness Map
const roughnessMap = new TextureLoader().load( roughnessFile )

//Normal Map
const normalMap = new TextureLoader().load( normalFile )

//Material
const accessories = new MeshStandardMaterial({
  envMap: environment,
  map: albedoMap,
  metalness: 0,
  normalMap: normalMap,
  roughness: 1.5,
  roughnessMap: roughnessMap
})

export default accessories
