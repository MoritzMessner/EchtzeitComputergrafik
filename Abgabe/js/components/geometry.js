
var noise = new SimplexNoise();


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

    additiveRotationZ(_obj, _value) {
        _obj.rotation.z += _value;
    }

    additiveRotationY(_obj, _value) {
        _obj.rotation.y += _value;
    }

    additiveRotationX(_obj, _value) {
        _obj.rotation.x += _value;
    }

    addBoxGeometry(_width, _height, _depth, _widthSegments = 4, _heightSegments = 4, _depthSegments = 4, _color = "black") {
        let geometryBox = new THREE.BoxGeometry(
            _width, _height, _depth,
            _widthSegments, _heightSegments, _depthSegments);
        //var materialBox = new THREE.MeshBasicMaterial({color: this.simpleColor(_color)});
        let lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            wireframe: true
        });
        var box = new THREE.Mesh(geometryBox, lambertMaterial);
        this.addToScene(box);
        return box;
    }

    addSphere(_radius, _detail, _wireframe = false) {
        let icosahedronGeometry = new THREE.IcosahedronGeometry(_radius, _detail);
        icosahedronGeometry.dynamic = true;
        let lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            wireframe: _wireframe
        });

        let ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
        this.addToScene(ball);
        return ball;
    }

    addPlane(width, height, widthSegments, heightSegments) {
        let icosahedronGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
        icosahedronGeometry.dynamic = true;
        let lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            wireframe: true
        });

        let ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
        this.addToScene(ball);
        return ball;
    }

    addTorusKnot() {
        let icosahedronGeometry = new THREE.TorusKnotGeometry(100, 30, 100, 160);
        icosahedronGeometry.dynamic = true;
        let lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            wireframe: true
        });

        let ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
        this.addToScene(ball);
        return ball;
    }

    addPointCloud() {
        let editGeometry = new THREE.IcosahedronGeometry(1, 20);
        //let geometry = new THREE.Geometry();

        let material = new THREE.PointCloudMaterial({size: 2, sizeAttenuation: false, transparent: true});
        material.color.setHSL(1.0, 1, 1);

        let particles = new THREE.PointCloud(editGeometry, material);
        particles.sortParticles = true;
        this.addToScene(particles);
        return particles;
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
        console.log(_obj);
        //scene.add(_obj);
        scene.addToScene(_obj);
    }

}

function addSphereToScene(_wireframe = false) {
    let box = new Geometry();
    return box.addSphere(1, 20, _wireframe).translateZ(-6);
}

function addCubeToScene(_wireframe = false) {
    //let box = new Geometry();
    let box = new THREE.TorusGeometry(10, 3, 16, 100);
    let material = new THREE.PointCloudMaterial({size: 2, sizeAttenuation: false, transparent: true});
    const cone = new THREE.PointCloud(box, material);
    cone.doNotFlag = true;
    scene.addToScene(cone);

    return cone.translateZ(-6);
}

function makeMandala() {
    let box = new THREE.TorusGeometry(1, 3, 16, 100);
    let material = new THREE.PointCloudMaterial({size: 2, sizeAttenuation: false, transparent: true, color: 0xffffff});
    let cone = new THREE.PointCloud(box, material);
    cone.doNotFlag = true;
    scene.addToScene(cone);

    cone.translateZ(-6)

    box = new THREE.TorusGeometry(10, 3, 16, 100);
    material = new THREE.PointCloudMaterial({size: 5, sizeAttenuation: false, transparent: true, color: 0x00ffff});
    cone = new THREE.PointCloud(box, material);
    cone.doNotFlag = true;
    scene.addToScene(cone);

    cone.translateZ(-6)
    box = new THREE.TorusGeometry(20, 3, 16, 100);
    material = new THREE.PointCloudMaterial({size: 5, sizeAttenuation: false, transparent: true, color: 0x0000ff});
    cone = new THREE.PointCloud(box, material);
    cone.doNotFlag = true;
    scene.addToScene(cone);

    cone.translateZ(-6)
    box = new THREE.TorusGeometry(30, 3, 16, 100);
    material = new THREE.PointCloudMaterial({size: 5, sizeAttenuation: false, transparent: true, color: 0xff0000});
    cone = new THREE.PointCloud(box, material);
    cone.doNotFlag = true;
    scene.addToScene(cone);

    cone.translateZ(-6)
    box = new THREE.TorusGeometry(40, 3, 16, 100);
    material = new THREE.PointCloudMaterial({size: 5, sizeAttenuation: false, transparent: true, color: 0x00ff00});
    cone = new THREE.PointCloud(box, material);
    cone.doNotFlag = true;
    scene.addToScene(cone);

    cone.translateZ(-6)
    box = new THREE.TorusGeometry(50, 3, 16, 100);
    material = new THREE.PointCloudMaterial({size: 5, sizeAttenuation: false, transparent: true, color: 0xffff00});
    cone = new THREE.PointCloud(box, material);
    cone.doNotFlag = true;
    scene.addToScene(cone);

    cone.translateZ(-6)
}

function addPointCloudToScene() {
    let pointCloud = new Geometry();
    return pointCloud.addPointCloud().translateZ(-6);
}

function distortSurface(mesh, bassFr, treFr) {
    mesh.geometry.vertices.forEach(function (vertex, i) {
        let offset = mesh.geometry.parameters.radius;
        let amp = 7;
        let time = window.performance.now();
        vertex.normalize();
        let rf = 0.0001;
        let distance = ((offset + bassFr * 2) + noise.noise3D((vertex.x + time * rf * 7) / 2, (vertex.y + time * rf * 8) / 2, (vertex.z + time * rf * 9) / 2) * amp * treFr);
        vertex.multiplyScalar(Math.abs(distance / 15));
    });
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
}


