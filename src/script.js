import * as THREE from "three";

const colors = [
    0x00F5D4,
    0xFF007F,
    0xFF9E00,
    0x72EFDD,
    0x38B000,
    0x7B2CBF,
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


// colors and ambient lighting.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const geome = new THREE.BoxGeometry(1, 1, 1);

// ----------------------- Goals -----------------------
/**
 * 1. create a 3 x 3 x 3 cube.
 * 2. Assign a color to each side of the cube.
 *  **/


// ---------------------- ideas tryouts ---------------


// const cube = new THREE.Mesh(geome, materials);
const cubesArray = [];

// selecting a random color from the color array to apply to a cube.
function ChooseRandomColor() {
    return colors[Math.floor(Math.random() * colors.length )];
}

for (let a = -1; a < 2; a++) {
    for (let b = -1; b < 2; b++) {
        for (let c = -1; c < 2; c++) {

            // choosing materials.
            const materials = new THREE.MeshStandardMaterial({
                // color: 0x00ff00
                color: ChooseRandomColor(),
                roughness:10,
                metalness:0.1
            });


            const cube = new THREE.Mesh(geome, materials);
            cube.position.x = a * 1.05;
            cube.position.y = b * 1.05;
            cube.position.z = c * 1.05;


            cubesArray.push(cube);
            scene.add(cube)
        }
    }
}

camera.position.set(4, 4, 6);
camera.lookAt(0, 0, 0);

console.log(cubesArray);

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
