import {ARButton} from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';

let camera, scene, renderer;
let controller;
let loader; // Wir müssen eine Variable für einen gltf-Modell-Loader erstellen
let meshes = [];
let counter = 0;
let color = 0x00000;
let flag = 1;
init();
animate();

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

    var geometry_sphere = new THREE.SphereGeometry(2, 10, 15);
    var material_sphere = new THREE.MeshBasicMaterial({color: 0x0011ff});
    var sphere = new THREE.Mesh(geometry_sphere, wireframe);

    var wireframe = new THREE.WireframeGeometry(geometry_sphere)


    var line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = false;

    scene.add(line);

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
    renderer.render(scene, camera);
    //fbc_array = new Uint8Array(analyser.frequencyBinCount);
    //bar_count = window.innerWidth / 2;

    //analyser.getByteFrequencyData(fbc_array);
    /*color = fbc_array.reduce(function (accumVariable, curValue) {
        return accumVariable + curValue
    }, 0);*/
    color  = getRandomArbitrary(-10,10);
    for (var i = 0; i < meshes.length; i++) {

        // manipulate mesh
        randomColor(color, meshes[i])
        rotate(i);
        scale(i);

        //meshes[i].position.y = -4 +i;
        meshes[i].position.x += getRandomArbitrary(-2, 2) * Math.sin(counter) / (color / 1000)
        meshes[i].position.y += getRandomArbitrary(-2, 2) * Math.sin(counter) / (color / 1000)
        meshes[i].position.z += getRandomArbitrary(-2, 2) * Math.sin(counter) / (color / 1000)

        /* for (var i = 0; i < bar_count; i++) {
             bar_pos = i * 4;
             bar_width = 2;
             bar_height = -(fbc_array[i] / 2);

             //x.fillRect(bar_pos, canvas.height, bar_width, bar_height);
         }*/
    }
    counter += 0.02;
    console.log(counter)

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function rotate(i) {
    let randRot = getRandomArbitrary(1, 10) / 100;
    let x = color % randRot * color / 1000;
    let y = color % randRot * color / 1000;
    let z = color % randRot * color / 1000;

    meshes[i].rotation.x += x;
    meshes[i].rotation.y += y;
    meshes[i].rotation.z += z;

}

function scale(i) {
    let randScale = (color / 900000) * Math.random(); //getRandomArbitrary(-color / 200000, color / 200000) / 20;
    meshes[i].scale.x = randScale;
    meshes[i].scale.y = randScale;
    meshes[i].scale.z = randScale;
}
