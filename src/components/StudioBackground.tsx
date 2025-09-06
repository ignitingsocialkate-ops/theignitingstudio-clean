import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  shape: 'circle' | 'square' | 'triangle' | 'diamond';
  opacity: number;
  color: string;
}

interface NetworkNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

export function StudioBackground() {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, docHeight: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  
  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Global animation transforms at component level - responsive to scroll
  const gradientRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const gradientScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.5]);
  const lightBeamY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const lightBeamX = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Scroll-based opacity for different sections - subtle but visible
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.15]); // Start hidden in Hero
  const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0.2, 0.4]);
  const servicesOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0.3, 0.5]);
  const portfolioOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0.4, 0.6]);
  const contactOpacity = useTransform(scrollYProgress, [0.75, 1], [0.5, 0.4]);

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
    setTimeout(updateDimensions, 1000);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate particles
  useEffect(() => {
    if (dimensions.width === 0) return;
    
    const newParticles: Particle[] = [];
    const shapes: Particle['shape'][] = ['circle', 'square', 'triangle', 'diamond'];
    const colors = ['#d49d43', '#f2f1e5', '#2c2927'];
    
    for (let i = 0; i < 18; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height, // Use the viewport height
        size: Math.random() * 5 + 3,
        speed: Math.random() * 1.5 + 0.4,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: Math.random() * 0.08 + 0.04,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setParticles(newParticles);
  }, [dimensions]);

  // Generate network nodes
  useEffect(() => {
    if (dimensions.width === 0) return;
    
    const newNodes: NetworkNode[] = [];
    for (let i = 0; i < 8; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height, // Use the viewport height
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }
    
    // Create connections between nearby nodes
    newNodes.forEach((node, i) => {
      newNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 200 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });
    
    setNetworkNodes(newNodes);
  }, [dimensions]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ 
        zIndex: 0, // Below Hero content but visible
        top: 0, // Cover entire page from top
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
      }}
    >
      {/* Subtle but visible gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${gradientRotation}deg at 50% 50%, 
            rgba(212, 157, 67, 0.04) 0deg,
            rgba(242, 241, 229, 0.06) 90deg,
            rgba(44, 41, 39, 0.02) 180deg,
            rgba(212, 157, 67, 0.05) 270deg,
            rgba(242, 241, 229, 0.04) 360deg)`,
          scale: gradientScale,
          height: '100%',
          opacity: useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.6, 0.8]),
        }}
      />

      {/* Geometric Lines inspired by logo */}
      <div className="absolute inset-0">
        {/* Gentle geometric lines - visible but subtle */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`hero-line-${i}`}
            className="absolute bg-primary/25"
            style={{
              width: `${70 + i * 12}px`,
              height: '1.5px',
              left: `${i * 12}%`,
              top: `${12 + i * 10}%`,
              transformOrigin: 'center',
              boxShadow: '0 0 6px rgba(212, 157, 67, 0.2)',
              y: useTransform(scrollYProgress, [0, 1], [0, -50 - i * 10]),
              opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 1], [0, 0.3, 0.5, 0.2]),
            }}
            animate={{
              rotate: [0, 180],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gentle diagonal lines - visible but subtle */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`diagonal-${i}`}
            className="absolute bg-primary/18"
            style={{
              width: '2px',
              height: '70%',
              left: `${15 + i * 18}%`,
              top: '15%',
              transformOrigin: 'top',
              rotate: 12 + i * 6,
              boxShadow: '0 0 4px rgba(212, 157, 67, 0.2)',
              y: useTransform(scrollYProgress, [0, 1], [0, -35 - i * 12]),
              opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 1], [0, 0.2, 0.4, 0.15]),
            }}
            animate={{
              scaleY: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 14 + i * 1.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gentle horizontal accent lines - visible but subtle */}
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={`horizontal-${i}`}
            className="absolute bg-primary/12"
            style={{
              width: '70%',
              height: '1.5px',
              top: `${20 + i * 20}%`,
              left: '15%',
              boxShadow: '0 0 3px rgba(212, 157, 67, 0.15)',
              x: useTransform(scrollYProgress, [0, 1], [0, 35 + i * 15]),
              opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 1], [0, 0.15, 0.3, 0.12]),
            }}
            animate={{
              scaleX: [0.7, 1.1, 0.7],
            }}
            transition={{
              duration: 16 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          />
        ))}


      </div>

      {/* Morphing shapes layer - much more subtle */}
      <div className="absolute inset-0">
        {Array.from({ length: 2 }, (_, i) => (
          <motion.div
            key={`morph-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              width: 150 + i * 30,
              height: 150 + i * 30,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#d49d43' : '#2c2927'}10 0%, transparent 70%)`,
              borderRadius: '50%',
            }}
            animate={{
              y: [0, -30, 0, -20, 0],
              rotateY: [0, 180, 360, 180, 0],
              scale: [1, 1.1, 1.05, 1.08, 1],
              borderRadius: ['50%', '40%', '50%', '45%', '50%'],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Gentle floating geometric shapes - visible but subtle */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={`hero-shape-${i}`}
            className="absolute"
            style={{
              left: `${8 + i * 8}%`,
              top: `${8 + (i * 12) % 85}%`,
              y: useTransform(scrollYProgress, [0, 1], [0, -45 - i * 6]),
              opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 1], [0, 0.2, 0.4, 0.15]),
            }}
          >
            {i % 4 === 0 ? (
              <motion.div
                className="w-5 h-5 bg-primary/25 rotate-45"
                style={{
                  boxShadow: '0 0 6px rgba(212, 157, 67, 0.2)',
                }}
                animate={{
                  rotate: [45, 225, 45],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 16 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ) : i % 4 === 1 ? (
              <motion.div
                className="w-4 h-4 bg-foreground/15"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  boxShadow: '0 0 4px rgba(44, 41, 39, 0.15)',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 20 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ) : i % 4 === 2 ? (
              <motion.div
                className="w-4 h-4 bg-primary/20 rounded-full"
                style={{
                  boxShadow: '0 0 5px rgba(212, 157, 67, 0.2)',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 14 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ) : (
              <motion.div
                className="w-3 h-6 bg-primary/18"
                style={{
                  clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                  boxShadow: '0 0 4px rgba(212, 157, 67, 0.18)',
                }}
                animate={{
                  rotate: [0, 180],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 18 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => {
          const ParticleElement = () => {
            const baseStyle = {
              position: 'absolute' as const,
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            };

            const commonProps = {
              className: "absolute particle-glow",
              initial: { opacity: 0, scale: 0 },
              animate: { 
                opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 1], [0, particle.opacity * 2, particle.opacity * 3, particle.opacity * 1.8]),
                scale: [0.8, 1.3, 0.9, 1.1, 0.8],
                y: [0, -120, -250, -150, -300],
                rotate: [0, 120, 240, 360]
              },
              transition: {
                duration: 16 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }
            };

            switch (particle.shape) {
              case 'circle':
                return (
                  <motion.div
                    key={`particle-circle-${particle.id}`}
                    {...commonProps}
                    style={{
                      ...baseStyle,
                      backgroundColor: particle.color,
                      borderRadius: '50%',
                      boxShadow: `0 0 ${particle.size}px ${particle.color}40`,
                    }}
                  />
                );
              case 'square':
                return (
                  <motion.div
                    key={`particle-square-${particle.id}`}
                    {...commonProps}
                    style={{
                      ...baseStyle,
                      backgroundColor: particle.color,
                      borderRadius: '2px',
                      boxShadow: `0 0 ${particle.size}px ${particle.color}40`,
                    }}
                  />
                );
              case 'triangle':
                return (
                  <motion.div
                    key={`particle-triangle-${particle.id}`}
                    {...commonProps}
                    style={{
                      ...baseStyle,
                      width: 0,
                      height: 0,
                      borderLeft: `${particle.size/2}px solid transparent`,
                      borderRight: `${particle.size/2}px solid transparent`,
                      borderBottom: `${particle.size}px solid ${particle.color}`,
                      filter: `drop-shadow(0 0 ${particle.size/2}px ${particle.color}40)`,
                    }}
                  />
                );
              case 'diamond':
                return (
                  <motion.div
                    key={`particle-diamond-${particle.id}`}
                    {...commonProps}
                    style={{
                      ...baseStyle,
                      backgroundColor: particle.color,
                      borderRadius: '2px',
                      boxShadow: `0 0 ${particle.size}px ${particle.color}40`,
                    }}
                    animate={{
                      ...commonProps.animate,
                      rotate: [45, 225, 405]
                    }}
                  />
                );
              default:
                return null;
            }
          };

          return <ParticleElement key={`particle-${particle.id}`} />;
        })}
      </div>

      {/* Gentle network visualization - visible but subtle */}
      <motion.svg 
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 1], [0, 0.15, 0.25, 0.12]),
        }}
      >
        {networkNodes.map((node, i) => (
          <g key={`network-group-${i}`}>
            {/* Gentle node connections */}
            {node.connections.map((connectionId) => {
              const connectedNode = networkNodes[connectionId];
              if (!connectedNode) return null;
              
              return (
                <motion.line
                  key={`${node.id}-${connectionId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={connectedNode.x}
                  y2={connectedNode.y}
                  stroke="#d49d43"
                  strokeWidth="1.5"
                  filter="drop-shadow(0 0 2px rgba(212, 157, 67, 0.2))"
                  animate={{ 
                    pathLength: [0, 1, 0.7, 1],
                    opacity: [0.2, 0.5, 0.3, 0.4]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    delay: Math.random() * 6,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
            
            {/* Gentle nodes */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#d49d43"
              filter="drop-shadow(0 0 4px rgba(212, 157, 67, 0.3))"
              animate={{
                r: [2.5, 4, 3],
                opacity: [0.3, 0.6, 0.4]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          </g>
        ))}
      </motion.svg>

      {/* Subtle interactive light beams */}
      <motion.div
        className="absolute w-px bg-gradient-to-b from-primary/8 via-primary/3 to-transparent opacity-20"
        style={{
          left: smoothMouseX,
          height: dimensions.height,
          y: lightBeamY,
        }}
      />
      
      <motion.div
        className="absolute h-px bg-gradient-to-r from-primary/6 via-primary/2 to-transparent opacity-20"
        style={{
          top: smoothMouseY,
          width: dimensions.width,
          x: lightBeamX,
        }}
      />

      {/* Subtle brand color orbs */}
      <div className="absolute inset-0">
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={`brand-orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + (i * 20) % 60}%`,
              width: 30 + i * 10,
              height: 30 + i * 10,
              background: `radial-gradient(circle, rgba(212, 157, 67, 0.08) 0%, rgba(212, 157, 67, 0.03) 50%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Gentle ambient floating orbs - visible but subtle */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${12 + i * 14}%`,
              width: 90 + i * 12,
              height: 90 + i * 12,
              background: `radial-gradient(circle, rgba(212, 157, 67, 0.12) 0%, rgba(212, 157, 67, 0.04) 50%, rgba(212, 157, 67, 0.01) 70%, transparent 85%)`,
              boxShadow: `0 0 ${20 + i * 6}px rgba(212, 157, 67, 0.15)`,
              y: useTransform(scrollYProgress, [0, 1], [0, -70 - i * 15]),
              opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 1], [0, 0.2, 0.35, 0.15]),
            }}
            animate={{
              scale: [1, 1.15, 0.9, 1.08, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Gentle floating accent dots - visible but subtle */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`accent-dot-${i}`}
            className={`absolute w-${i % 3 === 0 ? '2' : '1.5'} h-${i % 3 === 0 ? '2' : '1.5'} bg-primary/30 rounded-full`}
            style={{
              left: `${6 + i * 4.5}%`,
              top: `${8 + (i * 9) % 85}%`,
              boxShadow: '0 0 6px rgba(212, 157, 67, 0.25)',
              y: useTransform(scrollYProgress, [0, 1], [0, -30 - (i % 4) * 12]),
              opacity: useTransform(scrollYProgress, [0.15, 0.2, 0.8, 1], [0, 0.25, 0.5, 0.2]),
            }}
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}