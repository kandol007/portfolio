"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Points as ThreePoints } from "three";
import { inSphere } from "maath/random";

const StarBackground = () => {
  const ref = useRef<ThreePoints>(null);
  const ref2 = useRef<ThreePoints>(null);

  const [positions] = useState<Float32Array>(
    () =>
      new Float32Array(
        inSphere(new Float32Array(2000 * 3), { radius: 1.2 })
      )
  );

  const [positions2] = useState<Float32Array>(
    () =>
      new Float32Array(
        inSphere(new Float32Array(500 * 3), { radius: 0.8 })
      )
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
    if (ref2.current) {
      ref2.current.rotation.x += delta / 20;
      ref2.current.rotation.y += delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Main star field — soft violet/lavender to match video */}
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#c084fc" // purple-400 — matches blackhole video hue
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
        />
      </Points>

      {/* Brighter accent stars — slightly more white/cyan glow */}
      <Points ref={ref2} positions={positions2} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#e9d5ff" // purple-200 — near-white with purple tint
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  /**
   * z-[6] puts stars ABOVE the video (z-[5]) but below hero content (z-[20])
   * pointer-events-none so clicks pass through
   */
  <div className="w-full h-full fixed inset-0 z-[6] pointer-events-none">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
        <Preload all />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;