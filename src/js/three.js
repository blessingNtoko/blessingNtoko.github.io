import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

// --- Constants ---
const MODEL_PATHS = [
  "./assets/3D_Models/cartoonHeadSculpt4.glb",
  "./assets/3D_Models/editingObjects.glb",
  "./assets/3D_Models/WeShallSee.glb"
];
const CANVAS_IDS = ["#proj1", "#proj2", "#proj3"];
const CONTAINER_IDS = ["#proj_1", "#proj_2", "#proj_3"];
const BUTTON_IDS = ["mesh1Btn", "mesh2Btn", "mesh3Btn"];
const CLEAR_COLORS = [0x003A50, 0x313A54, 0x313A54];

// --- Scene, Camera, Renderer, Controls ---
const scenes = CANVAS_IDS.map(() => new THREE.Scene());
const renderers = CANVAS_IDS.map((id, i) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(id),
    antialias: true,
  });
  renderer.setClearColor(CLEAR_COLORS[i], 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  return renderer;
});
const canvases = renderers.map(r => r.domElement);
const cameras = canvases.map((canvas, i) =>
  new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
);
const controls = cameras.map((camera, i) =>
  new OrbitControls(camera, renderers[i].domElement)
);

// --- Meshes and Rotation State ---
let meshes = [null, null, null];
let meshRotate = [true, true, true];

// --- Button Event Listeners ---
BUTTON_IDS.forEach((id, i) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", () => {
      meshRotate[i] = !meshRotate[i];
    });
  }
});

// --- Camera Positions ---
cameras[0].position.set(0, 0, 5);
cameras[1].position.set(0, 5, 25);
cameras[2].position.set(0, 0, 4);

// --- Load Models ---
const gltfLoader = new GLTFLoader();
gltfLoader.load(MODEL_PATHS[0], gltf => {
  meshes[0] = gltf.scene;
  meshes[0].position.y = 1;
  scenes[0].add(meshes[0]);
});
gltfLoader.load(MODEL_PATHS[1], gltf => {
  meshes[1] = gltf.scene;
  cameras[1].lookAt(meshes[1].position);
  scenes[1].add(meshes[1]);
});
gltfLoader.load(MODEL_PATHS[2], gltf => {
  meshes[2] = gltf.scene;
  meshes[2].position.y = -2;
  scenes[2].add(meshes[2]);
});

// --- Lighting ---
function addLights() {
  // Scene 1
  const pointLight1 = new THREE.PointLight(0xffffff);
  pointLight1.position.set(5, 5, 5);
  const directionalLight1 = new THREE.DirectionalLight(0x888888, 3);
  directionalLight1.position.set(0, 10, 10);
  const ambientLight1 = new THREE.AmbientLight(0xffffff);
  scenes[0].add(pointLight1, ambientLight1, directionalLight1);

  // Scene 2
  const directionalLight2 = new THREE.DirectionalLight(0x888888, 5);
  directionalLight2.position.set(-5, 10, 0);
  const ambientLight2 = new THREE.AmbientLight(0xffffff);
  scenes[1].add(ambientLight2, directionalLight2);

  // Scene 3
  const pointLight3 = new THREE.PointLight(0xffffff);
  pointLight3.position.set(5, 5, 5);
  const directionalLight3 = new THREE.DirectionalLight(0x888888, 10);
  directionalLight3.position.set(0, 10, 0);
  const ambientLight3 = new THREE.AmbientLight(0xffffff);
  scenes[2].add(pointLight3, ambientLight3, directionalLight3);
}
addLights();

// --- Renderer Size Setup ---
function setRendererSizes() {
  renderers.forEach((renderer, i) => {
    renderer.setSize(canvases[i].clientWidth, canvases[i].clientHeight);
  });
}
setRendererSizes();

// --- Responsive Resize ---
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  CONTAINER_IDS.forEach((containerId, i) => {
    const container = document.querySelector(containerId);
    cameras[i].aspect = container.clientWidth / canvases[i].clientHeight;
    cameras[i].updateProjectionMatrix();
    renderers[i].setSize(container.clientWidth, canvases[i].clientHeight);
  });
  render();
}

// --- Render Function ---
function render() {
  renderers.forEach((renderer, i) => {
    renderer.render(scenes[i], cameras[i]);
  });
}

// --- Animation Loop ---
function animate() {
  requestAnimationFrame(animate);
  meshes.forEach((mesh, i) => {
    if (mesh && meshRotate[i]) {
      mesh.rotation.y += 0.007;
    }
  });
  render();
}

animate();

// --- AboutHero 3D Scene ---
(function setupAboutHero3D() {
  console.log("setting up hero 3d...");
  const aboutCanvas = document.getElementById('about3d');
  if (!aboutCanvas) return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    aboutCanvas.clientWidth / aboutCanvas.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ canvas: aboutCanvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  resizeRenderer();

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableRotate = true;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(ambientLight, pointLight);

  // Rotating Cube
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x4e9cff })
  );
  scene.add(cube);

  // Stars
  function addStars(count = 200) {
    for (let i = 0; i < count; i++) {
      const geometry = new THREE.SphereGeometry(0.07, 12, 12);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(60));
      star.position.set(x, y, z);
      scene.add(star);
    }
  }
  addStars();

  // Camera position
  camera.position.set(0, 0, 8);

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.015;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Responsive Resize
  window.addEventListener('resize', resizeRenderer);
  function resizeRenderer() {
    const section = document.getElementById('aboutHero');
    if (!section) return;
    const width = section.clientWidth;
    const height = section.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
})();


