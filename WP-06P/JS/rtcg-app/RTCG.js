import {createCamera} from './components/camera.js';
import { createPlane, createCube, createSphere, createCylinder} from './components/geometry.js';
import {createScene} from './components/scene.js';
import {createRenderer} from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';


let camera;
let renderer;
let scene;

class RTCG {
    // 1.Erstellung einer Instanz der RTCG-App
    constructor(container) {


        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        const controls = new OrbitControls(camera, container);
        controls.target.set(0, 5, 0);
        controls.update();

        container.append(renderer.domElement);


        const cube = createSphere(3,30,30,"blue",0.5);
        cube.position.set(0, 3, 0);

        scene.add(cube);

        camera.lookAt(cube.position)
        const plane = createPlane(30,30,64,"grey",0);
        plane.position.set(0, 0, 0);
        plane.rotation.x = -Math.PI / 2;

        scene.add(plane);



        const resizer = new Resizer(container, camera, renderer);
        resizer.nowResize = () => {
            this.render()
        }
    }

    //2.Rendering der Szene
    render() {

        // Rendering -> einzelner Frame
        renderer.render(scene, camera);

        renderer.setAnimationLoop(this.animate);
    }

    animate() {
        scene.children[1].rotation.y += 0.01;

        renderer.render(scene, camera);
    }

}


export {RTCG};
