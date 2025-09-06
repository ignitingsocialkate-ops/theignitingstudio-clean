import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock, Send, Sparkles } from 'lucide-react';

export function WordPressContact() {
  const { siteSettings, settingsLoading } = useEnhancedContent();
  const { t, language } = useLanguage();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // Simulate form submission (replace with actual WordPress form submission)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // Get contact info based on language
  const contactInfo = siteSettings?.contact_info || {};
  const address = language === 'hu' && contactInfo.address_hu ? contactInfo.address_hu : contactInfo.address;
  const hours = language === 'hu' && contactInfo.hours_hu ? contactInfo.hours_hu : contactInfo.hours;

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-20 overflow-hidden"
    >
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`contact-bg-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full backdrop-blur-sm" />
          </motion.div>
        ))}

        {/* Floating contact icons */}
        {[Phone, Mail, MapPin, Clock].map((Icon, i) => (
          <motion.div
            key={`icon-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          >
            <Icon className="text-primary/20" size={32} />
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
              {t('contact.title')}
            </h2>
            
            <p 
              className="text-xl text-foreground/80 max-w-3xl mx-auto"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-xl relative overflow-hidden group"
              >
                {/* Card hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <label 
                        htmlFor="name" 
                        className="block text-sm font-medium text-foreground/80 mb-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {t('contact.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-foreground/80 mb-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {t('contact.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    className="relative"
                  >
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium text-foreground/80 mb-2"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 overflow-hidden group relative ${
                      isSubmitting 
                        ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {/* Button background animation */}
                    {!isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                    
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="relative z-10"
                      >
                        <Sparkles size={20} />
                      </motion.div>
                    ) : (
                      <Send className="relative z-10" size={20} />
                    )}
                    
                    <span className="relative z-10">
                      {isSubmitting ? (language === 'hu' ? 'Küldés...' : 'Sending...') : t('contact.send')}
                    </span>
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600"
                    >
                      <p style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {language === 'hu' ? 'Üzenet sikeresen elküldve!' : 'Message sent successfully!'}
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive"
                    >
                      <p style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {language === 'hu' ? 'Hiba történt. Kérjük próbálja újra.' : 'Something went wrong. Please try again.'}
                      </p>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.phone && (
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 
                        className="font-medium text-foreground"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        {t('contact.phone')}
                      </h3>
                      <p 
                        className="text-foreground/70"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {contactInfo.phone}
                      </p>
                    </div>
                  </motion.div>
                )}

                {contactInfo.email && (
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 
                        className="font-medium text-foreground"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        {t('contact.email')}
                      </h3>
                      <p 
                        className="text-foreground/70"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {contactInfo.email}
                      </p>
                    </div>
                  </motion.div>
                )}

                {address && (
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 
                        className="font-medium text-foreground"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        {t('contact.address')}
                      </h3>
                      <p 
                        className="text-foreground/70"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {address}
                      </p>
                    </div>
                  </motion.div>
                )}

                {hours && (
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 
                        className="font-medium text-foreground"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        {t('contact.hours')}
                      </h3>
                      <p 
                        className="text-foreground/70"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {hours}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-primary/10 border border-primary/20 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
                  animate={{
                    x: [-100, 100, -100],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative z-10">
                  <h3 
                    className="text-xl mb-3 title-readable-golden"
                    style={{ fontFamily: 'DM Serif Display, serif' }}
                  >
                    {language === 'hu' ? 'Készítsd elő a következő nagy lépésedet!' : 'Ready for your next big move?'}
                  </h3>
                  <p 
                    className="text-foreground/80 mb-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {language === 'hu' ? 
                      'Foglalj egy ingyenes konzultációt és beszéljük meg, hogyan segíthetünk.' :
                      'Schedule a free consultation and let\'s discuss how we can help.'
                    }
                  </p>
                  <motion.a
                    href="https://calendly.com/theignitingstudio/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span>{language === 'hu' ? 'Időpont foglalása' : 'Schedule a Call'}</span>
                    <Sparkles size={16} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Development indicator */}
      {(typeof process !== 'undefined' && process.env.NODE_ENV === 'development') && !settingsLoading && (
        <div className="mt-4 text-center">
          <span className="text-xs text-primary/70 bg-primary/10 px-2 py-1 rounded">
            ✓ WordPress Contact • Settings: {siteSettings ? 'Loaded' : 'Fallback'}
          </span>
        </div>
      )}
    </section>
  );
}