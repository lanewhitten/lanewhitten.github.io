import './style.css'

import * as THREE from 'three'; 

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//Torus
//const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//const material = new THREE.MeshStandardMaterial({color: 0xFF6348});
//const torus = new THREE.Mesh( geometry, material);
//scene.add(torus);

//Lights
const pointLight = new THREE.PointLight( 0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add (pointLight, ambientLight);



//Helpers
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper,gridHelper)

//Orbit Controls 
//const controls = new OrbitControls(camera, renderer.domElement);

function addDodo() {
  const geometry = new THREE.DodecahedronGeometry(1, 0);
  const material = new THREE.MeshStandardMaterial( {color: 0xed60a9});
  const dodo = new THREE.Mesh (geometry,material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  
  dodo.position.set(x,y,z)
  scene.add(dodo)

}

Array(200).fill().forEach(addDodo)

const backdrop = new THREE.TextureLoader().load('background.jpg');
scene.background = backdrop;

//Avatar Box
const laneTexture = new THREE.TextureLoader().load('lane.png');

const lane = new THREE.Mesh (
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: laneTexture})
);

scene.add(lane);

//Move Camera Function

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  
  lane.rotation.y += 0.01;
  lane.rotation.x += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame( animate );

 // torus.rotation.x += 0.01;
 // torus.rotation.y += 0.005;
//  torus.rotation.z += 0.01;


 // controls.update();

  renderer.render(scene, camera);
}

animate();
