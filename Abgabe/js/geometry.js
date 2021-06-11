class Geometry {

    translateZ(_obj, _value) {
        _obj.position.z = _value;
    }

    translateY(_obj, _value) {
        _obj.position.y = _value;
    }

    translateX(_obj, _value) {
        _obj.position.x = _value;
    }

    scaleZ(_obj, _value) {
        _obj.scale.z = _value;
    }

    scaleY(_obj, _value) {
        _obj.scale.y = _value;
    }

    scaleX(_obj, _value) {
        _obj.scale.x = _value;
    }

    addBoxGeometry(_width, _height, _depth, _widthSegments = 4, _heightSegments = 4, _depthSegments = 4, _color = "black") {
        let geometryBox = new THREE.BoxGeometry(
            _width, _height, _depth,
            _widthSegments, _heightSegments, _depthSegments);
        var materialBox = new THREE.MeshBasicMaterial({color: this.simpleColor(_color)});
        var box = new THREE.Mesh(geometryBox, materialBox);
        this.addToScene(box);
        return box;
    }

    simpleColor(_color = "white") {
        let colorValue = 0xfff;
        switch (_color) {
            case "black":
                colorValue = 0x000;
                break;
            default:
                colorValue = 0xffffff;
        }
        return colorValue;
    }


    addToScene(_obj) {
        meshes.push(_obj);
        scene.add(_obj);
    }
}

function addMesh() {
    /*var geometry_sphere = new THREE.SphereGeometry(2, 10, 15);
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
    
     */
    let box = new Geometry();
    box.addBoxGeometry(1, 1, 1).translateZ(-6)

}
