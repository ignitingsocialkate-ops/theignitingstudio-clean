import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';
import { Sparkles, Target, Users, Zap } from 'lucide-react';

export function WordPressAbout() {
  const { getPageBySlug, pagesLoading } = useEnhancedContent();
  const aboutContent = getPageBySlug('about');
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fallback content
  const title = aboutContent?.title?.rendered || "About The Igniting Studio";
  const content = aboutContent?.content?.rendered || `
    <p>We're a creative digital studio that specializes in transforming businesses through strategic social media management, stunning website creation, and data-driven business intelligence solutions.</p>
    <p>Our mission is simple: handle the digital complexity so you can focus on what you do best - growing your business and serving your customers.</p>
  `;
  const statsTitle = aboutContent?.acf?.stats_title || "Why Choose Us";
  const stats = aboutContent?.acf?.stats || [
    { number: "50+", label: "Projects Completed", icon: "target" },
    { number: "98%", label: "Client Satisfaction", icon: "users" },
    { number: "2x", label: "Average ROI Increase", icon: "zap" }
  ];

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'target': return Target;
      case 'users': return Users;
      case 'zap': return Zap;
      default: return Sparkles;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-20 overflow-hidden"
    >
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric elements */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`bg-element-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          >
            {i % 2 === 0 ? (
              <div className="w-16 h-16 bg-primary/10 rotate-45 backdrop-blur-sm" />
            ) : (
              <div className="w-12 h-12 bg-foreground/5 rounded-full backdrop-blur-sm" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl mb-6 title-readable-golden-gradient"
              style={{ fontFamily: 'DM Serif Display, serif' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div 
                className="prose prose-lg max-w-none text-foreground/90"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
              
              <motion.a
                href="https://calendly.com/theignitingstudio/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px rgba(212, 157, 67, 0.2)"
                }}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-lg transition-all duration-300"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Sparkles size={18} />
                <span>Let's Work Together</span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-xl">
                <h3 
                  className="text-2xl mb-8 text-center title-readable-golden"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  {statsTitle}
                </h3>
                
                <div className="grid gap-6">
                  {stats.map((stat, index) => {
                    const IconComponent = getIcon(stat.icon);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-background/50 hover:bg-primary/5 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="text-primary" size={24} />
                        </div>
                        <div>
                          <div 
                            className="text-2xl text-primary"
                            style={{ fontFamily: 'DM Serif Display, serif' }}
                          >
                            {stat.number}
                          </div>
                          <div 
                            className="text-foreground/70"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Development indicator */}
      {(typeof process !== 'undefined' && process.env.NODE_ENV === 'development') && (
        <div className="mt-4 text-center">
          <span className="text-xs text-primary/70 bg-primary/10 px-2 py-1 rounded">
            ✓ WordPress About Section • Content: {aboutContent ? 'WordPress' : 'Fallback'}
          </span>
        </div>
      )}
    </section>
  );
}