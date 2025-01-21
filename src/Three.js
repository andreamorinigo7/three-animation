import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function Three() {
  console.log(THREE);
  const refContainer = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight
    );
    camera.position.z = 3;
    scene.add(camera);

    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load(
      "https://bruno-simon.com/prismic/matcaps/3.png"
    );

    const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 200, 30);
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = 0.5;
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const animate = function () {
      window.requestAnimationFrame(animate);

      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    document.body.appendChild(renderer.domElement);
  }, []);
  return <div ref={refContainer}></div>;
}
