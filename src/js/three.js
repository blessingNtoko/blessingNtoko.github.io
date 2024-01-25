import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();
const scene3 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(75);
const camera2 = new THREE.PerspectiveCamera(75);
const camera3 = new THREE.PerspectiveCamera(75);
const renderer1 = new THREE.WebGLRenderer({
  canvas: document.querySelector("#proj1"),
  antialias: true,
});
const renderer2 = new THREE.WebGLRenderer({
  canvas: document.querySelector("#proj2"),
  antialias: true,
});
const renderer3 = new THREE.WebGLRenderer({
  canvas: document.querySelector("#proj3"),
  antialias: true,
});
const orbitControls1 = new OrbitControls(camera1, renderer1.domElement);
const orbitControls2 = new OrbitControls(camera2, renderer2.domElement);
const orbitControls3 = new OrbitControls(camera3, renderer3.domElement);
const canvas1 = renderer1.domElement;
const canvas2 = renderer2.domElement;
const canvas3 = renderer3.domElement;

renderer1.setPixelRatio(window.devicePixelRatio);
renderer2.setPixelRatio(window.devicePixelRatio);
renderer3.setPixelRatio(window.devicePixelRatio);
renderer1.setSize(canvas1.clientWidth, canvas1.clientHeight);
renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
renderer3.setSize(canvas3.clientWidth, canvas3.clientHeight);

camera1.position.setZ(30);
// camera1.position.setX(-3);

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff5500 });
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene1.add(torus);

// Lights

const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(5, 5, 5);

const ambientLight1 = new THREE.AmbientLight(0xffffff);
scene1.add(pointLight1, ambientLight1);

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
  console.log(proj1Div.clientWidth);

  camera1.aspect = proj1Div.clientWidth / proj1Div.clientHeight;
  camera2.aspect = canvas2.clientWidth / canvas2.clientHeight;
  camera3.aspect = canvas3.clientWidth / canvas3.clientHeight;

  camera1.updateProjectionMatrix();
  camera2.updateProjectionMatrix();
  camera3.updateProjectionMatrix();

  renderer1.setSize(proj1Div.clientWidth, proj1Div.clientHeight);
  renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
  renderer3.setSize(canvas3.clientWidth, canvas3.clientHeight);

  render();
}

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      if (entry.contentBoxSize[0]) {
        entry.contentBoxSize[0].inlineSize / entry.contentBoxSize[0].blockSize;
      }
    }
  }

  console.log("size changed", entries);
});

resizeObserver.observe(canvas1);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  render();
}

animate();
