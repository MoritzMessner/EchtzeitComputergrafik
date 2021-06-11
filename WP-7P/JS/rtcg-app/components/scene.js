import {Color, Scene,AmbientLight,HemisphereLight,DirectionalLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js ';

function createScene() {
    const scene = new Scene();
    //scene.background = new Color('skyblue');
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    light.castShadow = true;
    light.shadow.mapSize.x = 4096;
    light.shadow.mapSize.y = 4096;
    scene.add(light);
    scene.add(light.target);

    return scene;
}

export {createScene};