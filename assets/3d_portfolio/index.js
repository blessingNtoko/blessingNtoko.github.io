// import "./public/css/style.css";
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
  antialias: true
});
const orbitControls = new OrbitControls(camera, renderer.domElement)

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

render();

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    let canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    render();
}

function render() {
  renderer.render(scene, camera)
}

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff5500 });
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const sphereGeometry = new THREE.SphereGeometry(.25, 24, 24);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(sphereGeometry, sphereMaterial);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('./assets/images/space3.jpeg');
scene.background = spaceTexture;

// Avatar

const blessingtexture = new THREE.TextureLoader().load('./assets/images/blessing.jpg');
const blessing = new THREE.Mesh(new THREE.BoxGeometry(3, 4, 3), new THREE.MeshBasicMaterial({ map: blessingtexture }));
scene.add(blessing);

// Moon

const moonTexture = new THREE.TextureLoader().load('./assets/images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./assets/images/normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-5);

blessing.position.z = -5;
blessing.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += .05;
  moon.rotation.y += .075;
  moon.rotation.z += .05;

  blessing.rotation.y += .01;
  blessing.rotation.z += .01;

  camera.position.z = t * -.01;
  camera.position.x = t * -.0002;
  camera.position.y = t * -.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += .01;
  torus.rotation.y += .005;
  torus.rotation.z += .01;

  moon.rotation.x += 0.005;

  // controls.update();

  render();
}

animate();
