const noise = new SimplexNoise();


class Geometry {

    static translateZ(_obj, _value) {
        _obj.position.z = _value;
    }

    static addSphere(_radius, _detail, _wireframe = false) {
        let icosahedronGeometry = new THREE.IcosahedronGeometry(_radius, _detail);
        icosahedronGeometry.dynamic = true;
        let lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            wireframe: _wireframe
        });
        return new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    }

    static addTorusKnot() {
        let icosahedronGeometry = new THREE.TorusKnotGeometry(10, 5, 40, 8, 7, 1, 3);
        icosahedronGeometry.dynamic = true;
        let lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            wireframe: true
        });
        return new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    }

    static addPointCloud() {
        let editGeometry = new THREE.IcosahedronGeometry(1, 20);
        //let geometry = new THREE.Geometry();

        let material = new THREE.PointsMaterial({size: 2, sizeAttenuation: false, transparent: true});
        material.color.setHSL(1.0, 1, 1);

        let particles = new THREE.Points(editGeometry, material);
        particles.sortParticles = true;
        return particles;
    }

    static makeMandala() {
        let returnArray = [];
        let colorArray = [0xffffff, 0xffffff, 0x00ffff, 0x0000ff, 0xff0000, 0x00ff00, 0xffff00];
        for (var i = 0; i < 20; i++) {
            let box = new THREE.TorusGeometry(i * 5, 1, 1, 100);
            let material = new THREE.PointsMaterial({
                size: 3,
                sizeAttenuation: false,
                transparent: true,
                color: colorArray[i % colorArray.length]
            });
            let cone = new THREE.Points(box, material);
            returnArray.push(cone);
        }
        return returnArray;
    }

    static addTorus(radius, redialSegments, tubularSegments, arc) {
        let box = new THREE.TorusGeometry(radius, redialSegments, tubularSegments, arc);
        let material = new THREE.PointsMaterial({size: 2, sizeAttenuation: false, transparent: true});
        return new THREE.Points(box, material);
    }

    static distortSurface(mesh, bassFr, treFr) {
        mesh.geometry.vertices.forEach(function (vertex) {
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
    }
}


export {Geometry}
