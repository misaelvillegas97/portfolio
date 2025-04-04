import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  baseOpacity: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;
    const STAR_COUNT = 200;
    const STAR_SPEED = 0.15; // Reduced from 0.5 to 0.15 for slower movement

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStar = (forceY = false): Star => {
      return {
        x: Math.random() * canvas.width,
        y: forceY ? Math.random() * canvas.height : canvas.height,
        size: Math.random() * 1.2 + 0.3, // Reduced size range from (2 + 1) to (1.2 + 0.3)
        brightness: Math.random(),
        twinkleSpeed: 0.02 + Math.random() * 0.03, // Slightly slower twinkling
        baseOpacity: 0.15 + Math.random() * 0.35 // Slightly reduced opacity range
      };
    };

    const initStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => createStar(true));
    };

    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#090a0f'); // Darker top
      gradient.addColorStop(0.5, '#0d1117'); // Darker middle
      gradient.addColorStop(1, '#161b22'); // Darker bottom
      return gradient;
    };

    const updateStar = (star: Star) => {
      // Move star upward
      star.y -= STAR_SPEED;

      // Update twinkling effect
      star.brightness += star.twinkleSpeed;
      if (star.brightness > 1 || star.brightness < 0) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }

      // Reset star position when it goes off screen
      if (star.y < -10) {
        Object.assign(star, createStar());
      }
    };

    const drawStar = (star: Star) => {
      if (!ctx) return;

      const opacity = star.baseOpacity + (star.brightness * 0.3); // Reduced brightness impact
      const glow = star.size * (1 + star.brightness * 0.3); // Reduced glow effect

      // Draw the main star point
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();

      // Add glow effect
      ctx.beginPath();
      ctx.arc(star.x, star.y, glow, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.2})`; // Reduced glow opacity
      ctx.fill();
    };

    const animate = () => {
      if (!ctx) return;

      // Draw gradient background
      ctx.fillStyle = createGradient();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        updateStar(star);
        drawStar(star);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    };

    resizeCanvas();
    initStars();
    animate();

    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}