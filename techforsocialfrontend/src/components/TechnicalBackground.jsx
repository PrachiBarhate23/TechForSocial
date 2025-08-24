import React, { useEffect, useRef } from "react";

const TechnicalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Network nodes - positioned in bottom 60% of screen
    const nodes = [];
    const nodeCount = 120;
    const maxDistance = 150;

    // Create nodes concentrated in lower part of screen
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: (canvas.height * 0.5) + (Math.random() * canvas.height * 0.5), // Bottom 60%
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.4 + 0.6,
        pulseSpeed: Math.random() * 0.03 + 0.02,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Bounce off edges but keep in bottom area
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < canvas.height * 0.4 || node.y > canvas.height) node.vy *= -1;

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(canvas.height * 0.4, Math.min(canvas.height, node.y));

        // Draw connections
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.4;
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });

        // Draw node with glow
        const pulseSize = Math.sin(node.pulse) * 1 + 1;
        
        // Outer glow
        ctx.shadowColor = "rgba(100, 200, 255, 0.8)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${node.opacity * 0.3})`;
        ctx.fill();
        
        // Inner bright node
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity})`;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="technical-background">
      <canvas ref={canvasRef} className="network-canvas" />
    </div>
  );
};

export default TechnicalBackground;