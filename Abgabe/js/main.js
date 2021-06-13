import {ARButton} from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';

var noise = new SimplexNoise();
let ball;
init();
fft()
animate();

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

    // Add Mesh
    ball = addMesh();
    ball.material.color.setRGB(255, 255, 255)
    ball.scale.x = ball.scale.y = ball.scale.z = 1.1;
    let ballTwo = addMesh();
    ballTwo.material.color.setRGB(0, 0, 0);
    ballTwo.rotation.y = Math.random() * 100;

    //let ball1 = addMesh();
    //ball1.material.color.setRGB(200, 0, 0)

    //ball.position.z = -6;


    document.body.appendChild(ARButton.createButton(renderer));

    window.addEventListener('resize', onWindowResize, false);
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
    //requestAnimationFrame(render);
}

function render() {
    renderer.render(scene, camera);

    analyser.getByteFrequencyData(dataArray);
    var lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
    var lowerFourthArray = lowerHalfArray.slice(0, (lowerHalfArray.length / 4) - 1);
    var upperHalfArray = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

    var overallAvg = avg(dataArray);
    var lowerMax = max(lowerHalfArray);
    var lowerAvg = avg(lowerHalfArray);
    var upperMax = max(upperHalfArray);
    var upperAvg = avg(upperHalfArray);

    var lowerMaxFr = lowerMax / lowerHalfArray.length;
    var lowerAvgFr = lowerAvg / lowerHalfArray.length;
    var upperMaxFr = upperMax / upperHalfArray.length;
    var upperAvgFr = upperAvg / upperHalfArray.length;

    //console.log("lowerMax: " + lowerMax);
    //console.log("lowerAvg: " + lowerAvg);
    //console.log("upperMax: " + upperMax);
    //console.log("upperAvg: " + upperAvg);
    //console.log("lowerFourthArray: "+lowerFourthArray);
    for (let element of meshes) {
        element.rotation.y += -0.001;
        element.rotation.y += -0.0001 * getAmountOfMaxValues(lowerHalfArray, 200);

        // console.log(ball.geometry);
        //console.log(ball.geometry.isBufferGeometry);
        makeRoughBall(element, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8), modulate(upperAvgFr, 0, 1, 0, 4));

    }
    //randomColor(lowerHalfArray, upperHalfArray, ball)

}

function randomColor(lowerHalfArray, upperHalfArray, obj) {

    let factor = 500;
    let lowerAmount = getAmountOfMaxValues(lowerHalfArray, 100)
    let upperAmount = getAmountOfMaxValues(upperHalfArray, 100);
    if (lowerAmount < upperAmount) {
        let r = upperAmount * (Math.random() + 1) % 125 ;
        let g = upperAmount * (Math.random() + 1) % 125 ;
        let b = upperAmount * (Math.random() + 1) % 125 ;
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

function makeRoughBall(mesh, bassFr, treFr) {
    /*
        const position = mesh.geometry.attributes.position;
        //console.log(mesh.geometry);
        for (let i = 0, l = position.count; i < l; i++) {
            let vertex = new THREE.Vector3(position.getX(i), position.getY(i), position.getZ(i));
            vertex.fromBufferAttribute(position, i);
            //vertex.applyMatrix4(mesh.matrixWorld);
            let offset = mesh.geometry.parameters.radius;
            let amp = 7;
            let time = window.performance.now();
            vertex.normalize();
            let rf = 0.00001;
            let distance = (offset + bassFr) + noise.noise3D(vertex.x + time * rf * 7, vertex.y + time * rf * 8, vertex.z + time * rf * 9) * amp * treFr;
            //console.log(vertex.x);
            vertex.multiplyScalar(distance);
            mesh.localToWorld(vertex);
            //mesh.geometry.attributes.position.setXYZ(i,  vertex.x,vertex.y,vertex.z);

        }
    */
    mesh.geometry.vertices.forEach(function (vertex, i) {
        var offset = mesh.geometry.parameters.radius;
        var amp = 7;
        var time = window.performance.now();
        vertex.normalize();
        var rf = 0.0001;
        var distance = ((offset + bassFr) + noise.noise3D((vertex.x + time * rf * 7) / 2, (vertex.y + time * rf * 8) / 2, (vertex.z + time * rf * 9) / 2) * amp * treFr);
        vertex.multiplyScalar(Math.abs(distance / 6));
    });


    //position.needsUpdate = true;
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();

}