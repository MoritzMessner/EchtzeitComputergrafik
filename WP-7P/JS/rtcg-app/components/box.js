import {
    BoxBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    SphereGeometry,
    PlaneGeometry,
    MeshPhongMaterial
} from 'https://unpkg.com/three@0.127.0/build/three.module.js ';

function createCube() {
    //ERstellung der Geometrie
    const geometry = new BoxBufferGeometry(2, 2, 2);
    //ERstellung des Standard Basis materials
    const material = new MeshPhongMaterial();
    //Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const cube = new Mesh(geometry, material);

    return cube;
}

function createSphere() {
    const geometry = new SphereGeometry(2, 6, 6);
    const material = new MeshPhongMaterial({color: '#8AC'});
    const sphere = new Mesh(geometry, material);
    return sphere;
}

function createPlane() {
    const geometry = new PlaneGeometry(100, 1, 100);
    const material = new MeshBasicMaterial({color: 0x000});
    const plane = new Mesh(geometry, material)
    return plane;
}

export {createCube, createSphere, createPlane};
