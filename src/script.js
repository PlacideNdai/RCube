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
    white: 0xffffff,
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
 * 4. rotation.
 * 5. Rotation animations
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

// ---------------------- Animations setup -------------------------------
// ------------------------------------------------------------------------
const animationState = {
    active: false,
    group: null,
    axis: null,
    currentProgress: 0,
    targetAngle: 0,
    speed: 0.1
};


// ---------------------- Rotate Function -------------------------------
// ------------------------------------------------------------------------
/***
 * @param {String} axis - axis of rotation (x, y, z)
 * @param {Number} layerValue - The target coordiation (-1, 0, 1)
 * @param {Boolean} clockwise - true for clockwise, false for anticlockwise
 * **/
function rotateLayer(axis, layerValue, clockwise = true){

    // if animations are active, ignore the key inputs.
    if(animationState.active) return;



    const tempGroup = new THREE.Group();
    scene.add(tempGroup);

    const targetCoordination = layerValue * 1.05;


    const cubesToRotate = cubesArray.filter(cube =>{
        return  Math.round(cube.position[axis] * 100) === Math.round(targetCoordination * 100);
    });

    cubesToRotate.forEach(cube => {
        tempGroup.add(cube);
    })


    animationState.active = true;
    animationState.group = tempGroup;
    animationState.axis = axis;
    animationState.currentProgress = 0;
    animationState.targetAngle = clockwise ? Math.PI /2 : -Math.PI / 2;
}


// ---------------------- top ration key testing -------------------------------
// ------------------------------------------------------------------------

window.addEventListener("keydown", (e) => {
    switch(e.key.toLowerCase()) {
        case "t":
            rotateLayer("y", 1, true);
            break;
        case "g":
            rotateLayer("y", -1, false);
            break;

        case "r":
            rotateLayer("x", 1, true);
            break;
        case "l":
            rotateLayer("x", -1, true);
            break;
        case "f":
            rotateLayer("z", 1, true);
            break;
        case "b":
            rotateLayer("z", -1, true);
            break;
    }
});

// render the test and animate it.
function animate() {
    requestAnimationFrame(animate);

    controls.update();



    if(animationState.active){
        const state = animationState;

        const step = state.targetAngle > 0? state.speed : -state.speed;
        state.group.rotation[state.axis] += step;
        state.currentProgress += step;

        if(Math.abs(state.currentProgress) >= Math.abs(state.targetAngle)){
            state.group.rotation[state.axis] = state.targetAngle;

            while(state.group.children.length > 0){
                const cube  = state.group.children[0];
                scene.attach(cube);
            }

            scene.remove(state.group);

            animationState.active = false;
            animationState.group = null;
            animationState.axis = null;
        }
    }
    renderer.render(scene, camera);
}

animate();
