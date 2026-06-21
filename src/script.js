import * as THREE from "three";

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

// testing the scene.
const geome = new THREE.BoxGeometry(1, 1, 1);
const materials = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});

const cube = new THREE.Mesh(geome, materials);

scene.add(cube);
camera.position.z = 5;

// render the test and anumate it.
function animate(time) {

    // renderer.setAnimationLoop(animate);
    requestAnimationFrame(animate);
    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;


    renderer.render(scene, camera);
}


animate();
