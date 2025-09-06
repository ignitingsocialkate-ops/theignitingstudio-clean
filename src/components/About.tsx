import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  return (
    <section id="about" ref={containerRef} className="py-16 relative min-h-screen flex items-center">

      <div ref={ref} className="container mx-auto px-6 relative">
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            className="lg:col-span-5 space-y-8 order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Header */}
            <div>
              <motion.div 
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-12 h-px bg-primary" />
                <span className="text-primary/80 tracking-widest uppercase text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t('about.title')}
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl mb-6 title-readable-golden-gradient"
                style={{ fontFamily: 'DM Serif Display, serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {t('about.title')}
              </motion.h2>
            </div>

            {/* Core Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="space-y-6"
            >
              <p 
                className="text-xl md:text-2xl leading-relaxed text-muted-foreground"
                style={{ fontFamily: 'Alice, serif' }}
              >
                {t('about.description')}
              </p>
            </motion.div>

            {/* Values Grid */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {[
                { icon: Sparkles, title: language === 'hu' ? 'Kreatív' : 'Creative', desc: language === 'hu' ? 'Innovatív megoldások' : 'Innovative solutions' },
                { icon: Heart, title: language === 'hu' ? 'Szenvedélyes' : 'Passionate', desc: language === 'hu' ? 'Szeretjük, amit csinálunk' : 'We love what we do' },
                { icon: Sparkles, title: language === 'hu' ? 'Gyors' : 'Fast', desc: language === 'hu' ? 'Villámgyors eredmények' : 'Lightning quick results' },
                { icon: Heart, title: language === 'hu' ? 'Kiválóság' : 'Excellence', desc: language === 'hu' ? 'Minőség minden részletben' : 'Quality in every detail' }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="text-center p-4 rounded-2xl hover:bg-primary/5 transition-colors group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon size={20} />
                  </div>
                  <h4 className="mb-1" style={{ fontFamily: 'DM Serif Display, serif' }}>
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="pt-8"
            >
              <div className="p-6 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border border-primary/20">
                <h4 className="text-xl mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>
                  {t('about.statsTitle')}
                </h4>
                <p className="text-muted-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t('about.mission')}
                </p>
                
                <div className="flex gap-4">
                  <motion.a
                    href="https://calendly.com/theignitingstudio/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t('about.cta')}
                  </motion.a>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      to={language === 'hu' ? '/hu/about' : '/about'}
                      className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-xl transition-all"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {t('about.cta')}
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Creative Visual */}
          <motion.div
            className="lg:col-span-7 relative order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          >
            {/* Main Image Container */}
            <div className="relative">
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600447766334-36a93f35a21d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMHBvcnRyYWl0JTIwdmVydGljYWwlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2OTQwNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="The Igniting Studio Creative Process"
                  className="w-full h-[600px] lg:h-[700px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/30" />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/20"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ fontFamily: 'DM Serif Display, serif' }}>
                      {language === 'hu' ? 'Kreatív Varázslat' : 'Creative Magic'}
                    </p>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {language === 'hu' ? 'Ahol az ötletek életre kelnek' : 'Where ideas come alive'}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-8 -left-8 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-3">
                  <Heart className="text-white" size={24} />
                  <div>
                    <p className="text-2xl font-bold" style={{ fontFamily: 'DM Serif Display, serif' }}>
                      100%
                    </p>
                    <p className="text-sm opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {language === 'hu' ? 'Szenvedélyvezérelt' : 'Passion Driven'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>


          </motion.div>


        </div>
      </div>


    </section>
  );
}