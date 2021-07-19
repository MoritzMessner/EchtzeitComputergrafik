import {ARButton} from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
import {Scene} from "./components/Scene.js";
import {Audio} from "./systems/Audio.js";
import {Geometry} from "./components/Geometry.js";
import {Renderer} from "./components/Renderer.js";

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 60);
    camera.lookAt(0, 0, -6);
    // enable and setup Renderer
    renderer = new Renderer();
    renderer.setPixelRatio();
    renderer.setSize();
    renderer.xr(true);
    container.appendChild(renderer.getRenderer().domElement);

    // Add light
    let light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);

    // Add XR Buttons
    controller = renderer.getRenderer().xr.getController(0);
    scene.addToScene(light)
    scene.addToScene(controller)

    document.body.appendChild(ARButton.createButton(renderer.getRenderer()));
    window.addEventListener('resize', onWindowResize, false);
    controller.addEventListener('select', onSelect);


    controls = new THREE.OrbitControls( camera, renderer.getRenderer().domElement );


    // start the audio
    Audio.init();
    animate();
}


function onSelect() {
    //Todo

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.getRenderer().setAnimationLoop(render);
}

function render() {
    controls.update();
    renderer.getRenderer().render(scene.getScene(), camera);

    Audio.getAnalyser().getByteFrequencyData(Audio.getDataArray());

    let lowerHalfArray = Audio.getLowerHalf();
    let upperHalfArray = Audio.getUpperHalf();

    let overallAvg = avg(Audio.getDataArray());
    let lowerMax = max(lowerHalfArray);
    let lowerAvg = avg(lowerHalfArray);
    let upperMax = max(upperHalfArray);
    let upperAvg = avg(upperHalfArray);

    let lowerMaxFr = lowerMax / lowerHalfArray.length;
    let lowerAvgFr = lowerAvg / lowerHalfArray.length;
    let upperMaxFr = upperMax / upperHalfArray.length;
    let upperAvgFr = upperAvg / upperHalfArray.length;

    let flag = -1;
    for (let element of scene.getMeshes()) {
        element.rotation.z += -0.001 * getAmountOfMaxValues(lowerHalfArray, 200) * flag;
        Geometry.distortSurface(element, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 7), modulate(upperAvgFr, 0, 1, 0, 3));
    }

}


export {init};
