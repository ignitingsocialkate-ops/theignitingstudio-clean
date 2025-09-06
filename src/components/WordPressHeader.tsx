import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';
import imgCroppedTheIgnitingStudio1211Png from "figma:asset/6d0f3f8ad76662c53a0e30dfa9a1b09fee56dc1e.png";

export function WordPressHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();
  const { siteSettings } = useEnhancedContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLanguageSwitch = (lang: 'en' | 'hu') => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  // Get current path for language-aware links
  const getCurrentPath = () => {
    let path = window.location.pathname;
    if (path.startsWith('/hu')) {
      path = path.replace('/hu', '');
    }
    return path || '/';
  };

  const getLanguageAwareLink = (path: string) => {
    if (language === 'hu') {
      return `/hu${path === '/' ? '' : path}`;
    }
    return path;
  };

  const navigationItems = [
    { key: 'nav.home', href: '/', action: () => scrollToSection('home') },
    { key: 'nav.about', href: '/about', action: null },
    { key: 'nav.services', href: null, action: null, isDropdown: true },
    { key: 'nav.portfolio', href: '/portfolio', action: null },
    { key: 'nav.blog', href: '/blog', action: null },
    { key: 'nav.contact', href: '/contact', action: null },
  ];

  const serviceItems = [
    { key: 'services.social', href: '/services/social-media' },
    { key: 'services.content', href: '/services/content-creation' },
    { key: 'services.website', href: '/services/website-creation' },
    { key: 'services.bi', href: '/services/business-intelligence' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-lg shadow-lg border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <motion.a
            href={getLanguageAwareLink('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center z-50"
          >
            <img 
              src={imgCroppedTheIgnitingStudio1211Png}
              alt={siteSettings?.title || "The Igniting Studio"}
              className="h-10 lg:h-12 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative"
                onMouseEnter={() => item.isDropdown && setIsServicesOpen(true)}
                onMouseLeave={() => item.isDropdown && setIsServicesOpen(false)}
              >
                {item.isDropdown ? (
                  <div className="flex items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer relative group"
                       style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {t(item.key)}
                    <motion.div
                      animate={{ rotate: isServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300"
                      animate={{ width: isServicesOpen ? "100%" : "0%" }}
                    />
                  </div>
                ) : item.action ? (
                  <button
                    onClick={item.action}
                    className="text-foreground hover:text-primary transition-colors duration-200 relative group"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t(item.key)}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </button>
                ) : (
                  <a
                    href={getLanguageAwareLink(item.href)}
                    className="text-foreground hover:text-primary transition-colors duration-200 relative group"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t(item.key)}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </a>
                )}

                {/* Services Dropdown */}
                {item.isDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ 
                      opacity: isServicesOpen ? 1 : 0, 
                      y: isServicesOpen ? 0 : -10,
                      scale: isServicesOpen ? 1 : 0.95
                    }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50 ${
                      isServicesOpen ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                  >
                    <div className="p-2">
                      {serviceItems.map((service, serviceIndex) => (
                        <motion.a
                          key={service.key}
                          href={getLanguageAwareLink(service.href)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: isServicesOpen ? 1 : 0,
                            x: isServicesOpen ? 0 : -20
                          }}
                          transition={{ delay: serviceIndex * 0.05 }}
                          className="block px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                          onClick={() => setIsServicesOpen(false)}
                        >
                          {t(service.key)}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* Digital Products Link */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (navigationItems.length + 1) }}
            >
              <a
                href={getLanguageAwareLink('/digital-products')}
                className="text-foreground hover:text-primary transition-colors duration-200 relative group"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {t('nav.digitalProducts')}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </a>
            </motion.div>

            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-primary/5"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm uppercase font-medium">{language}</span>
                <motion.div
                  animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.button>

              {/* Language Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ 
                  opacity: isLanguageOpen ? 1 : 0, 
                  y: isLanguageOpen ? 0 : -10,
                  scale: isLanguageOpen ? 1 : 0.95
                }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden ${
                  isLanguageOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                <button
                  onClick={() => handleLanguageSwitch('en')}
                  className="w-full px-4 py-2 text-left hover:bg-primary/5 transition-colors text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => handleLanguageSwitch('hu')}
                  className="w-full px-4 py-2 text-left hover:bg-primary/5 transition-colors text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  🇭🇺 Magyar
                </button>
              </motion.div>
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
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-primary/90 overflow-hidden group relative"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {/* Button animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">{t('hero.ctaPrimary')}</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors z-50 relative"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? '0%' : '100%'
        }}
        transition={{ duration: 0.3, type: "tween" }}
        className={`lg:hidden fixed inset-0 bg-background/95 backdrop-blur-lg z-40 ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 px-6">
          
          {/* Mobile Navigation Items */}
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 50
              }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {item.isDropdown ? (
                <div>
                  <span className="text-2xl text-foreground block mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {t(item.key)}
                  </span>
                  <div className="space-y-2 ml-4">
                    {serviceItems.map((service) => (
                      <a
                        key={service.key}
                        href={getLanguageAwareLink(service.href)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-lg text-foreground hover:text-primary transition-colors duration-200"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {t(service.key)}
                      </a>
                    ))}
                  </div>
                </div>
              ) : item.action ? (
                <button
                  onClick={item.action}
                  className="text-2xl text-foreground hover:text-primary transition-colors duration-200"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {t(item.key)}
                </button>
              ) : (
                <a
                  href={getLanguageAwareLink(item.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl text-foreground hover:text-primary transition-colors duration-200"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {t(item.key)}
                </a>
              )}
            </motion.div>
          ))}

          {/* Mobile Digital Products Link */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 50
            }}
            transition={{ duration: 0.3, delay: 0.1 * (navigationItems.length + 1) }}
          >
            <a
              href={getLanguageAwareLink('/digital-products')}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl text-foreground hover:text-primary transition-colors duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {t('nav.digitalProducts')}
            </a>
          </motion.div>

          {/* Mobile Language Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 50
            }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="flex gap-4"
          >
            <button
              onClick={() => handleLanguageSwitch('en')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                language === 'en' 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => handleLanguageSwitch('hu')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                language === 'hu' 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              🇭🇺 Magyar
            </button>
          </motion.div>

          {/* Mobile CTA */}
          <motion.a
            href="https://calendly.com/theignitingstudio/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 50
            }}
            transition={{ duration: 0.3, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg transition-all duration-300 hover:bg-primary/90"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t('hero.ctaPrimary')}
          </motion.a>
        </div>
      </motion.div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
        />
      )}
    </motion.header>
  );
}