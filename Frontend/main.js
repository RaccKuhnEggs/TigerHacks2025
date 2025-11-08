import * as THREE from 'three';
//loads gltf objects
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//allows camera orbiting
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
//lets us load ISS because its compressed terribly
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


//initialize scene
const scene = new THREE.Scene();

//initialize camera with FOV, aspect ratio, and the min/max distances from the camera between which we render
//may want to increase min for VR ("My phantom sense is acting up OwO!?!?!")
//may need to decrease max to improve efficiency
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//initialize renderer and add it to html
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({canvas : canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

//add ambient white light to scene so we can see gltf objects
const sun = new THREE.DirectionalLight(0xFFFFFF, 1);
sun.position.set(4,4,4);
scene.add(sun);
const Alight = new THREE.AmbientLight(0xFFFFFF, 0.6);
scene.add(Alight);

//initialize draco to decompress ISS
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
dracoLoader.setDecoderConfig({ type: 'js' });


const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

//ensures loaded globe is global so we can manipulate it later
let globe;

// Create clipping planes
const clippingPlanes = [

    new THREE.Plane(new THREE.Vector3(0, .99, 0), 1),   // Cut from bottom
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), 2),  // Cut from right
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 2),   // Cut from left
    new THREE.Plane(new THREE.Vector3(0, 0, 1), 2), //Cut front
    new THREE.Plane(new THREE.Vector3(0, 0, -1), 2) //Cut back

];

// Enable clipping on renderer
renderer.localClippingEnabled = true;

//load globe
loader.load( '/Globe.glb', function ( gltf ) {
    globe = gltf.scene;
    globe.position.set(0,-1,0);
    globe.scale.set(0.1,0.1,0.1);
    
    globe.traverse((child) => {
        if (child.isMesh) {
            child.material.clippingPlanes = clippingPlanes;
            child.material.side = THREE.DoubleSide;
        }
    });

    //size of globe n stuff
    const globebox = new THREE.Box3().setFromObject(globe);
    const globesize = globebox.getSize(new THREE.Vector3());
    const globecenter = globebox.getCenter(new THREE.Vector3());
    console.log('Globe original size:', globesize);
    console.log('Globe center:', globecenter);

    scene.add( globe );

}, undefined, function ( error ) {

    console.error( error );

} );

let ISS;

loader.load( '/ISS.glb', function ( gltf ) {
    ISS = gltf.scene;
    ISS.position.set(0,0,0);
    ISS.scale.set(1,1,1);

    
    ISS.traverse((child) => {
        if (child.isMesh) {
            // Reduce texture size if needed
            if (child.material.map) {
                child.material.map.minFilter = THREE.LinearFilter;
            }
            // Enable frustum culling
            child.frustumCulled = true;
        }
    });
    scene.add( ISS );

}, undefined, function ( error ) {

    console.error( error );

} );



//---------------Test Items-------------------//
/*
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
*/
camera.position.z = 2;

const controls = new OrbitControls(camera,canvas);
controls.minDistance=.91;
controls._pan=false;
controls.target.set(0, 0, 0);
controls.update();




//loop of what is rendered every frame
//anything that happens every frame should be in here
function animate() {
    if (globe) {
        globe.rotation.y += 0.001;

    }

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );