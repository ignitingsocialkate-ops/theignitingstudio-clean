import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: language === 'hu' ? 'Írj Nekünk' : 'Email Us',
      value: "hello@theignitingstudio.com",
      link: "mailto:hello@theignitingstudio.com"
    },
    {
      icon: Phone,
      title: language === 'hu' ? 'Hívj Fel' : 'Call Us',
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    }
  ];

  return (
    <section id="contact" ref={ref}>
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 title-readable-golden-gradient" style={{ fontFamily: 'DM Serif Display, serif' }}>
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl mb-8 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
              {t('contact.title')}
            </h3>
            
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="flex items-center gap-4 p-6 bg-card/60 backdrop-blur-sm rounded-xl border border-primary/20 hover:shadow-lg hover:border-primary/40 transition-all group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon className="text-primary" size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20"
            >
              <h4 className="font-medium mb-4 text-foreground" style={{ fontFamily: 'DM Serif Display, serif' }}>
{language === 'hu' ? 'Mire Számíthatsz' : 'What to Expect'}
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
{language === 'hu' ? 'Gyors válasz 24 órán belül' : 'Quick response within 24 hours'}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
{language === 'hu' ? 'Ingyenes konzultáció és projektértékelés' : 'Free consultation and project assessment'}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
{language === 'hu' ? 'Átlátható árazás és határidő' : 'Transparent pricing and timeline'}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
{language === 'hu' ? 'Teljes körű támogatás a projekt alatt' : 'Dedicated support throughout your project'}
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 shadow-lg"
          >
            <h3 className="text-2xl mb-6 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
              {t('contact.send')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="John"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label className="block text-sm font-medium mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {language === 'hu' ? 'Vezetéknév' : 'Last Name'}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="Doe"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <label className="block text-sm font-medium mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="john.doe@example.com"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <label className="block text-sm font-medium mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {language === 'hu' ? 'Tárgy' : 'Subject'}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder={language === 'hu' ? 'Miben segíthetünk?' : 'What can we help you with?'}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <label className="block text-sm font-medium mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t('contact.message')}
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  placeholder={language === 'hu' ? 'Mesélj a projektedről és hogy tudunk segíteni...' : 'Tell us about your project and how we can help...'}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </motion.div>

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitted}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 relative overflow-hidden shadow-lg"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: '-200%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    <span className="relative z-10">{language === 'hu' ? 'Üzenet Sikeresen Elküldve!' : 'Message Sent Successfully!'}</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span className="relative z-10">{t('contact.send')}</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}