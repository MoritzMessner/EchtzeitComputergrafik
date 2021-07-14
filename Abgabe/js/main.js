import {ARButton} from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';




//init();
function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 60);
    //camera.position.z = 30;


    // enable and setup Renderer
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // Wir müssen den Renderer für WebXR aktivieren
    container.appendChild(renderer.domElement);

    // Add light
    var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // Add XR Buttons
    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);





    document.body.appendChild(ARButton.createButton(renderer));

    window.addEventListener('resize', onWindowResize, false);
    fft()
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
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);

    analyser.getByteFrequencyData(dataArray);
    let lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
    let lowerFourthArray = lowerHalfArray.slice(0, (lowerHalfArray.length / 4) - 1);
    let upperHalfArray = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

    let overallAvg = avg(dataArray);
    let lowerMax = max(lowerHalfArray);
    let lowerAvg = avg(lowerHalfArray);
    let upperMax = max(upperHalfArray);
    let upperAvg = avg(upperHalfArray);

    let lowerMaxFr = lowerMax / lowerHalfArray.length;
    let lowerAvgFr = lowerAvg / lowerHalfArray.length;
    let upperMaxFr = upperMax / upperHalfArray.length;
    let upperAvgFr = upperAvg / upperHalfArray.length;

    for (let element of meshes) {
        element.rotation.y += -0.001;
        element.rotation.y += -0.0001 * getAmountOfMaxValues(lowerHalfArray, 200);
        distortSurface(element, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 7), modulate(upperAvgFr, 0, 1, 0, 3));
    }
    //meshes[0].material.color.setRGB(lowerMax, overallAvg,100)
    //randomColor(lowerHalfArray, upperHalfArray, ball)

}

function randomColor(lowerHalfArray, upperHalfArray, obj) {

    let factor = 500;
    let lowerAmount = getAmountOfMaxValues(lowerHalfArray, 100)
    let upperAmount = getAmountOfMaxValues(upperHalfArray, 100);
    if (lowerAmount < upperAmount) {
        let r = upperAmount * (Math.random() + 1) % 125;
        let g = upperAmount * (Math.random() + 1) % 125;
        let b = upperAmount * (Math.random() + 1) % 125;
        console.log(r, g, b);
        obj.material.color.setRGB(r, g, b)
    } else {
        let r = lowerAmount * (Math.random() + 1) % 100;
        let g = lowerAmount * (Math.random() + 1) % 100;
        let b = lowerAmount * (Math.random() + 1) % 100;
        console.log(r, g, b);
        obj.material.color.setRGB(r, g, b)
    }


    // todo change color according to color in use
    //let color4 = new THREE.Color("rgb(100%, 0%, 0%)");
}
function removeEntity(uuid) {
    const object = scene.getObjectByProperty( 'uuid', uuid );
    object.geometry.dispose();
    object.material.dispose();
    scene.remove( object );
    renderer.renderLists.dispose();
    renderer.setAnimationLoop(null);
    renderer.setAnimationLoop(render);


}
export {init,removeEntity};
