import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';
import imgCroppedTheIgnitingStudio1211Png from "figma:asset/6d0f3f8ad76662c53a0e30dfa9a1b09fee56dc1e.png";

export function WordPressHero() {
  const { getPageBySlug, pagesLoading } = useEnhancedContent();
  const heroContent = getPageBySlug('hero');
  
  const containerRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMouseX((clientX - innerWidth / 2) / innerWidth);
      setMouseY((clientY - innerHeight / 2) / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fallback content
  const title = heroContent?.title?.rendered || "We handle the digital side, you focus on your next big move.";
  const tagline = heroContent?.acf?.tagline || "Creative Digital Studio";
  const ctaText = heroContent?.acf?.cta_text || "Start Your Project";
  const ctaLink = heroContent?.acf?.cta_link || "https://calendly.com/theignitingstudio/30min";
  const secondaryCtaText = heroContent?.acf?.secondary_cta_text || "View Our Work";
  const secondaryCtaLink = heroContent?.acf?.secondary_cta_link || "/#portfolio";

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Enhanced background with all original animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated geometric lines */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute bg-primary/20"
            style={{
              width: `${100 + i * 20}px`,
              height: '2px',
              left: `${i * 8}%`,
              top: `${15 + i * 6}%`,
              transformOrigin: 'center',
              transform: `translate(${mouseX * (5 + i)}px, ${mouseY * (3 + i)}px)`,
            }}
            animate={{
              rotate: [0, 360],
              scaleX: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating geometric shapes with brand colors */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 10}%`,
              top: `${25 + i * 8}%`,
              transform: `translate(${mouseX * (15 + i * 3)}px, ${mouseY * (10 + i * 2)}px)`,
            }}
          >
            {i % 3 === 0 ? (
              <motion.div
                className="w-8 h-8 bg-primary/30 rotate-45 backdrop-blur-sm"
                animate={{
                  rotate: [45, 225, 45],
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ) : i % 3 === 1 ? (
              <motion.div
                className="w-6 h-6 bg-foreground/20"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 10 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ) : (
              <motion.div
                className="w-5 h-5 bg-primary/25 rounded-full backdrop-blur-sm"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        ))}

        {/* Brand color orbs */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full backdrop-blur-sm"
            style={{
              left: `${10 + i * 20}%`,
              top: `${30 + i * 15}%`,
              width: 60 + i * 20,
              height: 60 + i * 20,
              background: `radial-gradient(circle, rgba(212, 157, 67, 0.2) 0%, rgba(212, 157, 67, 0.05) 50%, transparent 70%)`,
              transform: `translate(${mouseX * (20 + i * 5)}px, ${mouseY * (15 + i * 3)}px)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating brand text elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['CREATE', 'IGNITE', 'INSPIRE'].map((word, i) => (
          <motion.div
            key={word}
            className="absolute text-primary/8 select-none pointer-events-none"
            style={{
              fontSize: '5rem',
              fontFamily: 'DM Serif Display, serif',
              left: `${5 + i * 30}%`,
              top: `${20 + i * 25}%`,
              transform: `translate(${mouseX * (10 + i * 5)}px, ${mouseY * (8 + i * 3)}px)`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.03, 0.08, 0.03],
              x: [0, 15, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 14 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
          >
            {word}
          </motion.div>
        ))}
      </div>

      {/* WordPress-powered content */}
      <motion.div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">
            
            {/* Enhanced Logo with all original effects */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="flex justify-center lg:justify-start relative"
              style={{ scale: logoScale }}
            >
              <div className="relative">
                {/* Multiple glow layers */}
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 40px rgba(212, 157, 67, 0.3), 0 0 80px rgba(212, 157, 67, 0.1)",
                      "0 0 60px rgba(212, 157, 67, 0.4), 0 0 120px rgba(212, 157, 67, 0.15)",
                      "0 0 40px rgba(212, 157, 67, 0.3), 0 0 80px rgba(212, 157, 67, 0.1)"
                    ],
                    scale: [1, 1.03, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full blur-lg"
                />

                {/* Rotating ring around logo */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  style={{
                    width: '120%',
                    height: '120%',
                    left: '-10%',
                    top: '-10%',
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Sparkles around logo */}
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={`logo-sparkle-${i}`}
                    className="absolute w-3 h-3 bg-primary rounded-full"
                    style={{
                      left: `${Math.cos(i * (Math.PI / 3)) * 120 + 50}%`,
                      top: `${Math.sin(i * (Math.PI / 3)) * 120 + 50}%`,
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                <motion.img 
                  src={imgCroppedTheIgnitingStudio1211Png} 
                  alt="The Igniting Studio Logo" 
                  className="relative h-64 md:h-80 lg:h-96 w-auto z-10"
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 2,
                    filter: "drop-shadow(0 0 30px rgba(212, 157, 67, 0.5))"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* WordPress-powered text content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* WordPress tagline */}
              <motion.div className="mb-8">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <motion.span 
                    className="text-primary/80 tracking-widest uppercase text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {tagline}
                  </motion.span>
                </div>
              </motion.div>

              {/* WordPress main headline */}
              <motion.div className="mb-12 relative">
                <motion.div
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed text-foreground/90 relative"
                  style={{ fontFamily: 'Alice, serif' }}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </motion.div>

              {/* WordPress CTAs */}
              <motion.div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center lg:items-start">
                <motion.a
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-primary text-primary-foreground px-8 py-3 rounded-xl border-2 border-primary flex items-center gap-3 hover:bg-primary/90 transition-all duration-300 shadow-xl overflow-hidden"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Sparkles className="relative z-10 group-hover:rotate-12 transition-transform" size={18} />
                  <span className="relative z-10">{ctaText}</span>
                  <ArrowRight size={18} className="relative z-10" />
                </motion.a>

                <motion.a
                  href={secondaryCtaLink}
                  className="relative border-2 border-foreground/20 bg-background/80 backdrop-blur-sm text-foreground px-8 py-3 rounded-xl transition-all duration-300 overflow-hidden group"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <span className="relative z-10">{secondaryCtaText}</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Development indicator */}
      {(typeof process !== 'undefined' && process.env.NODE_ENV === 'development') && pagesLoading && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-1">
            <span className="text-xs text-primary">Loading content...</span>
          </div>
        </div>
      )}
    </section>
  );
}