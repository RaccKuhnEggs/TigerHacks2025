import * as THREE from 'three';
//loads gltf objects
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//allows camera orbiting
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//initialize scene
const scene = new THREE.Scene();

//initialize camera with FOV, aspect ratio, and the min/max distances from the camera between which we render
//may want to increase min for VR ("My phantom sense is acting up OwO!?!?!")
//may need to decrease max to improve efficiency
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//initialize renderer and add it to html
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//add ambient white light to scene so we can see gltf objects
const light = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(light);

const loader = new GLTFLoader();

//ensures loaded globe is global so we can manipulate it later
let globe;

loader.load( '/Globe.glb', function ( gltf ) {
    globe = gltf.scene;
    globe.position.set(2,0,1);
    globe.scale.setSize(1);

    scene.add( globe );


    const box = new THREE.Box3().setFromObject(globe);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
        
    console.log('Globe size:', size);  // See how big it is
    console.log('Globe center:', center);

}, undefined, function ( error ) {

    console.error( error );

} );



//---------------Test Items-------------------//
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 10;
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

//loop of what is rendered every frame
//anything that happens every frame should be in here
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );