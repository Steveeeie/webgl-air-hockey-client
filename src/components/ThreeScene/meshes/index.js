import { BufferGeometryLoader, Mesh } from 'three'
import materials from '../materials'
import tableJSON from './table.json'
import paddleJSON from './paddle.json'
import puckJSON from './puck.json'

const GeometryLoader = new BufferGeometryLoader()

export const table = new Mesh(GeometryLoader.parse(tableJSON), materials.table)
export const paddle1 = new Mesh(GeometryLoader.parse(paddleJSON), materials.accessories)
export const paddle2 = new Mesh(GeometryLoader.parse(paddleJSON), materials.accessories)
export const puck = new Mesh(GeometryLoader.parse(puckJSON), materials.accessories)