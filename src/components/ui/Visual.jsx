// // // // // 1. default Visual 
// // import React, { useRef, useEffect } from "react";

// // const Visual = () => {
// //   const canvasRef = useRef(null);
// //   const mouse = useRef({ x: 0, y: 0, active: false });

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     let particles = [];
// //     let animationFrameId;

// //     const isMobile = window.innerWidth < 768;
// //     const particleCount = isMobile ? 50 : 120;
// //     const reach = 180; // Wider connection reach for better visibility
// //     const mouseRadius = 300; 
// //     const tedRed = "235, 0, 40"; 

// //     const handleResize = () => {
// //       canvas.width = window.innerWidth;
// //       canvas.height = window.innerHeight;
// //       init();
// //     };

// //     const handleMouseMove = (e) => {
// //       mouse.current.x = e.clientX;
// //       mouse.current.y = e.clientY;
// //       mouse.current.active = true;
// //     };

// //     window.addEventListener("resize", handleResize);
// //     window.addEventListener("mousemove", handleMouseMove);

// //     class Particle {
// //       constructor() {
// //         this.init();
// //       }

// //       init() {
// //         this.x = Math.random() * canvas.width;
// //         this.y = Math.random() * canvas.height;
// //         // Faster base movement for immediate visibility
// //         this.vx = (Math.random() - 0.5) * 0.8; 
// //         this.vy = (Math.random() - 0.5) * 0.8;
// //         this.size = Math.random() * 3 + 2; // Larger, more visible nodes
// //         this.pulse = Math.random() * Math.PI;
// //       }

// //       update() {
// //         if (mouse.current.active) {
// //           const dx = mouse.current.x - this.x;
// //           const dy = mouse.current.y - this.y;
// //           const distance = Math.sqrt(dx * dx + dy * dy);

// //           if (distance < mouseRadius) {
// //             const force = (mouseRadius - distance) / mouseRadius;
// //             const angle = Math.atan2(dy, dx);
// //             // High-sensitivity reactive warp
// //             this.x -= Math.cos(angle) * force * 6; 
// //             this.y -= Math.sin(angle) * force * 6;
// //           }
// //         }

// //         this.x += this.vx;
// //         this.y += this.vy;
// //         this.pulse += 0.03;

// //         if (this.x < 0) this.x = canvas.width;
// //         if (this.x > canvas.width) this.x = 0;
// //         if (this.y < 0) this.y = canvas.height;
// //         if (this.y > canvas.height) this.y = 0;
// //       }

// //       draw() {
// //         // Glowing nodes
// //         const opacity = 0.6 + Math.sin(this.pulse) * 0.4;
// //         ctx.fillStyle = `rgba(${tedRed}, ${opacity})`;
// //         ctx.shadowBlur = 15;
// //         ctx.shadowColor = `rgba(${tedRed}, 0.8)`;
// //         ctx.beginPath();
// //         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
// //         ctx.fill();
// //         ctx.shadowBlur = 0;
// //       }
// //     }

// //     function init() {
// //       particles = [];
// //       for (let i = 0; i < particleCount; i++) {
// //         particles.push(new Particle());
// //       }
// //     }

// //     function animate() {
// //       // Deep black background
// //       ctx.fillStyle = "#000000";
// //       ctx.fillRect(0, 0, canvas.width, canvas.height);

// //       for (let i = 0; i < particles.length; i++) {
// //         const p1 = particles[i];
// //         p1.update();
// //         p1.draw();

// //         for (let j = i + 1; j < particles.length; j++) {
// //           const p2 = particles[j];
// //           const dx = p1.x - p2.x;
// //           const dy = p1.y - p2.y;
// //           const dist = Math.sqrt(dx * dx + dy * dy);

// //           if (dist < reach) {
// //             // Highly visible white-to-red gradient connections
// //             const opacity = (1 - dist / reach) * 0.4;
// //             ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
// //             ctx.lineWidth = (1 - dist / reach) * 1.5;
// //             ctx.beginPath();
// //             ctx.moveTo(p1.x, p1.y);
// //             ctx.lineTo(p2.x, p2.y);
// //             ctx.stroke();
// //           }
// //         }
// //       }
// //       animationFrameId = requestAnimationFrame(animate);
// //     }

// //     handleResize();
// //     animate();

// //     return () => {
// //       window.removeEventListener("resize", handleResize);
// //       window.removeEventListener("mousemove", handleMouseMove);
// //       cancelAnimationFrame(animationFrameId);
// //     };
// //   }, []);

// //   return (
// //     <div className="absolute inset-0 z-0 bg-black">
// //       {/* VIBRANT BACKGROUND CORE - Makes it visible at first sight */}
// //       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(235,0,40,0.15)_0%,_transparent_60%)] animate-pulse-slow" />
// //       <canvas ref={canvasRef} className="w-full h-full block" />
// //     </div>
// //   );
// // };

// // export default Visual;

// // // // // 2. Echo Ripples + Particles
// import React, { useRef, useEffect } from "react";

// const Visual = () => {
//   const canvasRef = useRef(null);
//   const mouse = useRef({ x: 0, y: 0, active: false });
//   const ripples = useRef([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     let particles = [];
//     let animationId;

//     const isMobile = window.innerWidth < 768;
//     const particleCount = isMobile ? 40 : 100;
//     const reach = 160;
//     const mouseRadius = 260;
//     const tedRed = "235,0,40";

//     class Ripple {
//       constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.radius = 0;
//         this.opacity = 0.35;
//       }

//       update() {
//         this.radius += 3;
//         this.opacity -= 0.004;
//       }

//       draw() {
//         if (this.opacity <= 0) return;
//         ctx.strokeStyle = `rgba(${tedRed},${this.opacity})`;
//         ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.stroke();
//       }
//     }

//     class Particle {
//       constructor() {
//         this.reset();
//       }

//       reset() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.vx = (Math.random() - 0.5) * 0.6;
//         this.vy = (Math.random() - 0.5) * 0.6;
//         this.size = Math.random() * 2.5 + 1.5;
//         this.pulse = Math.random() * Math.PI * 2;
//       }

//       update() {
//         if (mouse.current.active) {
//           const dx = mouse.current.x - this.x;
//           const dy = mouse.current.y - this.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < mouseRadius) {
//             const force = (mouseRadius - dist) / mouseRadius;
//             this.x -= dx * force * 0.03;
//             this.y -= dy * force * 0.03;
//           }
//         }

//         this.x += this.vx;
//         this.y += this.vy;
//         this.pulse += 0.02;

//         if (this.x < 0) this.x = canvas.width;
//         if (this.x > canvas.width) this.x = 0;
//         if (this.y < 0) this.y = canvas.height;
//         if (this.y > canvas.height) this.y = 0;
//       }

//       draw() {
//         const glow = 0.5 + Math.sin(this.pulse) * 0.3;
//         ctx.fillStyle = `rgba(${tedRed},${glow})`;
//         ctx.shadowBlur = 12;
//         ctx.shadowColor = `rgba(${tedRed},0.6)`;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.shadowBlur = 0;
//       }
//     }

//     const init = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       particles = [];
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//       }
//     };

//     const animate = () => {
//       ctx.fillStyle = "#000";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Ripples
//       ripples.current.forEach((r) => {
//         r.update();
//         r.draw();
//       });
//       ripples.current = ripples.current.filter(r => r.opacity > 0);

//       particles.forEach((p, i) => {
//         p.update();
//         p.draw();

//         for (let j = i + 1; j < particles.length; j++) {
//           const q = particles[j];
//           const dx = p.x - q.x;
//           const dy = p.y - q.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < reach) {
//             ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / reach) * 0.25})`;
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.moveTo(p.x, p.y);
//             ctx.lineTo(q.x, q.y);
//             ctx.stroke();
//           }
//         }
//       });

//       animationId = requestAnimationFrame(animate);
//     };

//     const onMouseMove = (e) => {
//       mouse.current = { x: e.clientX, y: e.clientY, active: true };
//       if (ripples.current.length < 5) {
//         ripples.current.push(new Ripple(e.clientX, e.clientY));
//       }
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("resize", init);

//     init();
//     animate();

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("resize", init);
//     };
//   }, []);

//   return (
//     <div className="absolute inset-0 bg-black">
//       <canvas ref={canvasRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default Visual;

// // // // 3. Constellation Visual
// import React, { useRef, useEffect } from "react";

// const Visual = () => {
//   const canvasRef = useRef(null);
//   const mouse = useRef({ x: 0, y: 0, active: false });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     let particles = [];
//     let animationId;

//     const isMobile = window.innerWidth < 768;
//     const particleCount = isMobile ? 35 : 90;
//     const interactionRadius = 220;
//     const connectRadius = 140;
//     const tedRed = "235,0,40";

//     class Particle {
//       constructor() {
//         this.reset();
//       }

//       reset() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.vx = (Math.random() - 0.5) * 0.2;
//         this.vy = (Math.random() - 0.5) * 0.2;
//         this.baseSize = Math.random() * 1.5 + 1;
//         this.size = this.baseSize;
//         this.pulse = Math.random() * Math.PI * 2;
//         this.active = false;
//       }

//       update() {
//         this.active = false;

//         if (mouse.current.active) {
//           const dx = mouse.current.x - this.x;
//           const dy = mouse.current.y - this.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < interactionRadius) {
//             this.active = true;
//             this.size = this.baseSize + (1 - dist / interactionRadius) * 2.5;
//             this.pulse += 0.15;
//           } else {
//             this.size += (this.baseSize - this.size) * 0.05;
//           }
//         }

//         this.x += this.vx;
//         this.y += this.vy;

//         if (this.x < 0) this.x = canvas.width;
//         if (this.x > canvas.width) this.x = 0;
//         if (this.y < 0) this.y = canvas.height;
//         if (this.y > canvas.height) this.y = 0;
//       }

//       draw() {
//         const opacity = this.active ? 0.9 : 0.4;
//         ctx.fillStyle = `rgba(${tedRed},${opacity})`;
//         ctx.shadowBlur = this.active ? 14 : 6;
//         ctx.shadowColor = `rgba(${tedRed},0.6)`;

//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.shadowBlur = 0;
//       }
//     }

//     const init = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       particles = [];

//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//       }
//     };

//     const animate = () => {
//       ctx.fillStyle = "#000";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((p) => p.update());

//       // Draw connections ONLY if mouse is nearby
//       if (mouse.current.active) {
//         for (let i = 0; i < particles.length; i++) {
//           for (let j = i + 1; j < particles.length; j++) {
//             const a = particles[i];
//             const b = particles[j];

//             if (!a.active || !b.active) continue;

//             const dx = a.x - b.x;
//             const dy = a.y - b.y;
//             const dist = Math.sqrt(dx * dx + dy * dy);

//             if (dist < connectRadius) {
//               ctx.strokeStyle = `rgba(255,255,255,${
//                 (1 - dist / connectRadius) * 0.35
//               })`;
//               ctx.lineWidth = 1;
//               ctx.beginPath();
//               ctx.moveTo(a.x, a.y);
//               ctx.lineTo(b.x, b.y);
//               ctx.stroke();
//             }
//           }
//         }
//       }

//       particles.forEach((p) => p.draw());
//       animationId = requestAnimationFrame(animate);
//     };

//     const onMouseMove = (e) => {
//       mouse.current.x = e.clientX;
//       mouse.current.y = e.clientY;
//       mouse.current.active = true;
//     };

//     const onMouseLeave = () => {
//       mouse.current.active = false;
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseleave", onMouseLeave);
//     window.addEventListener("resize", init);

//     init();
//     animate();

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseleave", onMouseLeave);
//       window.removeEventListener("resize", init);
//     };
//   }, []);

//   return (
//     <div className="absolute inset-0 bg-black">
//       <canvas ref={canvasRef} className="w-full h-full block" />
//     </div>
//   );
// };

// export default Visual;

// // // 4. Particle 
// import React, { useRef, useEffect } from "react";

// const Visual = () => {
//   const canvasRef = useRef(null);
//   const mouse = useRef({ x: 0, y: 0, active: false });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     let particles = [];
//     let animationId;

//     const isMobile = window.innerWidth < 768;
//     const particleCount = isMobile ? 30 : 80;
//     const mouseRadius = 260;
//     const tedRed = "235,0,40";

//     class Particle {
//       constructor() {
//         this.reset();
//       }

//       reset() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.vx = (Math.random() - 0.5) * 0.7;
//         this.vy = (Math.random() - 0.5) * 0.7;
//         this.size = Math.random() * 2 + 1;
//       }

//       update() {
//         if (mouse.current.active) {
//           const dx = mouse.current.x - this.x;
//           const dy = mouse.current.y - this.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < mouseRadius) {
//             const force = (mouseRadius - dist) / mouseRadius;
//             this.x -= dx * force * 0.04;
//             this.y -= dy * force * 0.04;
//           }
//         }

//         this.x += this.vx;
//         this.y += this.vy;

//         if (this.x < 0) this.x = canvas.width;
//         if (this.x > canvas.width) this.x = 0;
//         if (this.y < 0) this.y = canvas.height;
//         if (this.y > canvas.height) this.y = 0;
//       }

//       draw() {
//         ctx.fillStyle = `rgba(${tedRed},0.8)`;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }

//     const init = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       particles = [];

//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//       }
//     };

//     const animate = () => {
//       // TRAIL EFFECT: draw black with low opacity
//       ctx.fillStyle = "rgba(0,0,0,0.15)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((p) => {
//         p.update();
//         p.draw();
//       });

//       animationId = requestAnimationFrame(animate);
//     };

//     const onMouseMove = (e) => {
//       mouse.current.x = e.clientX;
//       mouse.current.y = e.clientY;
//       mouse.current.active = true;
//     };

//     const onMouseLeave = () => {
//       mouse.current.active = false;
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseleave", onMouseLeave);
//     window.addEventListener("resize", init);

//     init();
//     animate();

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseleave", onMouseLeave);
//       window.removeEventListener("resize", init);
//     };
//   }, []);

//   return (
//     <div className="absolute inset-0 bg-black">
//       <canvas ref={canvasRef} className="w-full h-full block" />
//     </div>
//   );
// };

// export default Visual;

// // 5. Magnetic Field Lines Visual
import React, { useRef, useEffect } from "react";

const Visual = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationId;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 45 : 130;
    const mouseRadius = 360;
    const tedRed = "235,0,40";

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        // Slower base motion = longer readable lines
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      update() {
        if (mouse.current.active) {
          const dx = this.x - mouse.current.x;
          const dy = this.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 1.6;
            const angle = Math.atan2(dy, dx) + Math.PI / 2;

            this.vx += Math.cos(angle) * force;
            this.vy += Math.sin(angle) * force;
          }
        }

        // Strong damping → smooth continuous curves
        this.vx *= 0.92;
        this.vy *= 0.92;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        const tailX = this.x - this.vx * 22;
        const tailY = this.y - this.vy * 22;

        // 🔴 PASS 1: Sharp core line (clarity)
        ctx.strokeStyle = `rgba(${tedRed},0.95)`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // 🔴 PASS 2: Soft glow (controlled, not blurry)
        ctx.strokeStyle = `rgba(${tedRed},0.45)`;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Much less fade → lines stay visible
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle center emphasis (NOT haze)
      const g = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.55
      );
      g.addColorStop(0, "rgba(235,0,40,0.05)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    const onMouseLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", init);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default Visual;

// // 6. Elastic Mesh Visual
// import React, { useRef, useEffect } from "react";

// const Visual = () => {
//   const canvasRef = useRef(null);
//   const mouse = useRef({ x: 0, y: 0, active: false });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     let points = [];
//     let animationId;

//     const spacing = 80; // distance between grid points
//     const distortionRadius = 220;
//     const tedRed = "235,0,40";

//     class Point {
//       constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.ox = x;
//         this.oy = y;
//         this.vx = 0;
//         this.vy = 0;
//       }

//       update() {
//         if (mouse.current.active) {
//           const dx = this.x - mouse.current.x;
//           const dy = this.y - mouse.current.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < distortionRadius) {
//             const force = (1 - dist / distortionRadius) * 18;
//             const angle = Math.atan2(dy, dx);

//             this.vx += Math.cos(angle) * force;
//             this.vy += Math.sin(angle) * force;
//           }
//         }

//         // Elastic return to origin
//         this.vx += (this.ox - this.x) * 0.04;
//         this.vy += (this.oy - this.y) * 0.04;

//         // Damping
//         this.vx *= 0.85;
//         this.vy *= 0.85;

//         this.x += this.vx;
//         this.y += this.vy;
//       }
//     }

//     const init = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       points = [];

//       for (let y = 0; y < canvas.height + spacing; y += spacing) {
//         for (let x = 0; x < canvas.width + spacing; x += spacing) {
//           points.push(new Point(x, y));
//         }
//       }
//     };

//     const animate = () => {
//       ctx.fillStyle = "#000";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       points.forEach((p) => p.update());

//       // Draw horizontal lines
//       ctx.strokeStyle = `rgba(${tedRed},0.85)`;
//       ctx.lineWidth = 1.4;

//       for (let y = 0; y < canvas.height / spacing; y++) {
//         ctx.beginPath();
//         for (let x = 0; x < canvas.width / spacing; x++) {
//           const i = y * Math.floor(canvas.width / spacing) + x;
//           const p = points[i];
//           if (p) {
//             ctx.lineTo(p.x, p.y);
//           }
//         }
//         ctx.stroke();
//       }

//       // Draw vertical lines
//       ctx.strokeStyle = `rgba(${tedRed},0.45)`;
//       ctx.lineWidth = 1;

//       for (let x = 0; x < canvas.width / spacing; x++) {
//         ctx.beginPath();
//         for (let y = 0; y < canvas.height / spacing; y++) {
//           const i = y * Math.floor(canvas.width / spacing) + x;
//           const p = points[i];
//           if (p) {
//             ctx.lineTo(p.x, p.y);
//           }
//         }
//         ctx.stroke();
//       }

//       animationId = requestAnimationFrame(animate);
//     };

//     const onMouseMove = (e) => {
//       mouse.current.x = e.clientX;
//       mouse.current.y = e.clientY;
//       mouse.current.active = true;
//     };

//     const onMouseLeave = () => {
//       mouse.current.active = false;
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseleave", onMouseLeave);
//     window.addEventListener("resize", init);

//     init();
//     animate();

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseleave", onMouseLeave);
//       window.removeEventListener("resize", init);
//     };
//   }, []);

//   return (
//     <div className="absolute inset-0 bg-black">
//       <canvas ref={canvasRef} className="w-full h-full block" />
//     </div>
//   );
// };

// export default Visual;
