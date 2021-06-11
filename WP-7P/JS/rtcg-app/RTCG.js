import {createCamera} from './components/camera.js';
import {createPlane, createCube, createSphere, createCylinder} from './components/geometry.js';
import {createScene} from './components/scene.js';
import {createRenderer} from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {Anim_loop} from './systems/Anim_loop.js'

let camera;
let renderer;
let scene;
let anim_loop;

class RTCG {
    // 1.Erstellung einer Instanz der RTCG-App
    constructor(container) {


        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();


        anim_loop = new Anim_loop(camera, scene, renderer);
        container.append(renderer.domElement);
        const cube = createCube(11,11,11,"blue",1);
        //const {ambient_Light, main_Light} = createLighting();

        anim_loop.animated_objects.push(cube);

        scene.add(cube);
        const resizer = new Resizer(container, camera, renderer);
        camera.lookAt(cube.position)

    }

    //2.RenderingderSzene
    render() {
        //Rendering->einzelnerFrame
        renderer.render(scene, camera);
    }

    start() {
        anim_loop.start();
    }

    stop() {
        anim_loop.stop();
    }
}


export {RTCG};
