import { motion, useScroll, useTransform } from 'motion/react';

export function TextureOverlay() {
  const { scrollYProgress } = useScroll();
  
  // Create subtle texture movement based on scroll
  const textureOffset = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.01, 0.03, 0.02]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 2,
        opacity: opacity,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(212, 157, 67, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(44, 41, 39, 0.02) 0%, transparent 50%)
        `,
        backgroundSize: '600px 600px, 500px 500px',
        y: textureOffset,
      }}
      animate={{
        backgroundPosition: [
          '0% 0%, 100% 100%',
          '100% 0%, 0% 100%',
          '0% 100%, 100% 0%',
          '0% 0%, 100% 100%'
        ]
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}