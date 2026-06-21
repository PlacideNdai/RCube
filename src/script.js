import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// --------------------- Colors ------------------------
// -----------------------------------------------------
const colors = {
    orange: 0xffa500,
    red: 0xff0000,
    yellow: 0xffff00,
    green: 0x00ff00,
    blue: 0x0000ff,
    purple: 0x800080,
    black: 0x000000,
}

// ------------------------ Scene, camera, and rendering ----------------//
// -----------------------------------------------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// --------------------- Initial controls (camera) --------------------- //.
// -----------------------------------------------------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


// --------------------- lighting --------------------------------- //.
// -----------------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);

scene.add(ambientLight);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const geome = new THREE.BoxGeometry(1, 1, 1);

// ----------------------- Goals -----------------------
/**
 * 1. create a 3 x 3 x 3 cube.
 * 2. Assign a color to each side of the cube.
 * 3. initial controls (camera)
 *  **/


// ---------------------- ideas tryouts below, goals above ---------------
// ------------------------------------------------------------------------

const cubesArray = [];

// ------------------------- Cube Building -------------------------------
// ------------------------------------------------------------------------
for (let a = -1; a < 2; a++) {
    for (let b = -1; b < 2; b++) {
        for (let c = -1; c < 2; c++) {

            // color assignment based on the generating side in the three D array.
            const cubeMaterials = [
                new THREE.MeshStandardMaterial({ color: a === 1 ? colors.blue : colors.black }), // Right
                new THREE.MeshStandardMaterial({ color: a === -1 ? colors.green : colors.black }), // Left
                new THREE.MeshStandardMaterial({ color: b === 1 ? colors.yellow : colors.black }), // Top
                new THREE.MeshStandardMaterial({ color: b === -1 ? colors.purple : colors.black }), // Bottom
                new THREE.MeshStandardMaterial({ color: c === 1 ? colors.red : colors.black }), // Front
                new THREE.MeshStandardMaterial({ color: c === -1 ? colors.orange : colors.black }),
            ];

            const cube = new THREE.Mesh(geome, cubeMaterials);
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

    // cubesArray.forEach((cube) => {
    //     cube.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.01);
    //     cube.rotation.y += 0.01;
    // })

    controls.update();
    renderer.render(scene, camera);
}


animate();
