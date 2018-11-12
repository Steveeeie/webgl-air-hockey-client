import { BufferGeometryLoader, Mesh } from 'three'
import materials from '../materials'
import tableJSON from './table.json'
import paddleJSON  from './paddle.json'
import puckJSON from './puck.json'

const loadGeometry = (scene, paddle1, paddle2, puck, table) => {
    const GeometryLoader = new BufferGeometryLoader()
    const tableGeometry = GeometryLoader.parse(tableJSON)
    const paddleGeometry = GeometryLoader.parse(paddleJSON)
    const puckGeometry = GeometryLoader.parse(puckJSON)
    table = new Mesh(tableGeometry, materials.table);
    paddle1 = new Mesh(paddleGeometry, materials.accessories);
    paddle2 = new Mesh(paddleGeometry, materials.accessories);
    puck = new Mesh(puckGeometry, materials.accessories);
    scene.add( table, paddle1, paddle2, puck );
}

export default loadGeometry