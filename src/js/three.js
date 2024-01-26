import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();
const scene3 = new THREE.Scene();
const renderer1 = new THREE.WebGLRenderer({
  canvas: document.querySelector("#proj1"),
  antialias: true,
});
renderer1.setClearColor(0x003A50, 1);

const renderer2 = new THREE.WebGLRenderer({
  canvas: document.querySelector("#proj2"),
  antialias: true,
});
renderer2.setClearColor(0x313A54, 1);

const renderer3 = new THREE.WebGLRenderer({
  canvas: document.querySelector("#proj3"),
  antialias: true,
});
renderer3.setClearColor(0x313A54, 1);

const canvas1 = renderer1.domElement;
const canvas2 = renderer2.domElement;
const canvas3 = renderer3.domElement;
const camera1 = new THREE.PerspectiveCamera(75, canvas1.clientWidth / canvas1.clientHeight, .1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, canvas2.clientWidth / canvas2.clientHeight, .1, 1000);
const camera3 = new THREE.PerspectiveCamera(75, canvas3.clientWidth / canvas3.clientHeight, .1, 1000);
const orbitControls1 = new OrbitControls(camera1, renderer1.domElement);
const orbitControls2 = new OrbitControls(camera2, renderer2.domElement);
const orbitControls3 = new OrbitControls(camera3, renderer3.domElement);
const gltfLoader = new GLTFLoader();
let mesh1;
let mesh2;
let mesh3;
let mesh1Rotate = true;
let mesh2Rotate = true;
let mesh3Rotate = true;

renderer1.setPixelRatio(window.devicePixelRatio);
renderer2.setPixelRatio(window.devicePixelRatio);
renderer3.setPixelRatio(window.devicePixelRatio);
renderer1.setSize(canvas1.clientWidth, canvas1.clientHeight);
renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
renderer3.setSize(canvas3.clientWidth, canvas3.clientHeight);

camera1.position.setZ(5);
camera1.position.setY(0);
camera2.position.setZ(25);
camera2.position.setY(5);
camera2.position.setX(0);
camera3.position.setZ(4);
camera3.position.setY(0);
// camera3.lookAt(0, 0, 0);

gltfLoader.load("./assets/3D_Models/cartoonHeadSculpt4.glb", function(gltf) {
    mesh1 = gltf.scene;
    mesh1.position.y = 1;
    scene1.add(mesh1);
});

gltfLoader.load("./assets/3D_Models/editingObjects.glb", function(gltf) {
    mesh2 = gltf.scene;
    camera2.lookAt(mesh2.position);
    scene2.add(mesh2);
});

gltfLoader.load("./assets/3D_Models/WeShallSee.glb", function(gltf) {
    mesh3 = gltf.scene;
    mesh3.position.y = -2;
    scene3.add(mesh3);

});

// Lights

const pointLight1 = new THREE.PointLight(0xffffff);
const pointLight2 = new THREE.PointLight(0xffffff);
const pointLight3 = new THREE.PointLight(0xffffff);
pointLight1.position.set(5, 5, 5);
pointLight2.position.set(5, 5, 5);
pointLight3.position.set(5, 5, 5);

const directionalLight1 = new THREE.DirectionalLight(0x888888, 3);
const directionalLight2 = new THREE.DirectionalLight(0x888888, 5);
const directionalLight3 = new THREE.DirectionalLight(0x888888, 10);
directionalLight1.position.set(0, 10, 10);
directionalLight2.position.set(-5, 10, 0);
directionalLight3.position.set(0, 10, 0);

const ambientLight1 = new THREE.AmbientLight(0xffffff);
const ambientLight2 = new THREE.AmbientLight(0xffffff);
const ambientLight3 = new THREE.AmbientLight(0xffffff);
scene1.add(pointLight1, ambientLight1, directionalLight1);
scene2.add( ambientLight2, directionalLight2);
scene3.add(pointLight3, ambientLight3, directionalLight3);

function render() {
  renderer1.render(scene1, camera1);
  renderer2.render(scene2, camera2);
  renderer3.render(scene3, camera3);
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  const proj1Div = document.querySelector("#proj_1");
  const proj2Div = document.querySelector("#proj_2");
  const proj3Div = document.querySelector("#proj_3");

  camera1.aspect = proj1Div.clientWidth / canvas1.clientHeight;
  camera2.aspect = proj2Div.clientWidth / canvas2.clientHeight;
  camera3.aspect = proj3Div.clientWidth / canvas3.clientHeight;

  camera1.updateProjectionMatrix();
  camera2.updateProjectionMatrix();
  camera3.updateProjectionMatrix();

  renderer1.setSize(proj1Div.clientWidth, canvas1.clientHeight);
  renderer2.setSize(proj2Div.clientWidth, canvas2.clientHeight);
  renderer3.setSize(proj3Div.clientWidth, canvas3.clientHeight);

  render();
}

function animate() {
  requestAnimationFrame(animate);

  if (mesh1 && mesh1Rotate) {    
      mesh1.rotation.y += 0.007;
  }
  if (mesh2 && mesh2Rotate) {    
      mesh2.rotation.y += 0.007;
  }

  if (mesh3 && mesh3Rotate) {
    mesh3.rotation.y += 0.007;

  }

  render();
}

animate();
