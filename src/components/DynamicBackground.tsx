import { useEffect, useRef } from 'react';

const DynamicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      time += 0.002;

      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create gradient layers
      const gradient1 = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time) * 0.2),
        canvas.height * (0.5 + Math.cos(time) * 0.2),
        0,
        canvas.width * (0.5 + Math.sin(time) * 0.2),
        canvas.height * (0.5 + Math.cos(time) * 0.2),
        canvas.width * 0.8
      );

      gradient1.addColorStop(0, 'rgba(212, 175, 55, 0.15)'); // Gold
      gradient1.addColorStop(0.5, 'rgba(212, 175, 55, 0.05)');
      gradient1.addColorStop(1, 'rgba(10, 10, 10, 0)');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Second gradient layer
      const gradient2 = ctx.createRadialGradient(
        canvas.width * (0.3 + Math.cos(time * 0.7) * 0.3),
        canvas.height * (0.7 + Math.sin(time * 0.7) * 0.3),
        0,
        canvas.width * (0.3 + Math.cos(time * 0.7) * 0.3),
        canvas.height * (0.7 + Math.sin(time * 0.7) * 0.3),
        canvas.width * 0.6
      );

      gradient2.addColorStop(0, 'rgba(85, 130, 150, 0.1)'); // Platinum blue
      gradient2.addColorStop(0.5, 'rgba(85, 130, 150, 0.03)');
      gradient2.addColorStop(1, 'rgba(10, 10, 10, 0)');

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Third gradient layer
      const gradient3 = ctx.createRadialGradient(
        canvas.width * (0.8 + Math.sin(time * 1.2) * 0.15),
        canvas.height * (0.3 + Math.cos(time * 1.2) * 0.15),
        0,
        canvas.width * (0.8 + Math.sin(time * 1.2) * 0.15),
        canvas.height * (0.3 + Math.cos(time * 1.2) * 0.15),
        canvas.width * 0.5
      );

      gradient3.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
      gradient3.addColorStop(0.5, 'rgba(212, 175, 55, 0.02)');
      gradient3.addColorStop(1, 'rgba(10, 10, 10, 0)');

      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle noise/grain effect
      ctx.globalAlpha = 0.03;
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default DynamicBackground;
