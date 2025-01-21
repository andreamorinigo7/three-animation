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

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = 0.5;
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const animate = function () {
      window.requestAnimationFrame(animate);

      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    document.body.appendChild(renderer.domElement);
  }, []);
  return <div ref={refContainer}></div>;
}
