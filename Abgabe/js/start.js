import {init, removeEntity} from "./main.js";

window.start = function start(style) {
    if (!scene)
        init();
    // Add Mesh
    switchStyle(style)
    //document.getElementById("audio").style.display = "";
    $("#body-wrapper").fadeOut("slow");
    play();
}


window.menu = function menu() {
    //document.getElementById("audio").style.display = "block";
    $("#body-wrapper").fadeIn("slow");
    //$("#audio").fadeIn("slow");
}

function switchStyle(style) {
    let mesh;
    let meshTwo;
    //renderer.setAnimationLoop(null);        // pause the animation

    for (let i = scene.children.length - 1; i >= 0; i--) {
        if (scene.children[i].type === "Mesh" || scene.children[i].type === "Points")
            scene.remove(scene.children[i]);
    }
    meshes = [];
    //renderer.renderLists.dispose();

    switch (style) {
        case 'mandala':
            mesh = makeMandala();
            $("body").css("background", "#000000");
            break;
        case 'point-cloud':
            mesh = addPointCloudToScene();
            $("body").css("background", "black");
            break;
        case 'cube-black-wireframe':
            mesh = addCubeToScene();
            console.log("In here")
            mesh.material.color.setRGB(0, 0, 0)
            $("body").css("background", "white");

        case 'black-wireframe':
            mesh = addSphereToScene(true);
            mesh.material.color.setRGB(0, 0, 0)
            $("body").css("background", "white");
            break;
        case 'white-wireframe':
            mesh = addSphereToScene(true);
            mesh.material.color.setRGB(255, 255, 255)
            $("body").css("background", "black");
            break;
        case 'blue-red-wireframe':
            mesh = addSphereToScene(true);
            mesh.material.color.setRGB(0, 0, 255)
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.01;
            meshTwo = addSphereToScene(true);
            meshTwo.material.color.setRGB(255, 0, 0);
            $("body").css("background", "black");
            break;
        case 'red-blue-wireframe':
            mesh = addSphereToScene(true);
            mesh.material.color.setRGB(255, 0, 0)
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.01;
            meshTwo = addSphereToScene(true);
            meshTwo.material.color.setRGB(0, 0, 255);
            $("body").css("background", "black");
            break;
        case 'white-black':
            mesh = addSphereToScene();
            mesh.material.color.setRGB(0, 0, 0)
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.1;
            meshTwo = addSphereToScene();
            meshTwo.material.color.setRGB(255, 255, 255);
            meshTwo.rotation.y = Math.random() * 100;
            $("body").css("background", "white");
            break;
        case 'black-white':
        default:
            mesh = addSphereToScene();
            mesh.material.color.setRGB(255, 255, 255)
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.1;
            meshTwo = addSphereToScene();
            meshTwo.material.color.setRGB(0, 0, 0);
            meshTwo.rotation.y = Math.random() * 100;
            $("body").css("background", "black");
            break;
    }
}