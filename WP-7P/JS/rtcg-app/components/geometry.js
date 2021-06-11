import {
    FrontSide,
    TextureLoader,
    CylinderGeometry,
    SphereBufferGeometry,
    BoxBufferGeometry,
    PlaneBufferGeometry,
    Mesh,
    MeshStandardMaterial,
    Color,
    MeshBasicMaterial
} from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createPlane(width, height, segments, color, roughness) {

    // ERstellung der Geometrie
    const geometry = new PlaneBufferGeometry(width, height, segments);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();

    material.color = new Color(color);

    material.roughness = roughness;


    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const plane = new Mesh(geometry, material);

    return plane;
}

function createCube(width, height, depth, color, roughness) {

    // ERstellung der Geometrie
    const geometry = new BoxBufferGeometry(width, height, depth);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();

    material.color = new Color(color);

    material.roughness = roughness;

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const cube = new Mesh(geometry, material);

    cube.rotation.set(-0.3, -0.2, 0.6);
    //AufrufeinmalproFrame
    cube.tick = (delta) => {//ErhöhungderWerteproFrame
        cube.rotation.z += 0.01;
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    };

    return cube;
}

function createSphere(radius, widthSegments, heightSegments, color, roughness) {

    // ERstellung der Geometrie
    const geometry = new SphereBufferGeometry(radius, widthSegments, heightSegments);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();

    material.color = new Color(color);

    material.roughness = roughness;

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const sphere = new Mesh(geometry, material);

    return sphere;
}

function createCylinder(radiusTop, radiusBottom, height, radialSegments, heightSegments, color, roughness) {

    // ERstellung der Geometrie
    const geometry = new CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();

    material.color = new Color(color);

    material.roughness = roughness;

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const cylinder = new Mesh(geometry, material);

    return cylinder;
}

export {createPlane, createCube, createSphere, createCylinder};