"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, Float } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/textured_mesh.glb");
  return <primitive object={scene} scale={0.7} />;
}

export default function QuizModel() {
  return (
    <div className="w-full h-[250px] md:h-[350px] relative">
      <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} shadows={false}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <Model />
            </Float>
          </Stage>
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={1} 
            makeDefault 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
