"use client";

import { useEffect, useRef } from 'react';

interface LightWave {
  phase: number;
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
  opacity: number;
}

export default function LightWavesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavesRef = useRef<LightWave[]>([]);
  const animationFrameIdRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas
    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Create light waves with Sitecore colors (30% slower)
      wavesRef.current = [
        {
          phase: 0,
          amplitude: 60,
          frequency: 0.003,
          speed: 0.014,  // 30% slower (0.02 * 0.7)
          color: '235, 0, 26',     // Sitecore Red
          opacity: 0.15
        },
        {
          phase: Math.PI / 3,
          amplitude: 80,
          frequency: 0.002,
          speed: 0.0105, // 30% slower (0.015 * 0.7)
          color: '106, 27, 154',   // Sitecore Purple
          opacity: 0.12
        },
        {
          phase: Math.PI / 2,
          amplitude: 45,
          frequency: 0.004,
          speed: 0.0175, // 30% slower (0.025 * 0.7)
          color: '255, 42, 29',    // Lighter Red
          opacity: 0.1
        },
        {
          phase: Math.PI,
          amplitude: 70,
          frequency: 0.0025,
          speed: 0.0126, // 30% slower (0.018 * 0.7)
          color: '139, 92, 246',   // Light Purple
          opacity: 0.08
        }
      ];
    };

    // Handle window resize
    const handleResize = () => {
      setupCanvas();
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 1;

      // Create gradient background that fades from animated waves to white
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(248, 250, 252, 0.95)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.98)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing light waves with vertical fade
      wavesRef.current.forEach((wave, index) => {
        const currentPhase = wave.phase + timeRef.current * wave.speed;

        // Create gradient for the wave with vertical fade
        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

        // Wave is most visible in the top third, fades out towards bottom
        waveGradient.addColorStop(0, `rgba(${wave.color}, ${wave.opacity * 0.8})`);
        waveGradient.addColorStop(0.2, `rgba(${wave.color}, ${wave.opacity})`);
        waveGradient.addColorStop(0.5, `rgba(${wave.color}, ${wave.opacity * 0.3})`);
        waveGradient.addColorStop(0.7, `rgba(${wave.color}, ${wave.opacity * 0.1})`);
        waveGradient.addColorStop(1, `rgba(${wave.color}, 0)`);

        ctx.fillStyle = waveGradient;
        ctx.beginPath();

        // Calculate wave path - start higher up
        const baseY = canvas.height * (0.1 + index * 0.12);

        ctx.moveTo(0, baseY);

        for (let x = 0; x <= canvas.width; x += 2) {
          const y = baseY +
            Math.sin(x * wave.frequency + currentPhase) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + currentPhase * 1.5) * (wave.amplitude * 0.3);

          ctx.lineTo(x, y);
        }

        // Complete the wave shape
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Add flowing particles along the wave (only in upper portion)
        for (let i = 0; i < 2; i++) {
          const particleX = (timeRef.current * (wave.speed * 50) + i * canvas.width / 2) % canvas.width;
          const particleY = baseY +
            Math.sin(particleX * wave.frequency + currentPhase) * wave.amplitude +
            Math.sin(particleX * wave.frequency * 0.5 + currentPhase * 1.5) * (wave.amplitude * 0.3);

          // Only show particles in upper portion of screen
          if (particleY < canvas.height * 0.5) {
            const verticalFade = 1 - (particleY / (canvas.height * 0.5));
            const particleGradient = ctx.createRadialGradient(
              particleX, particleY, 0,
              particleX, particleY, 15
            );
            particleGradient.addColorStop(0, `rgba(${wave.color}, ${wave.opacity * 1.5 * verticalFade})`);
            particleGradient.addColorStop(1, `rgba(${wave.color}, 0)`);

            ctx.fillStyle = particleGradient;
            ctx.beginPath();
            ctx.arc(particleX, particleY, 12, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    setupCanvas();
    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
