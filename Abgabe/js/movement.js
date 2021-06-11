function addMesh() {
    var geometry_sphere = new THREE.SphereGeometry(2, 10, 15);
    var material_sphere = new THREE.MeshBasicMaterial({color: 0x0011ff});
    var sphere = new THREE.Mesh(geometry_sphere, wireframe);

    var wireframe = new THREE.WireframeGeometry(geometry_sphere)


    var line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = false;

    line.position.z = -6;
    line.material.color.setRGB(0, 0, 0)
    meshes.push(line);
    scene.add(line);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function rotate(i) {
    //let randRot = getRandomArbitrary(1, 10) / 100;
    /*let x = color % randRot * color ;
    let y = color % randRot * color ;
    let z = color % randRot * color ;*/
    let x = 0.01;
    let y = 0.01;
    let z = 0.01;

    meshes[i].rotation.x += x;
    meshes[i].rotation.y += y;
    meshes[i].rotation.z += z;

}


function randomColor(color, obj) {
    let r = ((Math.floor(Math.random() * 255) * color) % 255) / 255;
    let g = (Math.floor(Math.random() * 255) * color) % 255 / 255;
    let b = (Math.floor(Math.random() * 255) * color) % 255 / 255;
    obj.material.color.setRGB(r, g, b)

    // todo change color according to color in use
    //let color4 = new THREE.Color("rgb(100%, 0%, 0%)");
}

function scale(i) {
    //let randScale = (color / 900000) * Math.random(); //getRandomArbitrary(-color / 200000, color / 200000) / 20;
    //meshes[i].scale.x = randScale;
    //meshes[i].scale.y = randScale;
    //meshes[i].scale.z = randScale;

    let randScale = getRandomArbitrary(-0.1,0.1);
    meshes[i].scale.x += randScale;
    meshes[i].scale.y += randScale;
    meshes[i].scale.z += randScale;
}
