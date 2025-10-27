import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

// Fresnel Material
function getFresnelMat({ rimHex = 0x97ceff, facingHex = 0x111111 } = {}) {
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  const vertexShader = `
    uniform float fresnelBias;
    uniform float fresnelScale;
    uniform float fresnelPower;
    varying float vReflectionFactor;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
      vec3 I = worldPosition.xyz - cameraPosition;
      vReflectionFactor = fresnelBias + fresnelScale * pow(1.0 + dot(normalize(I), worldNormal), fresnelPower);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 color1;
    uniform vec3 color2;
    varying float vReflectionFactor;
    void main() {
      float f = clamp(vReflectionFactor, 0.0, 1.0);
      gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
}

function Stars({ count = 20000 }) {
  const starRef = useRef();

  useEffect(() => {
    // Globe effect: stars on sphere surface
    const starCount = 1500;
    const maxStarSize = 2.5;
    const minStarSize = 0.7;
    const radius = 120;
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      // Spherical coordinates
      const theta = Math.acos(2 * Math.random() - 1); 
      const phi = 2 * Math.PI * Math.random(); // [0, 2pi]
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      // Random size for each star
      sizes[i] = minStarSize + Math.random() * (maxStarSize - minStarSize);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));


    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size/2, size/2, size/8, size/2, size/2, size/2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(150,200,255,0.8)');
    gradient.addColorStop(0.4, 'rgba(100,150,255,0.4)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);


    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: maxStarSize,
      map: texture,
      transparent: true,
      alphaTest: 0.01,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const stars = new THREE.Points(geometry, material);
    starRef.current.add(stars);
  }, []);


  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.00025;
    }
  });

  return <group ref={starRef} />;
}

function Globe() {
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0005;
    }
  });

  const fresnelMaterial = getFresnelMat();

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[100, 64, 64]} />
      <primitive object={fresnelMaterial} attach="material" />
    </mesh>
  );
}

function CameraAnimation({ contentRef }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 360); 
    gsap.to(camera.position, {
      z: 0,
      duration: 4,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
      onComplete: () => {
        if (contentRef && contentRef.current) {
          contentRef.current.style.opacity = 1;
        }
      },
    });
  }, [camera, contentRef]);

  return null;
}

export default function GlobeEntry() {
  const contentRef = useRef(null);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }} style={{ background: "transparent" }}>
        <CameraAnimation contentRef={contentRef} />
        <Stars count={20000} />
      </Canvas>
    </div>
  );
}
