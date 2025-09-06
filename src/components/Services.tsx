import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Palette, Globe, Lightbulb, Zap, ArrowRight, Sparkles, Camera, Code, BarChart3, PenTool, Star, Target } from 'lucide-react';
import imgDsc05761683X1024Jpg from "figma:asset/1a73d7d9747a1640082c2332142b8e133e1c807f.png";
import imgDsc0594683X1024Jpg from "figma:asset/2cb10045b6d4b06f9bf2e43363e98df0e33bd244.png";
import imgDsc0422660X1024Jpg from "figma:asset/91f528b550c820637512fa7c88337f0f0b91e15c.png";
import imgDsc0569683X1024Jpg from "figma:asset/b0b34dd4c22e236ad4198070288761ad67015e0e.png";

interface Service {
  id: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  color: string;
  accent: string;
  height: string;
  path: string;
}

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const { t, language } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const services: Service[] = [
    {
      id: 0,
      icon: Palette,
      title: t('services.socialMedia.title'),
      subtitle: t('services.strategicBrandPresence'),
      description: t('services.socialMedia.description'),
      features: [t('services.contentStrategy'), t('services.communityManagement'), t('services.analyticsGrowth'), t('services.brandStorytelling')],
      image: imgDsc05761683X1024Jpg,
      color: "#d49d43",
      accent: "#f2f1e5",
      height: "h-[600px]",
      path: language === 'hu' ? "/hu/services/social-media" : "/services/social-media"
    },
    {
      id: 1,
      icon: Globe,
      title: t('services.website'),
      subtitle: t('services.digitalExcellence'), 
      description: t('services.websiteDescription'),
      features: [t('services.customDesign'), t('services.mobileResponsive'), t('services.seoOptimized'), t('services.performanceFocused')],
      image: imgDsc0422660X1024Jpg,
      color: "#d49d43",
      accent: "#f2f1e5",
      height: "h-[550px]",
      path: language === 'hu' ? "/hu/services/website-creation" : "/services/website-creation"
    },
    {
      id: 2,
      icon: Lightbulb,
      title: t('services.content'), 
      subtitle: t('services.visualStorytelling'),
      description: t('services.contentDescription'),
      features: [t('services.photography'), t('services.videoProduction'), t('services.copywriting'), t('services.brandContent')],
      image: imgDsc0594683X1024Jpg,
      color: "#d49d43",
      accent: "#f2f1e5",
      height: "h-[650px]",
      path: language === 'hu' ? "/hu/services/content-creation" : "/services/content-creation"
    },
    {
      id: 3,
      icon: Zap,
      title: t('services.bi'),
      subtitle: t('services.dataDrivenGrowth'),
      description: t('services.businessIntelligence.description'),
      features: [t('services.analyticsSetup'), t('services.performanceTracking'), t('services.growthStrategy'), t('services.roiOptimization')],
      image: imgDsc0569683X1024Jpg,
      color: "#d49d43",
      accent: "#f2f1e5",
      height: "h-[580px]",
      path: language === 'hu' ? "/hu/services/business-intelligence" : "/services/business-intelligence"
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        
        {/* Floating geometric shapes */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`bg-shape-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <div 
              className="w-4 h-4 border border-primary/30 rounded"
              style={{ 
                background: i % 3 === 0 ? 'transparent' : 'rgba(212, 157, 67, 0.1)',
                transform: i % 2 === 0 ? 'rotate(45deg)' : 'none'
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Creative Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
          style={{ y: textY }}
        >
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Sparkles className="text-primary w-8 h-8" />
          </motion.div>

          <h2 
            className="text-4xl md:text-6xl mb-6 title-readable-golden-gradient relative"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            {t('services.title')}
            
            {/* Animated particles around title */}
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={`title-particle-${i}`}
                className="absolute w-2 h-2 bg-primary/40 rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${-20 + (i % 2) * 40}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.5, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </h2>

          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('services.subtitle')}
          </motion.p>
        </motion.div>

        {/* Services Grid - All 4 Services Visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceColumn
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
              isHovered={hoveredService === service.id}
              onHover={() => setHoveredService(service.id)}
              onLeave={() => setHoveredService(null)}
              t={t}
            />
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20"
        >
          <div className="relative bg-gradient-to-br from-card/90 via-card/70 to-card/50 p-16 rounded-3xl border border-primary/30 backdrop-blur-sm max-w-5xl mx-auto overflow-hidden">
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 30 }, (_, i) => (
                <motion.div
                  key={`cta-element-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, Math.random() * 30 - 15, 0],
                    rotate: [0, 360],
                    opacity: [0.1, 0.4, 0.1],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                >
                  <div 
                    className="w-3 h-3 bg-primary/30 rounded-full"
                    style={{
                      background: i % 3 === 0 ? 'linear-gradient(45deg, rgba(212, 157, 67, 0.3), transparent)' :
                                  i % 3 === 1 ? 'rgba(212, 157, 67, 0.2)' : 
                                  'transparent',
                      border: '1px solid rgba(212, 157, 67, 0.3)'
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10">
              <motion.h3 
                className="text-3xl md:text-5xl mb-8 title-readable-golden-gradient"
                style={{ fontFamily: 'DM Serif Display, serif' }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(212, 157, 67, 0.3)",
                    "0 0 40px rgba(212, 157, 67, 0.5)",
                    "0 0 20px rgba(212, 157, 67, 0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {t('services.cta')}
              </motion.h3>
              
              <p 
                className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed" 
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {t('services.subtitle')}
              </p>
              
              <motion.div
                whileHover={{ 
                  scale: 1.08, 
                  y: -8,
                  boxShadow: "0 30px 60px rgba(212, 157, 67, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  to={language === 'hu' ? '/hu/contact' : '/contact'}
                  className="bg-primary text-primary-foreground px-16 py-6 rounded-2xl text-xl flex items-center gap-4 group overflow-hidden shadow-2xl relative"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {/* Multiple shine layers */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                    initial={{ x: '-200%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent -skew-x-12"
                    initial={{ x: '-200%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, delay: 1.5 }}
                  />
                  
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <Sparkles size={24} />
                  </motion.div>
                  
                  <span className="relative z-10">{t('services.cta')}</span>
                  
                  <motion.div
                    animate={{ 
                      x: [0, 8, 0],
                      rotate: [0, 20, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <ArrowRight size={24} />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Vertical Service Column Component
interface ServiceColumnProps {
  service: Service;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  t: (key: string) => string;
}

function ServiceColumn({ service, index, isInView, isHovered, onHover, onLeave, t }: ServiceColumnProps) {
  const IconComponent = service.icon;
  
  return (
    <Link
      to={service.path}
      className="block"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        initial={{ 
          opacity: 0, 
          y: 80,
          scale: 0.8
        }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          scale: 1
        } : { 
          opacity: 0, 
          y: 80,
          scale: 0.8
        }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.2,
          type: "spring",
          stiffness: 100
        }}
        className="cursor-pointer group"
      >
        <motion.div
          whileHover={{ 
            y: -15,
            scale: 1.02
          }}
          className={`relative bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-primary/20 shadow-2xl ${service.height}`}
          style={{ 
            background: isHovered ? `linear-gradient(135deg, ${service.color}10, ${service.accent}15, rgba(255,255,255,0.9))` : undefined
          }}
        >
          {/* Vertical Image */}
          <div className="relative h-full overflow-hidden">
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              animate={isHovered ? { 
                scale: 1.15,
                filter: "brightness(1.1) contrast(1.05)" 
              } : { 
                scale: 1.05,
                filter: "brightness(1) contrast(1)" 
              }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Dynamic Gradient Overlay - Darker overlay on hover */}
            <motion.div 
              className="absolute inset-0"
              animate={isHovered ? {
                background: "linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.40) 100%)"
              } : {
                background: "linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.10) 100%)"
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Floating Icon */}
            <motion.div
              className="absolute top-8 left-8 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl"
              style={{ 
                background: `linear-gradient(135deg, ${service.color}90, ${service.color}70)`
              }}
              animate={isHovered ? { 
                scale: 1.3,
                rotate: 15,
                y: -8
              } : { 
                scale: 1,
                rotate: 0,
                y: 0
              }}
              transition={{ duration: 0.5 }}
            >
              <IconComponent className="text-white" size={32} />
            </motion.div>

            {/* Floating Decorative Elements - Only on hover */}
            {isHovered && (
              <div className="absolute inset-0">
                {Array.from({ length: 10 }, (_, i) => (
                  <motion.div
                    key={`float-${i}`}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: service.color,
                      left: `${Math.random() * 90 + 5}%`,
                      top: `${Math.random() * 90 + 5}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      y: [0, -60]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>
            )}

            {/* Content Overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6"
              animate={isHovered ? { y: 0 } : { y: 10 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p 
                className="text-white/90 mb-2 text-sm tracking-wider uppercase"
                style={{ 
                  fontFamily: 'Poppins, sans-serif',
                  color: service.accent
                }}
                animate={isHovered ? { 
                  textShadow: `0 0 15px ${service.color}80`
                } : {}}
              >
                {service.subtitle}
              </motion.p>
              
              <motion.h3 
                className="text-2xl mb-4 text-white leading-tight"
                style={{ fontFamily: 'DM Serif Display, serif' }}
                animate={isHovered ? { 
                  scale: 1.05,
                  textShadow: "0 0 25px rgba(255,255,255,0.9)" 
                } : { 
                  scale: 1,
                  textShadow: "0 3px 15px rgba(0,0,0,0.7)" 
                }}
              >
                {service.title}
              </motion.h3>
              
              <motion.p 
                className="text-white/90 mb-6 leading-relaxed text-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                initial={{ opacity: 0, height: 0 }}
                animate={isHovered ? { 
                  opacity: 1, 
                  height: "auto" 
                } : { 
                  opacity: 0, 
                  height: 0 
                }}
                transition={{ duration: 0.5 }}
              >
                {service.description}
              </motion.p>
              
              {/* Features - Only show on hover */}
              <motion.div 
                className="space-y-2 mb-6"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2"
                    initial={{ x: -30, opacity: 0 }}
                    animate={isHovered ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                    transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: service.color }}
                      animate={isHovered ? { 
                        scale: 1.5,
                        boxShadow: `0 0 15px ${service.color}90`
                      } : { 
                        scale: 1
                      }}
                    />
                    <span 
                      className="text-white text-xs"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Button */}
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-full text-white border border-white/40 hover:border-white/70 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden backdrop-blur-sm"
                style={{ 
                  fontFamily: 'Poppins, sans-serif',
                  background: `linear-gradient(135deg, ${service.color}40, transparent)`
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: '-200%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.8 }}
                />
                
                <span className="relative z-10 text-sm">{t('services.cta')}</span>
                <motion.div
                  animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight size={16} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}