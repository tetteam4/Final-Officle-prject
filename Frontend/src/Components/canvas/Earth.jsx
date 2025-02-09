import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const { scene, error } = useGLTF("./planet/scene.gltf");

  if (error) {
    console.error("Error loading GLTF:", error);
    return null; // Handle loading error
  }

  return <primitive object={scene} scale={2.5} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
  return (
    <Canvas>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas; // Ensure this is a default export
