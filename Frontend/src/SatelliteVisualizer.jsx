import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export default function SatelliteVisualizer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ---------- Scene ----------
    const scene = new THREE.Scene();

    // ---------- Camera ----------
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // ---------- Renderer ----------
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true;
    mount.appendChild(renderer.domElement);

    // ---------- Lights ----------
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(4, 4, 4);
    scene.add(sun);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    // ---------- Loaders ----------
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    dracoLoader.setDecoderConfig({ type: 'js' });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // ---------- Clipping planes ----------
    const clippingPlanes = [
      new THREE.Plane(new THREE.Vector3(0, 0.99, 0), 1),   // bottom
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), 2),     // right
      new THREE.Plane(new THREE.Vector3(1, 0, 0), 2),      // left
      new THREE.Plane(new THREE.Vector3(0, 0, 1), 2),      // front
      new THREE.Plane(new THREE.Vector3(0, 0, -1), 2),     // back
    ];

    // ---------- Load Globe ----------
    let globe;
    loader.load(
      '/Globe.glb',
      (gltf) => {
        globe = gltf.scene;
        globe.position.set(0, -1, 0);
        globe.scale.set(0.1, 0.1, 0.1);

        globe.traverse((child) => {
          if (child.isMesh) {
            child.material.clippingPlanes = clippingPlanes;
            child.material.side = THREE.DoubleSide;
          }
        });

        scene.add(globe);
      },
      undefined,
      (error) => console.error(error)
    );

    // ---------- Load ISS ----------
    let ISS;
    loader.load(
      '/ISS.glb',
      (gltf) => {
        ISS = gltf.scene;
        ISS.position.set(0, 0, 0);
        ISS.scale.set(1, 1, 1);

        ISS.traverse((child) => {
          if (child.isMesh) {
            if (child.material.map) child.material.map.minFilter = THREE.LinearFilter;
            child.frustumCulled = true;
          }
        });

        scene.add(ISS);
      },
      undefined,
      (error) => console.error(error)
    );

    // ---------- Camera position ----------
    camera.position.z = 2;

    // ---------- OrbitControls ----------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1.5;
    controls.maxDistance = 10;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);
    controls.update();

    // ---------- Animate ----------
    const animate = () => {
      if (globe) globe.rotation.y += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // ---------- Handle resize ----------
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}
