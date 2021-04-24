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
    for (var i = 0; i < 1000; i++) {

        let randInt = Math.floor(Math.random() * 10)
        let wireframe;
        let geometry;
        switch (randInt) {
            case 0:
                geometry = new THREE.SphereGeometry(4, 20, 20);
                wireframe = new THREE.WireframeGeometry(geometry_sphere)
                break;
            case 1:
                geometry = new THREE.BoxGeometry(1, 1, 1);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;
            case 2:
                geometry = new THREE.CircleGeometry(1, 1, 1);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;
            case 3:
                geometry = new THREE.ConeGeometry(1, 1, 1);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;
            case 4:
                geometry = new THREE.DodecahedronGeometry(1, 1);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;
            case 5:
                geometry = new THREE.IcosahedronGeometry(1, 1);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;
            case 6:
                geometry = new THREE.OctahedronGeometry(1, 1);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;
            case 7:
                geometry = new THREE.PlaneGeometry(1, 1, 1);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;
            case 8:
                geometry = new THREE.RingGeometry(1, 1, 1);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;
            case 9:
                geometry = new THREE.TetrahedronGeometry(1, 1);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;
            case 10:
                geometry = new THREE.TorusGeometry(1, 1, 1, 2);
                wireframe = new THREE.WireframeGeometry(geometry)
                break;


            default:

        }


        var line = new THREE.LineSegments(wireframe);
        line.material.depthTest = false;
        line.material.transparent = false;

        let max = 10;
        let min = -max;
        line.position.set(getRandomArbitrary(min, max), getRandomArbitrary(min, max), getRandomArbitrary(min, max))
        let scale = getRandomArbitrary(1 / 100, 1 / 50)
        line.scale.set(scale / 1000, scale / 1000)

        my_scene.add(meshes[meshes.push(line) - 1]);
        console.log("added new obj")
    }
}

function randomColor(color, obj) {
    let r = ((Math.floor(Math.random() * 255) * color) % 255) / 255;
    let g = (Math.floor(Math.random() * 255) * color) % 255 / 255;
    let b = (Math.floor(Math.random() * 255) * color) % 255 / 255;
    obj.material.color.setRGB(r, g, b)

    // todo change color according to color in use
    //let color4 = new THREE.Color("rgb(100%, 0%, 0%)");
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

function animate() {
    requestAnimationFrame(animate);


    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    bar_count = window.innerWidth / 2;

    analyser.getByteFrequencyData(fbc_array);
    color = fbc_array.reduce(function (accumVariable, curValue) {
        return accumVariable + curValue
    }, 0);
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
    my_renderer.render(my_scene, my_camera);
    counter += 0.02;
}




