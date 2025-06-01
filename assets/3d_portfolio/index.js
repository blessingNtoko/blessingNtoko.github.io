// import "./public/css/style.css";
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

// --- Constants ---
const STAR_COUNT = 200;
const ASSETS = {
  space: './assets/images/space3.jpeg',
  avatar: './assets/images/blessing.jpg',
  moon: './assets/images/moon.jpg',
  normal: './assets/images/normal.jpg'
};

// --- Scene Setup ---
let scene, camera, renderer, orbitControls;

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#background'),
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.set(-3, 0, 30);
  orbitControls = new OrbitControls(camera, renderer.domElement);
}

// --- Lighting ---
function addLights() {
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);
}

// --- Objects ---
function addTorus() {
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
  const torus = new THREE.Mesh(geometry, material);
  torus.name = 'torus';
  scene.add(torus);
}

function addStars() {
  for (let i = 0; i < STAR_COUNT; i++) {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
  }
}

function addBackground() {
  const texture = new THREE.TextureLoader().load(ASSETS.space);
  scene.background = texture;
}

function addAvatar() {
  const texture = new THREE.TextureLoader().load(ASSETS.avatar);
  const avatar = new THREE.Mesh(
    new THREE.BoxGeometry(3, 4, 3),
    new THREE.MeshBasicMaterial({ map: texture })
  );
  avatar.position.set(2, 0, -5);
  avatar.name = 'avatar';
  scene.add(avatar);
}

function addMoon() {
  const moonTexture = new THREE.TextureLoader().load(ASSETS.moon);
  const normalTexture = new THREE.TextureLoader().load(ASSETS.normal);
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
  );
  moon.position.set(-5, 0, 30);
  moon.name = 'moon';
  scene.add(moon);
}

// --- Responsive Resize ---
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

// --- Animation ---
function animate() {
  requestAnimationFrame(animate);

  const torus = scene.getObjectByName('torus');
  const moon = scene.getObjectByName('moon');
  if (torus) {
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
  }
  if (moon) {
    moon.rotation.x += 0.005;
  }

  render();
}

function render() {
  renderer.render(scene, camera);
}

// --- Camera Scroll Animation ---
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  const moon = scene.getObjectByName('moon');
  const avatar = scene.getObjectByName('avatar');
  if (moon) {
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
  }
  if (avatar) {
    avatar.rotation.y += 0.01;
    avatar.rotation.z += 0.01;
  }
  camera.position.z = 30 + t * -0.01;
  camera.position.x = -3 + t * -0.0002;
  camera.position.y = t * -0.0002;
}

// --- Initialization ---
function main() {
  initScene();
  addLights();
  addTorus();
  addStars();
  addBackground();
  addAvatar();
  addMoon();
  render();
  window.addEventListener('resize', onWindowResize, false);
  document.body.onscroll = moveCamera;
  moveCamera();
  animate();
}

main();
