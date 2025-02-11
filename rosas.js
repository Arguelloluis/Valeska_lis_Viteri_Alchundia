import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

let container;
let camera, scene, renderer, controls;
let manager;
let object;
let material = new THREE.MeshStandardMaterial({
  metalness: 0,
  roughness: 0.8,
  side: THREE.DoubleSide
});

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    33,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.y = 150;
  camera.position.z = 250;

  // Escena
  scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.castShadow = true;
  camera.add(pointLight);
  scene.add(camera);

  // Manager para cargar el modelo
  function loadModel() {
    object.traverse(function (child) {
      if (child.isMesh) {
        let mat = material.clone();
        if (child.name === "rose") {
          mat.color.set("red");
        } else if (child.name === "calyx") {
          mat.color.set("#f10606");
        } else if (child.name === "leaf1" || child.name === "leaf2") {
          mat.color.set("#02b831");
        }
        child.material = mat;
      }
    });
    object.rotation.set(0, Math.PI / 1.7, 0);
    object.receiveShadow = true;
    object.castShadow = true;
    scene.add(object);
  }

  manager = new THREE.LoadingManager(loadModel);

  const loader = new OBJLoader(manager);
  loader.load(
    "./rosa.obj",
    function (obj) {
      object = obj;
    },
    onProgress,
    onError
  );

  function onProgress(xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(`Modelo ${Math.round(percentComplete, 2)}% descargado`);
    }
  }

  function onError(error) {
    console.error('Error al cargar el modelo:', error);
  }

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2;
  controls.target.set(0, 0, 0);
  controls.update();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}
let title = "Para Valeska 😎";
let speed = 200; 
let index = 0;

function scrollTitle() {
    document.title = title.substring(index) + title.substring(0, index);
    index = (index + 1) % title.length;
    setTimeout(scrollTitle, speed);
}

scrollTitle();

anime.timeline({ loop: false })
  .add({
    targets: 'h1',
    scale: [0.5, 1],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1000,
    delay: 500
  }).add({
    targets: 'h1',
    keyframes: [
      { translateY: -30, opacity: 1 },
      { translateY: 0, opacity: 1 }
    ],
    duration: 1500,
    easing: 'easeOutExpo'
  }).add({
    targets: 'p',
    opacity: [0, 1],
    translateY: [20, 0],
    easing: "easeOutExpo",
    duration: 1000,
    delay: 500
  }).add({
    targets: 'h1, p',
    borderRadius: ['0%', '50%'],
    duration: 2000,
    easing: 'easeOutExpo'
  });
  // Selecciona el elemento <h1> por su etiqueta
const title2 = document.querySelector('h1');

// Array de colores para usar en el cambio
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A6'];

// Índice inicial del color
let colorIndex = 0;

// Función para cambiar el color del texto
function changeColor() {
    // Cambia el color del texto al siguiente en el array
    title2.style.color = colors[colorIndex];
    
    // Actualiza el índice del color
    colorIndex = (colorIndex + 1) % colors.length;
}

// Cambia el color cada 1 segundo (1000 milisegundos)
setInterval(changeColor, 1000);


