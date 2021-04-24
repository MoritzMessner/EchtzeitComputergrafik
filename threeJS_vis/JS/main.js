/*========Erzeugungunserer THREE.js App========*/
var meshes = new Array();
const my_scene = new THREE.Scene();
const my_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const my_renderer = new THREE.WebGLRenderer({antialias: true});
my_renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(my_renderer.domElement);


const geometry = new THREE.BoxGeometry();


const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

const cube = new THREE.Mesh(geometry, material);

var geometry_sphere = new THREE.SphereGeometry(2, 20, 20);
//var geometry_sphere = new THREE.BoxGeometry();
var material_sphere = new THREE.MeshBasicMaterial({color: 0x0011ff});
var sphere = new THREE.Mesh(geometry_sphere, wireframe);

var wireframe = new THREE.WireframeGeometry(geometry_sphere)


var line = new THREE.LineSegments(wireframe);
line.material.depthTest = false;
//line.material.opacity = 0.25;
line.material.transparent = false;

//my_scene.add(line);
//my_scene.add(cube);

my_camera.position.z = 10;
let counter = 0;
let color = 0xFFFFFF;
let flag = 1;


function addCube() {
    var geometry_sphere = new THREE.SphereGeometry(2, 20, 20);
//var geometry_sphere = new THREE.BoxGeometry();
    var material_sphere = new THREE.MeshBasicMaterial({color: 0x0011ff});
    var sphere = new THREE.Mesh(geometry_sphere, wireframe);

    var wireframe = new THREE.WireframeGeometry(geometry_sphere)


    var line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.transparent = false;
    line.position.x = getRandomArbitrary(-5,5);
    line.position.y = getRandomArbitrary(-5,5);
    line.position.z = getRandomArbitrary(-5,5);
    line.scale.x = getRandomArbitrary(-5, 5);
    line.scale.y = getRandomArbitrary(-5, 5);
    line.scale.z = getRandomArbitrary(-5, 5);

    my_scene.add(meshes[meshes.push(line) - 1]);
    console.log("added new obj")
}

function animate() {
    requestAnimationFrame(animate);


    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    bar_count = window.innerWidth / 2;

    analyser.getByteFrequencyData(fbc_array);
    color = fbc_array.reduce(function (accumVariable, curValue) {
        return accumVariable + curValue
    }, 0);
    for (var i = 0; i < meshes.length; i++) {
        meshes[i].material.color.setHex(color)
        meshes[i].rotation.x += color / 1000000;
        meshes[i].rotation.y += color / 1000000;
        meshes[i].rotation.z += color / 1000000;

        meshes[i].scale.x = color / 50000 ;
        meshes[i].scale.y = color / 50000;
        meshes[i].scale.z = color / 50000;

        //meshes[i].position.y = -4 +i;
        meshes[i].position.x += getRandomArbitrary(-2, 2) * Math.sin(counter)/(color / 1000)
        meshes[i].position.y += getRandomArbitrary(-2, 2) *Math.sin(counter)/(color / 1000)
        meshes[i].position.z += getRandomArbitrary(-2, 2) *Math.sin(counter)/(color / 1000)

       /* for (var i = 0; i < bar_count; i++) {
            bar_pos = i * 4;
            bar_width = 2;
            bar_height = -(fbc_array[i] / 2);

            //x.fillRect(bar_pos, canvas.height, bar_width, bar_height);
        }*/
    }
    my_renderer.render(my_scene, my_camera);
    counter += 0.02;
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


