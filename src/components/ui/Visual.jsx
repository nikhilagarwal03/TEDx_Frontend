import React, { useRef, useEffect } from "react";

const Visual = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Detect if mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;

    // Configuration - Adjusted for mobile performance
    const waveCount = isMobile ? 3 : 5; // Fewer waves on mobile
    const points = isMobile ? 100 : 200; // Lower resolution on mobile
    const baseAmplitude = isMobile ? 40 : 80; 
    const baseSpeed = 0.002;
    const tedRed = "255, 32, 32"; 

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let tick = 0;

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      const cy = height / 2;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        
        const opacity = 1 - (i / waveCount); 
        ctx.lineWidth = isMobile ? 1.5 : (2 - (i * 0.3));
        ctx.strokeStyle = `rgba(${tedRed}, ${opacity * 1.0})`;

        for (let x = 0; x <= width; x += width / points) {
          const yOffset = 
            Math.sin(x * 0.003 + tick + i) * baseAmplitude * Math.sin(tick * 0.5) +
            Math.cos(x * 0.005 - tick) * (baseAmplitude * 0.5);
            
          ctx.lineTo(x, cy + yOffset);
        }
        
        ctx.stroke();
      }

      tick += baseSpeed * 10;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: "#541f1fff" }} 
    />
  );
};

export default Visual;