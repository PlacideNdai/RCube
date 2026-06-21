import * as THREE from "three";

const colors = [
    0xFF0000,
    0x00FF00,
    0x0000FF,
    0xFFFF00,
    0x00FFFF,
    0xFF00FF,
    0xFFFFFF,
    0x000000,
    0xFFA500,
    0xA52A2A,
    0xA52A00,
    0xFF7F50,
    0xC0C0C0,
    0x808080,
    0x008000,
    0x000080,
];

// creating a scene.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight, 0.1, 1000
);

// rendering the scene.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// selecting a random color from the color array to apply to a cube.
function ChooseRandomColor() {
    return colors[Math.floor(Math.random() * colors.length )];
}

// colors and ambient lighting.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const geome = new THREE.BoxGeometry(1, 1, 1);

// ----------------------- Goals -----------------------
/**
 * 1. create a 3 x 3 x 3 cube.
 *  **/


// ---------------------- ideas tryouts ---------------


// const cube = new THREE.Mesh(geome, materials);
const cubesArray = [];

for (let a = -1; a < 1; a++) {
    for (let b = -1; b < 1; b++) {
        for (let c = -1; c < 1; c++) {

            // choosing materials.
            const materials = new THREE.MeshBasicMaterial({
                // color: 0x00ff00
                color: ChooseRandomColor(),
                roughness:0.1, 
                metalness:0.1
            });


            const cube = new THREE.Mesh(geome, materials);
            cube.position.x = a * 1.05;
            cube.position.y = b * 1.05;
            cube.position.z = c * 1.05;

            cube.rotation.x = Math.PI / 2;
            cube.rotation.y = Math.PI / 2;
            cube.rotation.z = Math.PI / 2;

            cubesArray.push(cube);
            scene.add(cube)
        }
    }
}

camera.position.set(4, 4, 6);
camera.lookAt(0, 0, 0);

// render the test and anumate it.
function animate(time) {

    // renderer.setAnimationLoop(animate);
    requestAnimationFrame(animate);

    cubesArray.forEach((cube)=> {
        cube.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.01);
        cube.rotation.y += 0.01;
    })


    renderer.render(scene, camera);
}


animate();
