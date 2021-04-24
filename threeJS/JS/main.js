/*========Erzeugungunserer THREE.js App========*/
const my_scene = new THREE.Scene();
const my_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const my_renderer = new THREE.WebGLRenderer({antialias: true});
my_renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(my_renderer.domElement);


const geometry = new THREE.BoxGeometry();

var cube_materials = [new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('img/mossy_rock_diff_1k.jpg'),
    side: THREE.FrontSide
}), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('img/mossy_rock_diff_1k.jpg'),
    side: THREE.FrontSide
}), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('img/mossy_rock_diff_1k.jpg'),
    side: THREE.FrontSide
}), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('img/mossy_rock_diff_1k.jpg'),
    side: THREE.FrontSide
}), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('img/mossy_rock_diff_1k.jpg'),
    side: THREE.FrontSide
}), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('img/mossy_rock_diff_1k.jpg'),
    side: THREE.FrontSide
})];


const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

const cube = new THREE.Mesh(geometry, cube_materials);

var geometry_sphere = new THREE.SphereGeometry(2, 10, 15);
var material_sphere = new THREE.MeshBasicMaterial({color: 0x0011ff});
var sphere = new THREE.Mesh(geometry_sphere, wireframe);

var wireframe = new THREE.WireframeGeometry(geometry_sphere)


var line = new THREE.LineSegments(wireframe);
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = false;

my_scene.add(line);
my_scene.add(cube);

my_camera.position.z = 10;
let counter = 0;
let color = 0x000000;
let flag = 1;

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    line.rotation.x += 0.01;
    line.rotation.y += 0.01;
    cube.scale.x = Math.sin(counter) + 2
    color += flag;
    console.log(parseInt(color, 16))
    if ((parseInt(color, 16) % 999999) === 0)
        flag = -1

    if ((parseInt(color, 16) % 88888) === 0) flag = 1
    line.material.color.setHex(color)
    cube.scale.y = Math.sin(counter) + 2
    cube.scale.z = Math.sin(counter) + 2


    line.scale.x = -Math.sin(counter) / 10 + 1
    line.scale.y = -Math.sin(counter) / 10 + 1
    line.scale.z = -Math.sin(counter) / 10 + 1


    cube.position.x = Math.sin(counter) * Math.PI
    cube.position.y = -Math.sin(counter) * Math.PI
    cube.position.z = Math.sin(counter) * Math.PI
    //cube.position.y = -Math.sin(counter)


    my_renderer.render(my_scene, my_camera);
    counter += 0.02;
}

animate();