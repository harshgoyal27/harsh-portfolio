import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.015);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Dynamic Texture Generation (Dynamic Canvas Bokeh Sprite) ---
    const createBokehTexture = (isPurple: boolean) => {
      const size = 128;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const gradient = ctx.createRadialGradient(
          size / 2, size / 2, 0,
          size / 2, size / 2, size / 2
        );
        
        if (isPurple) {
          // Glowing violet/purple bokeh matching the chip
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
          gradient.addColorStop(0.25, 'rgba(168, 85, 247, 0.75)'); // Purple-500
          gradient.addColorStop(0.55, 'rgba(126, 34, 206, 0.25)'); // Violet-700
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          // Soft blue-white bokeh
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          gradient.addColorStop(0.35, 'rgba(220, 235, 255, 0.35)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      
      return new THREE.CanvasTexture(canvas);
    };

    const purpleTexture = createBokehTexture(true);
    const whiteTexture = createBokehTexture(false);

    // --- Particle System Generation ---
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialOffsets = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const particleTypes = new Float32Array(particleCount); // 0 = purple, 1 = white

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 25 - 5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialOffsets[i * 3] = x;
      initialOffsets[i * 3 + 1] = Math.random() * 200; // time offset
      initialOffsets[i * 3 + 2] = Math.random() * 1.4 + 0.6; // speed factor

      scales[i] = Math.random() * 0.75 + 0.25;
      particleTypes[i] = Math.random() > 0.45 ? 0 : 1; // 55% purple, 45% white
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Points Materials
    const purpleMaterial = new THREE.PointsMaterial({
      size: 1.5,
      map: purpleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
    });

    const whiteMaterial = new THREE.PointsMaterial({
      size: 1.0,
      map: whiteTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.55,
    });

    // Segment Positions for Separate Rendering
    const purplePositions: number[] = [];
    const whitePositions: number[] = [];
    const purpleIndices: number[] = [];
    const whiteIndices: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      if (particleTypes[i] === 0) {
        purplePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        purpleIndices.push(i);
      } else {
        whitePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        whiteIndices.push(i);
      }
    }

    const purpleGeo = new THREE.BufferGeometry();
    purpleGeo.setAttribute('position', new THREE.Float32BufferAttribute(purplePositions, 3));
    const purplePoints = new THREE.Points(purpleGeo, purpleMaterial);
    scene.add(purplePoints);

    const whiteGeo = new THREE.BufferGeometry();
    whiteGeo.setAttribute('position', new THREE.Float32BufferAttribute(whitePositions, 3));
    const whitePoints = new THREE.Points(whiteGeo, whiteMaterial);
    scene.add(whitePoints);

    // --- Interactive Mouse Parallax Coordinates ---
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Resizing Event ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Purple Particles Drift
      const oPosAttr = purpleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < purpleIndices.length; i++) {
        const idx = purpleIndices[i];
        const initialX = initialOffsets[idx * 3];
        const offsetVal = initialOffsets[idx * 3 + 1];
        const speedMult = initialOffsets[idx * 3 + 2];

        let y = oPosAttr.getY(i);
        y += 0.015 * speedMult;

        if (y > 22) y = -22;

        const x = initialX + Math.sin(elapsedTime * 0.35 + offsetVal) * 1.3;
        
        oPosAttr.setX(i, x);
        oPosAttr.setY(i, y);
      }
      oPosAttr.needsUpdate = true;

      // White Particles Drift
      const wPosAttr = whiteGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < whiteIndices.length; i++) {
        const idx = whiteIndices[i];
        const initialX = initialOffsets[idx * 3];
        const offsetVal = initialOffsets[idx * 3 + 1];
        const speedMult = initialOffsets[idx * 3 + 2];

        let y = wPosAttr.getY(i);
        y += 0.012 * speedMult;

        if (y > 22) y = -22;

        const x = initialX + Math.sin(elapsedTime * 0.25 + offsetVal) * 1.0;

        wPosAttr.setX(i, x);
        wPosAttr.setY(i, y);
      }
      wPosAttr.needsUpdate = true;

      // Camera Mouse Parallax
      targetCameraX = mouseX * 4.0;
      targetCameraY = mouseY * 2.0;

      camera.position.x += (targetCameraX - camera.position.x) * 0.035;
      camera.position.y += (targetCameraY - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup & Garbage Collection ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      purplePoints.geometry.dispose();
      whitePoints.geometry.dispose();
      purpleMaterial.dispose();
      whiteMaterial.dispose();
      purpleTexture.dispose();
      whiteTexture.dispose();
      
      scene.clear();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden opacity-90"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
