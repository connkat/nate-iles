"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function BubblePlane({ strength = 1.0 }: { strength?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uStrength: { value: strength },
    }),
    [size.width, size.height, strength]
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms.uResolution]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform vec2 uResolution; // pixels
    uniform vec2 uMouse;      // 0..1 normalized viewport
    uniform float uTime;
    uniform float uStrength;

    // Soft radial mask
    float smoothCircle(vec2 p, vec2 c, float r, float blur) {
      float d = distance(p, c);
      return smoothstep(r, r - blur, d);
    }

    void main() {
      // Base background: subtle radial vignette
      vec2 uv = vUv;

      // Cursor-based refraction/bulge
      float radius = 0.25; // normalized
      float blur = 0.15;
      float mask = smoothCircle(uv, uMouse, radius, blur);

      // Compute direction away from mouse
      vec2 dir = normalize(uv - uMouse + 1e-6);
      float dist = distance(uv, uMouse);

      // Bulge falloff
      float bulge = smoothstep(radius, 0.0, dist) * mask;

      // Refract UVs toward mouse to create "bubble" impression
      vec2 refractUv = uv - dir * bulge * 0.06 * uStrength;

      // Background gradient sampled at refracted coords
      float g = mix(0.06, 0.12, refractUv.y);

      // Add cursor highlight
      float highlight = smoothstep(0.22, 0.0, dist) * 0.25 * uStrength;

      vec3 col = vec3(g + highlight);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function BubbleCanvas({ strength = 1.0 }: { strength?: number }) {
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse globally so Canvas can be pointer-events: none
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mouse.current.x = e.clientX / w;
      mouse.current.y = 1.0 - e.clientY / h; // flip Y to match UV space
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Feed mouse to shader each frame
  function MouseUniformUpdater() {
    const { scene } = useThree();
    useFrame(() => {
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
          const apply = (m: THREE.Material | undefined) => {
            const sm = m as unknown as THREE.ShaderMaterial | undefined;
            if (sm && (sm as any).uniforms && (sm as any).uniforms.uMouse) {
              (sm.uniforms.uMouse as THREE.IUniform).value.set(
                mouse.current.x,
                mouse.current.y
              );
            }
          };
          if (Array.isArray(mat)) mat.forEach(apply);
          else apply(mat);
        }
      });
    });
    return null;
  }

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <MouseUniformUpdater />
        <BubblePlane strength={strength} />
      </Canvas>
    </div>
  );
}
