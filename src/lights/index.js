import { AmbientLight, DirectionalLight, HemisphereLight, PointLight } from 'three'

export const pointlight1 = new PointLight( 0xffffff, 0.5, 15 );
pointlight1.position.set( 0, 3.75, 0 );

export const dirlight1 = new DirectionalLight( 0xffffff, 0.5, 40 );
dirlight1.position.set( -13.90, 10.00, 19.24 );

export const dirlight2 = new DirectionalLight( 0xffffff, 0.5, 40 );
dirlight2.position.set( 13.90, 10.00, -19.24 );

export const hemLight1 = new HemisphereLight( 0xeeeeff, 0x777788, 0.01 );
hemLight1.position.set( 0.5, 1, 0.75 );

export const ambLight1 = new AmbientLight( 0x000000, 0.01 );
ambLight1.position.set( 0, 0, 0 );
