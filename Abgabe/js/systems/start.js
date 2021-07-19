import {init} from "../main.js";
import {Audio} from "./Audio.js";
import {Geometry} from "../components/Geometry.js";


window.start = function start(style) {
    if (!scene)
        init();
    switchStyle(style)
    $("#body-wrapper").fadeOut("slow");
    Audio.play();
}


window.menu = function menu() {
    $("#body-wrapper").fadeIn("slow");
}


function switchStyle(style) {
    let mesh, meshTwo, bgColor, __ret;
    scene.removeAllMeshes();
    switch (style) {
        case 'torus-knot-white':
            __ret = torusKnotWhite(mesh, bgColor);
            bgColor = __ret.bgColor;
            break;
        case 'mandala':
            bgColor = mandala(bgColor);
            break;
        case 'point-cloud':
            __ret = pointCloud(mesh, bgColor);
            bgColor = __ret.bgColor;
            break;
        case 'cube-black-wireframe':
            __ret = cubeBlackWireframe(mesh, bgColor);
            bgColor = __ret.bgColor;
        case 'black-wireframe':
            __ret = blackWireframe(mesh, bgColor);
            bgColor = __ret.bgColor;
            break;
        case 'white-wireframe':
            __ret = whiteWireframe(mesh, bgColor);
            bgColor = __ret.bgColor;
            break;
        case 'blue-red-wireframe':
            __ret = blueRedWireframe(mesh, meshTwo, bgColor);
            bgColor = __ret.bgColor;
            break;
        case 'red-blue-wireframe':
            __ret = redBlueWireframe(mesh, meshTwo, bgColor);
            bgColor = __ret.bgColor;
            break;
        case 'white-black':
            __ret = whiteBlack(mesh, meshTwo, bgColor);
            bgColor = __ret.bgColor;
            break;
        case 'black-white':
        default:
            __ret = blackWhite(mesh, meshTwo, bgColor);
            bgColor = __ret.bgColor;
            break;
    }
    $("body").css("background", bgColor);
}

function torusKnotWhite(mesh, bgColor) {
    mesh = Geometry.addTorusKnot().translateZ(-6);
    mesh.material.color.setRGB(255, 255, 255)
    bgColor = "black";
    scene.addToScene(mesh);
    return {mesh, bgColor};
}

function mandala(bgColor) {
    let meshes = Geometry.makeMandala();
    bgColor = "black";
    for (let element of meshes)
        scene.addToScene(element.translateZ(-6));
    return bgColor;
}

function pointCloud(mesh, bgColor) {
    mesh = Geometry.addPointCloud().translateZ(-6);
    bgColor = "black";
    scene.addToScene(mesh);
    return {mesh, bgColor};
}

function cubeBlackWireframe(mesh, bgColor) {
    mesh = Geometry.addTorus(10, 3, 16, 100, true).translateZ(-6);
    mesh.material.color.setRGB(0, 0, 0)
    bgColor = "white";
    scene.addToScene(mesh);
    return {mesh, bgColor};
}

function blackWireframe(mesh, bgColor) {
    mesh = Geometry.addSphere(1, 20, true).translateZ(-6);
    mesh.material.color.setRGB(0, 0, 0)
    bgColor = "white";
    scene.addToScene(mesh);
    return {mesh, bgColor};
}

function whiteWireframe(mesh, bgColor) {
    mesh = Geometry.addSphere(1, 20, true).translateZ(-6);
    mesh.material.color.setRGB(255, 255, 255)
    bgColor = "black";
    scene.addToScene(mesh);
    return {mesh, bgColor};
}

function blueRedWireframe(mesh, meshTwo, bgColor) {
    mesh = Geometry.addSphere(1, 20, true).translateZ(-6);
    mesh.material.color.setRGB(0, 0, 255)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.01;
    meshTwo = Geometry.addSphere(1, 20, true).translateZ(-6);
    meshTwo.material.color.setRGB(255, 0, 0);
    bgColor = "black";
    scene.addToScene(mesh);
    scene.addToScene(meshTwo);
    return {mesh, meshTwo, bgColor};
}

function redBlueWireframe(mesh, meshTwo, bgColor) {
    mesh = Geometry.addSphere(1, 20, true).translateZ(-6);
    mesh.material.color.setRGB(255, 0, 0)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.01;
    meshTwo = Geometry.addSphere(1, 20, true).translateZ(-6);
    meshTwo.material.color.setRGB(0, 0, 255);
    bgColor = "black";
    scene.addToScene(mesh);
    scene.addToScene(meshTwo);
    return {mesh, meshTwo, bgColor};
}

function whiteBlack(mesh, meshTwo, bgColor) {
    mesh = Geometry.addSphere(1, 20).translateZ(-6);
    mesh.material.color.setRGB(0, 0, 0)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.1;
    meshTwo = Geometry.addSphere(1, 20).translateZ(-6);
    meshTwo.material.color.setRGB(255, 255, 255);
    meshTwo.rotation.y = Math.random() * 100;
    bgColor = "white";
    scene.addToScene(mesh);
    scene.addToScene(meshTwo);
    return {mesh, meshTwo, bgColor};
}

function blackWhite(mesh, meshTwo, bgColor) {
    mesh = Geometry.addSphere(1, 20).translateZ(-6);
    mesh.material.color.setRGB(255, 255, 255)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.1;
    meshTwo = Geometry.addSphere(1, 20).translateZ(-6);
    meshTwo.material.color.setRGB(0, 0, 0);
    meshTwo.rotation.y = Math.random() * 100;
    bgColor = "black";
    scene.addToScene(mesh);
    scene.addToScene(meshTwo);
    return {mesh, meshTwo, bgColor};
}
