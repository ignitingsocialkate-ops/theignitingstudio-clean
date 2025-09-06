import { motion } from 'motion/react';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUp, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import imgCroppedTheIgnitingStudio1211Png from "figma:asset/6d0f3f8ad76662c53a0e30dfa9a1b09fee56dc1e.png";

export function WordPressFooter() {
  const { siteSettings } = useEnhancedContent();
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get language-specific content
  const contactInfo = siteSettings?.contact_info || {};
  const socialLinks = siteSettings?.social_links || {};
  const address = language === 'hu' && contactInfo.address_hu ? contactInfo.address_hu : contactInfo.address;
  const hours = language === 'hu' && contactInfo.hours_hu ? contactInfo.hours_hu : contactInfo.hours;

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.services', href: '/services' },
    { key: 'nav.portfolio', href: '/portfolio' },
    { key: 'nav.blog', href: '/blog' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const serviceLinks = [
    { 
      name: language === 'hu' ? 'Közösségimédia-menedzsment' : 'Social Media Management', 
      href: '/services/social-media' 
    },
    { 
      name: language === 'hu' ? 'Weboldalkészítés' : 'Website Creation', 
      href: '/services/website-creation' 
    },
    { 
      name: language === 'hu' ? 'Üzleti Intelligencia' : 'Business Intelligence', 
      href: '/services/business-intelligence' 
    },
  ];

  const legalLinks = [
    { 
      name: t('footer.privacyPolicy'), 
      href: '/privacy-policy' 
    },
    { 
      name: t('footer.termsOfService'), 
      href: '/terms-of-service' 
    },
  ];

  const getLanguageAwareLink = (path: string) => {
    if (language === 'hu') {
      return `/hu${path === '/' ? '' : path}`;
    }
    return path;
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return Twitter;
      default:
        return Mail;
    }
  };

  return (
    <footer className="relative bg-card/80 backdrop-blur-sm border-t border-border overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`footer-bg-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 12}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.img 
                src={imgCroppedTheIgnitingStudio1211Png}
                alt="The Igniting Studio"
                className="h-10 w-auto"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            
            <p 
              className="text-foreground/80 mb-6 leading-relaxed"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {t('footer.tagline')}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {Object.entries(socialLinks).map(([platform, url]) => {
                if (!url) return null;
                const IconComponent = getSocialIcon(platform);
                
                return (
                  <motion.a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      backgroundColor: "rgba(212, 157, 67, 0.1)"
                    }}
                    className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
                  >
                    <IconComponent size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-lg mb-6 title-readable-golden"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={getLanguageAwareLink(link.href)}
                    className="text-foreground/70 hover:text-primary transition-colors relative group"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t(link.key)}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-lg mb-6 title-readable-golden"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <motion.li 
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={getLanguageAwareLink(service.href)}
                    className="text-foreground/70 hover:text-primary transition-colors relative group"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {service.name}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-lg mb-6 title-readable-golden"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              {t('nav.contact')}
            </h3>
            
            <div className="space-y-4">
              {contactInfo.email && (
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="text-primary" size={14} />
                  </div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-foreground/70 hover:text-primary transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {contactInfo.email}
                  </a>
                </motion.div>
              )}

              {contactInfo.phone && (
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="text-primary" size={14} />
                  </div>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-foreground/70 hover:text-primary transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {contactInfo.phone}
                  </a>
                </motion.div>
              )}

              {address && (
                <motion.div 
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="text-primary" size={14} />
                  </div>
                  <span
                    className="text-foreground/70"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {address}
                  </span>
                </motion.div>
              )}
            </div>

            {/* CTA Button */}
            <motion.a
              href="https://calendly.com/theignitingstudio/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(212, 157, 67, 0.2)"
              }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg mt-6 transition-all duration-300 hover:bg-primary/90 group"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <span>{t('about.cta')}</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="py-6 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p 
              className="text-foreground/60 text-sm"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {t('footer.copyright', { year: currentYear.toString() })}
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={getLanguageAwareLink(link.href)}
                  className="text-foreground/60 hover:text-primary transition-colors text-sm relative group"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </a>
              ))}
            </div>

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ 
                scale: 1.1,
                y: -2,
                backgroundColor: "rgba(212, 157, 67, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Development indicator */}
      {(typeof process !== 'undefined' && process.env.NODE_ENV === 'development') && (
        <div className="text-center py-2 border-t border-border">
          <span className="text-xs text-primary/70 bg-primary/10 px-2 py-1 rounded">
            ✓ WordPress Footer • Settings: {siteSettings ? 'Loaded' : 'Fallback'}
          </span>
        </div>
      )}
    </footer>
  );
}