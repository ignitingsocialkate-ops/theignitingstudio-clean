import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Instagram, Globe, BarChart, Sparkles } from 'lucide-react';

export function WordPressServices() {
  const { services, servicesLoading } = useEnhancedContent();
  const { t } = useLanguage();
  
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

  const getServiceIcon = (iconName: string) => {
    switch(iconName?.toLowerCase()) {
      case 'instagram':
        return Instagram;
      case 'globe':
      case 'website':
        return Globe;
      case 'bar-chart':
      case 'analytics':
        return BarChart;
      default:
        return Sparkles;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative py-20 overflow-hidden"
    >
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`bg-service-${i}`}
            className="absolute"
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-20 h-20 bg-primary/10 rotate-45 backdrop-blur-sm rounded-lg" />
            ) : i % 3 === 1 ? (
              <div className="w-16 h-16 bg-foreground/5 rounded-full backdrop-blur-sm" />
            ) : (
              <div 
                className="w-12 h-12 bg-primary/15 backdrop-blur-sm"
                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
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
            >
              {t('services.title')}
            </h2>
            
            <p 
              className="text-xl text-foreground/80 max-w-3xl mx-auto"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {t('services.subtitle')}
            </p>
          </motion.div>

          {/* Loading State */}
          {servicesLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border animate-pulse">
                  <div className="w-16 h-16 bg-muted rounded-full mb-6"></div>
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-6"></div>
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* Services Grid */}
          {!servicesLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => {
                const IconComponent = getServiceIcon(service.acf?.service_icon);
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(212, 157, 67, 0.15)"
                    }}
                    className="group relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden"
                  >
                    {/* Hover gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />

                    {/* Service Icon */}
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      className="relative w-16 h-16 mb-6 bg-primary/10 rounded-full flex items-center justify-center"
                    >
                      <IconComponent className="text-primary" size={28} />
                    </motion.div>

                    {/* Service Title */}
                    <h3 
                      className="text-2xl mb-4 title-readable-golden relative z-10"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                      dangerouslySetInnerHTML={{ __html: service.title.rendered }}
                    />

                    {/* Service Description */}
                    <div 
                      className="text-foreground/80 mb-6 relative z-10"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      dangerouslySetInnerHTML={{ __html: service.content.rendered }}
                    />

                    {/* Features */}
                    {service.acf?.service_features && (
                      <ul className="space-y-2 mb-6 relative z-10">
                        {service.acf.service_features.map((feature, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-center text-sm text-foreground/70"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Price */}
                    {service.acf?.service_price && (
                      <div className="mb-6 relative z-10">
                        <span 
                          className="text-2xl text-primary"
                          style={{ fontFamily: 'DM Serif Display, serif' }}
                        >
                          {service.acf.service_price}
                        </span>
                      </div>
                    )}

                    {/* CTA Button */}
                    <motion.a
                      href={service.acf?.cta_url || 'https://calendly.com/theignitingstudio/30min'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-lg transition-all duration-300 hover:bg-primary/90 overflow-hidden z-10"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {/* Button background animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <span className="relative z-10">
                        {service.acf?.cta_text || t('services.cta')}
                      </span>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </motion.a>

                    {/* Floating accent elements */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-1 -left-1 w-4 h-4 bg-foreground/10 rotate-45 opacity-0 group-hover:opacity-100"
                      animate={{
                        rotate: [45, 225, 45],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <motion.a
              href="https://calendly.com/theignitingstudio/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(212, 157, 67, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-primary/90 overflow-hidden group"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              
              <Sparkles className="relative z-10 group-hover:rotate-12 transition-transform" size={20} />
              <span className="relative z-10">{t('services.cta')}</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <ArrowRight size={20} />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Development indicator */}
      {(typeof process !== 'undefined' && process.env.NODE_ENV === 'development') && (
        <div className="mt-4 text-center">
          <span className="text-xs text-primary/70 bg-primary/10 px-2 py-1 rounded">
            ✓ WordPress Services • {services.length} services loaded
          </span>
        </div>
      )}
    </section>
  );
}