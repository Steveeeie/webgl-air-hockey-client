import { BufferGeometryLoader, Mesh, PlaneGeometry } from 'three'
import materials from '../materials'
import tableJSON from './table.json'
import paddleJSON from './paddle.json'
import puckJSON from './puck.json'

const floorGeometry = new PlaneGeometry( 100, 100, 1 )
const GeometryLoader = new BufferGeometryLoader()
const table = new Mesh(GeometryLoader.parse(tableJSON), materials.table)
const paddle1 = new Mesh(GeometryLoader.parse(paddleJSON), materials.accessories)
const paddle2 = new Mesh(GeometryLoader.parse(paddleJSON), materials.accessories)
const puck = new Mesh(GeometryLoader.parse(puckJSON), materials.accessories)
const floor = new Mesh(floorGeometry, materials.floor)

floor.rotation.x = Math.PI / 2
floor.position.y = -7
floor.receiveShadow = true
table.castShadow = true
table.receiveShadow = true
paddle1.castShadow = true
paddle1.receiveShadow = true
paddle1.position.z = -8
paddle2.castShadow = true
paddle2.receiveShadow = true
paddle2.position.z = 8
puck.castShadow = true
puck.receiveShadow = true

export { table, paddle1, paddle2, puck, floor }