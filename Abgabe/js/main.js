import {ARButton} from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';


let loader; // Wir müssen eine Variable für einen gltf-Modell-Loader erstellen

let counter = 0;
let color = 0x00000;
let flag = 1;
var ball;
init();
animate();
fft()

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // Wir müssen den Renderer für WebXR aktivieren
    container.appendChild(renderer.domElement);

    var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);
    ball = addMesh();

    /*   // URL zum jeweiligen Objekt
       const modelUrl = "./model/Snickers.glb";

       // Erstellung  GLTF-Ladeobjekt. GLTF ist ein 3D-Modellformat, das üblicherweise als das "JPEG von 3D" bezeichnet wird, weil es schnell und effizient zu verwenden ist, was ideal für das Web ist
       loader = new THREE.GLTFLoader();

       // Laden des Modells
       // loader takes in a few arguments loader(model url, onLoad callback, onProgress callback, onError callback)
       loader.load(
           // URL
           modelUrl,
           // onLoad callback: Was aufgerufen wird, sobald das vollständige Modell geladen ist.
           function (gltf) {
               // Die gltf.scene enthält die Objektgruppe Three.js, die das 3D-Objekt des Modells darstellt.
               scene.add(gltf.scene);
               meshes.push(gltf.scene);
               console.log("Modell wurde der Szene hinzugefügt!");

               gltf.scene.position.z = -0.25;
           },
       );

     */


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
}

function render() {

    analyser.getByteFrequencyData(dataArray);
    var lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
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
    makeRoughBall(ball, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8), modulate(upperAvgFr, 0, 1, 0, 4));
}

function makeRoughBall(mesh, bassFr, treFr) {
    console.log(mesh);
    mesh.geometry.vertices.forEach(function (vertex, i) {
        var offset = mesh.geometry.parameters.radius;
        var amp = 7;
        var time = window.performance.now();
        vertex.normalize();
        var rf = 0.00001;
        var distance = (offset + bassFr) + noise3D(vertex.x + time * rf * 7, vertex.y + time * rf * 8, vertex.z + time * rf * 9) * amp * treFr;
        vertex.multiplyScalar(distance);
    });
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
}