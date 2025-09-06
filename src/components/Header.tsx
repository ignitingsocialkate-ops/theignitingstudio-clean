import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Calendar, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import imgCroppedTheIgnitingStudio1211Png from "figma:asset/6d0f3f8ad76662c53a0e30dfa9a1b09fee56dc1e.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const serviceItems = [
    { name: t('services.social'), path: language === 'hu' ? '/hu/services/social-media' : '/services/social-media' },
    { name: t('services.content'), path: language === 'hu' ? '/hu/services/content-creation' : '/services/content-creation' },
    { name: t('services.website'), path: language === 'hu' ? '/hu/services/website-creation' : '/services/website-creation' },
    { name: t('services.bi'), path: language === 'hu' ? '/hu/services/business-intelligence' : '/services/business-intelligence' }
  ];

  const navItems = [
    { name: t('nav.about'), path: language === 'hu' ? '/hu/about' : '/about', isHash: false },
    { name: t('nav.contact'), path: language === 'hu' ? '/hu/contact' : '/contact', isHash: false },
    { name: t('nav.portfolio'), path: language === 'hu' ? '/hu/portfolio' : '/portfolio', isHash: false }
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] bg-background/98 backdrop-blur-md border-b border-border shadow-lg"
      style={{ 
        backgroundColor: 'rgba(242, 241, 229, 0.98)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(44, 41, 39, 0.2)'
      }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to={language === 'hu' ? '/hu' : '/'}>
              <img 
                src={imgCroppedTheIgnitingStudio1211Png} 
                alt="The Igniting Studio Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item.isHash ? (
                  <a
                    href={item.path}
                    className="text-foreground hover:text-primary transition-colors relative text-sm lg:text-base"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={`transition-colors relative text-sm lg:text-base ${
                      location.pathname === item.path 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-primary'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                      whileHover={{ width: "100%" }}
                      animate={{ width: location.pathname === item.path ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                )}
              </motion.div>
            ))}
            
            {/* Services Dropdown */}
            <motion.div
              className="relative"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 + 0.5 }}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <div className="flex items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer relative text-sm lg:text-base"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                {t('nav.services')}
                <motion.div
                  animate={{ rotate: isServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                  animate={{ width: isServicesOpen ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 lg:w-64 bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl z-50"
                  >
                    <div className="p-2">
                      {serviceItems.map((service, index) => (
                        <motion.div
                          key={service.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={service.path}
                            className="block px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                            onClick={() => setIsServicesOpen(false)}
                          >
                            {service.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Digital Products Link */}
            <motion.div
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navItems.length + 1) * 0.1 + 0.5 }}
            >
              <Link
                to={language === 'hu' ? '/hu/digital-products' : '/digital-products'}
                className={`transition-colors relative text-sm lg:text-base ${
                  location.pathname === '/digital-products' || location.pathname === '/hu/digital-products'
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {t('nav.digitalProducts')}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                  whileHover={{ width: "100%" }}
                  animate={{ width: location.pathname === '/digital-products' || location.pathname === '/hu/digital-products' ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Blog Link */}
            <motion.div
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navItems.length + 2) * 0.1 + 0.5 }}
            >
              <Link
                to={language === 'hu' ? '/hu/blog' : '/blog'}
                className={`transition-colors relative text-sm lg:text-base ${
                  location.pathname === '/blog' || location.pathname === '/hu/blog' || location.pathname.startsWith('/blog/') || location.pathname.startsWith('/hu/blog/')
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {t('nav.blog')}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                  whileHover={{ width: "100%" }}
                  animate={{ width: location.pathname === '/blog' || location.pathname === '/hu/blog' || location.pathname.startsWith('/blog/') || location.pathname.startsWith('/hu/blog/') ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            
            {/* Language Toggle Dropdown */}
            <motion.div
              className="relative"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navItems.length + 3) * 0.1 + 0.5 }}
              onMouseEnter={() => setIsLanguageOpen(true)}
              onMouseLeave={() => setIsLanguageOpen(false)}
            >
              <div className="flex items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer relative text-sm lg:text-base"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                <Globe size={16} />
                <span className="uppercase">{language}</span>
                <motion.div
                  animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} />
                </motion.div>
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                  animate={{ width: isLanguageOpen ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-32 bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl z-50"
                  >
                    <div className="p-2">
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                        onClick={() => {
                          setLanguage('en');
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all ${
                          language === 'en' 
                            ? 'text-primary bg-primary/10' 
                            : 'text-foreground hover:text-primary hover:bg-primary/10'
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        🇺🇸 English
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 }}
                        onClick={() => {
                          setLanguage('hu');
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all ${
                          language === 'hu' 
                            ? 'text-primary bg-primary/10' 
                            : 'text-foreground hover:text-primary hover:bg-primary/10'
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        🇭🇺 Magyar
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Schedule Discovery Call Button */}
            <motion.a
              href="https://calendly.com/theignitingstudio/30min"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navItems.length + 4) * 0.1 + 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 10px 25px rgba(212, 157, 67, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-200%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Calendar size={16} className="relative z-10" />
              <span className="relative z-10 text-sm lg:text-base whitespace-nowrap">Schedule Discovery Call</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.isHash ? (
                  <a
                    href={item.path}
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={`block py-2 transition-colors ${
                      location.pathname === item.path 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            
            {/* Mobile Services Menu */}
            <div className="border-t border-border pt-2 mt-2">
              <p className="py-2 text-sm text-muted-foreground font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {t('nav.services')}
              </p>
              {serviceItems.map((service) => (
                <motion.div
                  key={service.name}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    to={service.path}
                    className="block py-2 pl-4 text-sm text-foreground hover:text-primary transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {service.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile Digital Products Link */}
            <div className="border-t border-border pt-2 mt-2">
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link
                  to={language === 'hu' ? '/hu/digital-products' : '/digital-products'}
                  className={`block py-2 transition-colors ${
                    location.pathname === '/digital-products' || location.pathname === '/hu/digital-products'
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {t('nav.digitalProducts')}
                </Link>
              </motion.div>
            </div>
            
            {/* Mobile Blog Link */}
            <div className="border-t border-border pt-2 mt-2">
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link
                  to={language === 'hu' ? '/hu/blog' : '/blog'}
                  className={`block py-2 transition-colors ${
                    location.pathname === '/blog' || location.pathname === '/hu/blog' || location.pathname.startsWith('/blog/') || location.pathname.startsWith('/hu/blog/')
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {t('nav.blog')}
                </Link>
              </motion.div>
            </div>
            
            {/* Mobile Language Toggle */}
            <div className="border-t border-border pt-2 mt-2">
              <p className="py-2 text-sm text-muted-foreground font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {t('nav.language')}
              </p>
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setLanguage('en');
                    setIsMenuOpen(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${
                    language === 'en' 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  🇺🇸 English
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setLanguage('hu');
                    setIsMenuOpen(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${
                    language === 'hu' 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  🇭🇺 Magyar
                </motion.button>
              </div>
            </div>
            
            {/* Mobile Discovery Call Button */}
            <div className="border-t border-border pt-4 mt-4">
              <motion.a
                href="https://calendly.com/theignitingstudio/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Calendar size={16} />
                <span>Schedule Discovery Call</span>
              </motion.a>
            </div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}