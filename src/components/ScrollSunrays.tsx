import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

export function ScrollSunrays() {
  const { scrollYProgress } = useScroll();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, docHeight: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      setDimensions({ 
        width: window.innerWidth, 
        height: window.innerHeight,
        docHeight: docHeight 
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    // Also update when content loads
    setTimeout(updateDimensions, 1000);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Logo position (center of screen in Hero section)
  const logoX = dimensions.width / 2;
  const logoY = dimensions.height / 2;

  // Create multiple sets of rays with different properties
  const rayConfigs = [
    // Main directional rays - extend through entire document
    {
      count: 16,
      startAngle: 0,
      angleSpread: 360,
      length: dimensions.docHeight,
      width: 3,
      opacity: 0.6,
      speed: 2.5,
      color: '#d49d43'
    },
    // Secondary shorter rays
    {
      count: 24,
      startAngle: 15,
      angleSpread: 360,
      length: dimensions.docHeight * 0.8,
      width: 2,
      opacity: 0.4,
      speed: 2,
      color: '#d49d43'
    },
    // Ambient long rays - these extend beyond the document
    {
      count: 12,
      startAngle: 0,
      angleSpread: 360,
      length: dimensions.docHeight * 1.2,
      width: 4,
      opacity: 0.25,
      speed: 3.5,
      color: '#d49d43'
    },
    // Abstract diagonal rays
    {
      count: 20,
      startAngle: 45,
      angleSpread: 180,
      length: dimensions.docHeight * 0.9,
      width: 2,
      opacity: 0.45,
      speed: 2.2,
      color: '#d49d43'
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden sunray-container" style={{ zIndex: 1 }}>
      {rayConfigs.map((config, configIndex) => (
        <div key={`config-${configIndex}`} className="absolute inset-0">
          {Array.from({ length: config.count }, (_, i) => {
            // Calculate angle for this ray
            const angle = config.startAngle + (i / config.count) * config.angleSpread + Math.random() * 20 - 10;
            const angleRad = (angle * Math.PI) / 180;
            
            // Calculate end position
            const endX = logoX + Math.cos(angleRad) * config.length;
            const endY = logoY + Math.sin(angleRad) * config.length;
            
            // Transform based on scroll - rays flow downward through entire document
            const scrollOffset = dimensions.docHeight * config.speed;
            const yTransform = useTransform(
              scrollYProgress,
              [0, 1],
              [0, scrollOffset]
            );
            
            // Add some subtle rotation based on scroll
            const rotateTransform = useTransform(
              scrollYProgress,
              [0, 1],
              [0, 10 + Math.random() * 20]
            );

            return (
              <motion.div
                key={`ray-${configIndex}-${i}`}
                className="absolute origin-top-left"
                style={{
                  left: logoX,
                  top: logoY,
                  width: config.length,
                  height: config.width,
                  backgroundColor: config.color,
                  opacity: config.opacity,
                  rotate: angle,
                  y: yTransform,
                  rotateZ: rotateTransform,
                  boxShadow: `0 0 ${config.width * 3}px ${config.color}80, 0 0 ${config.width * 6}px ${config.color}40`,
                }}
                initial={{ 
                  scaleX: 0,
                  opacity: 0 
                }}
                animate={{
                  scaleX: [0, 1, 0.8, 1],
                  opacity: [0, config.opacity * 0.5, config.opacity, config.opacity * 0.7, config.opacity],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Additional flowing particles that follow the rays */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }, (_, i) => {
          const angle = Math.random() * 360;
          const angleRad = (angle * Math.PI) / 180;
          const distance = 100 + Math.random() * 200;
          
          const startX = logoX + Math.cos(angleRad) * distance;
          const startY = logoY + Math.sin(angleRad) * distance;
          
          const particleSpeed = 1.5 + Math.random();
          const scrollDistance = dimensions.docHeight * particleSpeed;
          
          const yTransform = useTransform(
            scrollYProgress,
            [0, 1],
            [0, scrollDistance]
          );

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-primary"
              style={{
                left: startX,
                top: startY,
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                y: yTransform,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0.3, 0.6, 0],
                scale: [0, 1.5, 0.8, 1.2, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Subtle golden gradient overlay that moves with scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${logoX}px ${logoY}px, rgba(212, 157, 67, 0.1) 0%, transparent 40%)`,
          y: useTransform(scrollYProgress, [0, 1], [0, dimensions.height * 0.5]),
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.4, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Abstract flowing lines that complement the rays */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => {
          const startX = Math.random() * dimensions.width;
          const lineLength = dimensions.docHeight * (0.8 + Math.random() * 0.4);
          const lineAngle = -20 + Math.random() * 40; // More vertical tendency
          
          const flowSpeed = 1.2 + Math.random() * 0.8;
          const yTransform = useTransform(
            scrollYProgress,
            [0, 1],
            [-dimensions.height * 0.2, dimensions.docHeight * flowSpeed]
          );

          return (
            <motion.div
              key={`flow-line-${i}`}
              className="absolute bg-primary/20"
              style={{
                left: startX,
                top: 0,
                width: 1,
                height: lineLength,
                rotate: lineAngle,
                y: yTransform,
                boxShadow: '0 0 2px rgba(212, 157, 67, 0.3)',
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.4, 0.2, 0.3],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
    </div>
  );
}