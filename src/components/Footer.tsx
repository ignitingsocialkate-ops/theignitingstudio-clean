import { motion } from 'motion/react';
import { Heart, ArrowUp, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import imgCroppedTheIgnitingStudio1211Png from "figma:asset/6d0f3f8ad76662c53a0e30dfa9a1b09fee56dc1e.png";

// TikTok icon component since lucide-react doesn't have one
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.909 2.909 2.896 2.896 0 0 1-2.909-2.909 2.896 2.896 0 0 1 2.909-2.909c.301 0 .591.041.863.118V9.44a6.336 6.336 0 0 0-.863-.118C5.732 9.322 2 13.054 2 17.787c0 4.733 3.732 8.465 8.465 8.465s8.465-3.732 8.465-8.465V8.4c1.405.906 3.074 1.486 4.888 1.486V6.454c-.665 0-1.299-.162-1.859-.41-.394-.175-.744-.408-1.031-.694a4.795 4.795 0 0 1-1.339-2.1z"/>
    </svg>
  );
}

export function Footer() {
  const { t, language } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    [t('footer.services')]: [
      { name: t('footer.socialMediaManagement'), path: language === 'hu' ? '/hu/services/social-media' : '/services/social-media' },
      { name: t('footer.contentCreation'), path: language === 'hu' ? '/hu/services/content-creation' : '/services/content-creation' },
      { name: t('footer.websiteDesign'), path: language === 'hu' ? '/hu/services/website-creation' : '/services/website-creation' },
      { name: t('footer.businessIntelligence'), path: language === 'hu' ? '/hu/services/business-intelligence' : '/services/business-intelligence' }
    ],
    [t('footer.company')]: [
      { name: t('footer.aboutUs'), path: language === 'hu' ? '/hu/about' : '/about' },
      { name: t('footer.ourPortfolio'), path: '/#portfolio' },
      { name: t('footer.contact'), path: language === 'hu' ? '/hu/contact' : '/contact' },
      { name: t('footer.getStarted'), path: language === 'hu' ? '/hu/contact' : '/contact' }
    ],
    [t('footer.support')]: [
      { name: t('footer.contactSupport'), path: language === 'hu' ? '/hu/contact' : '/contact' },
      { name: t('footer.projectInquiry'), path: language === 'hu' ? '/hu/contact' : '/contact' },
      { name: t('footer.privacyPolicy'), path: language === 'hu' ? '/hu/privacy-policy' : '/privacy-policy' },
      { name: t('footer.termsOfService'), path: language === 'hu' ? '/hu/terms-of-service' : '/terms-of-service' }
    ],
  };

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={imgCroppedTheIgnitingStudio1211Png} 
                alt="The Igniting Studio Logo" 
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-background/80 mb-6 max-w-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.instagram.com/the.igniting.studio"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0 * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              
              <motion.a
                href="https://www.tiktok.com/@the.igniting.studio"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <TikTokIcon size={20} />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/company/the-igniting-studio"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2 * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="font-medium mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    {link.path.startsWith('/#') ? (
                      <a
                        href={link.path}
                        className="text-background/70 hover:text-background transition-colors text-sm"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-background/70 hover:text-background transition-colors text-sm"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-background/70 text-sm mb-4 md:mb-0 flex items-center gap-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t('footer.copyright', { year: currentYear.toString() })} {t('footer.madeWithLove')}{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-red-400" />
            </motion.span>
            {' '}{t('footer.forAmazingClients')}
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="bg-background/10 p-3 rounded-lg hover:bg-background/20 transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}