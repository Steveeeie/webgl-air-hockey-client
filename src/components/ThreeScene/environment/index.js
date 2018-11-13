import { CubeTextureLoader } from 'three'
import px from './px.png'
import nx from './nx.png'
import py from './py.png'
import ny from './ny.png'
import pz from './pz.png'
import nz from './nz.png'

export default new CubeTextureLoader().load([px, nx, py, ny, pz, nz])
