import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

(function setupAboutHero3D() {
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