import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function Three() {
  console.log(THREE);
  const refContainer = useRef(null);
  useEffect(() => {
    const cursor = { x: 0, y: 0 };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight
    );
    camera.position.z = 3;
    scene.add(camera);

    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load(
      "https://static.vecteezy.com/system/resources/previews/023/802/064/non_2x/rose-gold-metallic-gradient-with-scratches-rose-gold-foil-surface-texture-effect-illustration-vector.jpg"
    );

    const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 200, 30);
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = 0.5;
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("mousemove", (event) => {
      cursor.x = event.clientX / window.innerWidth - 0.5;
      cursor.y = event.clientY / window.innerHeight - 0.5;
    });

    const animate = function () {
      window.requestAnimationFrame(animate);

      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.01;

      const cameraX = cursor.x;
      const cameraY = cursor.y;

      camera.position.x += (cameraX - camera.position.x) / 10;
      camera.position.y += (cameraY - camera.position.y) / 10;

      renderer.render(scene, camera);
    };

    animate();

    document.body.appendChild(renderer.domElement);
  }, []);
  return <div ref={refContainer}></div>;
}
