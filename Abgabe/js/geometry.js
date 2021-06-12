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
        var materialBox = new THREE.MeshBasicMaterial({color: this.simpleColor(_color)});
        var box = new THREE.Mesh(geometryBox, materialBox);
        this.addToScene(box);
        return box;
    }

    addSphere(_radius, _detail) {
        let icosahedronGeometry = new THREE.IcosahedronGeometry(_radius, _detail);
        icosahedronGeometry.dynamic = true;
        let lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0xff00ee,
            wireframe: true
        });

        let ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
        this.addToScene(ball);
        return ball;
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
        console.log("added mesh to scene");
        console.log(_obj);
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
    //box.addBoxGeometry(1, 1, 1).translateZ(-6)
    return box.addSphere(2, 10).translateZ(-6);


}


//some helper functions here
function fractionate(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}

function avg(arr) {
    var total = arr.reduce(function (sum, b) {
        return sum + b;
    });
    return (total / arr.length);
}

function max(arr) {
    return arr.reduce(function (a, b) {
        return Math.max(a, b);
    })
}

function getAmountOfMaxValues(arr, _val) {
    return arr.filter(x => x >= _val).length;
}

/*
let grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
// 3D simplex noise
// credit goes to https://weber.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
let p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]
let perm = new Array(512);
{
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
}

function noise3D(xin, yin, zin) {
    let n0, n1, n2, n3; // Noise contributions from the four corners
    // Skew the input space to determine which simplex cell we're in
    const F3 = 1.0 / 3.0;
    let s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D
    let i = fastfloor(xin + s);
    let j = fastfloor(yin + s);
    let k = fastfloor(zin + s);
    const G3 = 1.0 / 6.0; // Very nice and simple unskew factor, too
    let t = (i + j + k) * G3;
    let X0 = i - t; // Unskew the cell origin back to (x,y,z) space
    let Y0 = j - t;
    let Z0 = k - t;
    let x0 = xin - X0; // The x,y,z distances from the cell origin
    let y0 = yin - Y0;
    let z0 = zin - Z0;    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if (x0 >= y0) {
        if (y0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
        }// X Y Z order
        else if (x0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 0;
            k2 = 1;
        } // X Z Y order
        else {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 1;
            j2 = 0;
            k2 = 1;
        } // Z X Y order
    } else {//x0 < y0
        if (y0 < z0) {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 0;
            j2 = 1;
            k2 = 1;
        } // Z Y X order
        else if (x0 < z0) {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 0;
            j2 = 1;
            k2 = 1;
        } // Y Z X order
        else {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
        } // Y X Z order
    }    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where    // c = 1/6.
    let x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
    let y1 = y0 - j1 + G3;
    let z1 = z0 - k1 + G3;
    let x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
    let y2 = y0 - j2 + 2.0 * G3;
    let z2 = z0 - k2 + 2.0 * G3;
    let x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
    let y3 = y0 - 1.0 + 3.0 * G3;
    let z3 = z0 - 1.0 + 3.0 * G3;    // Work out the hashed gradient indices of the four simplex corners
    let ii = i & 255;
    let jj = j & 255;
    let kk = k & 255;
    let gi0 = perm[ii + perm[jj + perm[kk]]] % 12;
    let gi1 = perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]] % 12;
    let gi2 = perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]] % 12;
    let gi3 = perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]] % 12;    // Calculate the contribution from the four corners
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) n0 = 0.0; else {
        t0 *= t0;
        n0 = t0 * t0 * dot(grad3[gi0], x0, y0, z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) n1 = 0.0; else {
        t1 *= t1;
        n1 = t1 * t1 * dot(grad3[gi1], x1, y1, z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) n2 = 0.0; else {
        t2 *= t2;
        n2 = t2 * t2 * dot(grad3[gi2], x2, y2, z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) n3 = 0.0; else {
        t3 *= t3;
        n3 = t3 * t3 * dot(grad3[gi3], x3, y3, z3);
    }    // Add contributions from each corner to get the const noise value.    // The result is scaled to stay just inside [-1,1]
    return 32.0 * (n0 + n1 + n2 + n3);
}

function dot(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
}

function fastfloor(x) {
    return x > 0 ? x : x - 1;
}
*/