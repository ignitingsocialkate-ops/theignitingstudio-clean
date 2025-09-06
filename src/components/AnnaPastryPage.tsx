import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, TrendingUp, Target, Users, Eye, Calendar } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AnnaPastryPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft size={20} />
              <span style={{ fontFamily: 'Poppins, sans-serif' }}>Back to Portfolio</span>
            </Link>
            
            <h1 className="text-4xl md:text-6xl mb-6 title-readable-golden-gradient" style={{ fontFamily: 'DM Serif Display, serif' }}>
              Anna Pastry Shop
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Anna is a cozy, family-run pastry shop nestled in the heart of our hometown in Hungary. Known for their handmade cakes, delicious ice cream, and warm, welcoming atmosphere, they've been a local favorite for years.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-16"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1659352000773-db010210946c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBzaG9wJTIwYmFrZXJ5JTIwY2FrZXN8ZW58MXx8fHwxNzU3MDYwMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Anna Pastry Shop interior with delicious cakes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-start mb-20"
          >
            <div>
              <h2 className="text-3xl md:text-4xl mb-6 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                Project Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                When they reached out, their focus was simple: bring in more foot traffic and connect with the local community — especially during the summer season. They weren't looking to go viral; they just wanted real results, right here, where it matters.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Timeline</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>1 month (with ongoing success)</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Services</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Ad Creation & Management, Organic Content</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Location</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Hungary (Local Campaign)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl mb-8 title-readable-golden text-center" style={{ fontFamily: 'DM Serif Display, serif' }}>
              The Challenge
            </h2>
            
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
              <p className="text-muted-foreground leading-relaxed text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Anna Pastry Shop had all the right ingredients — delicious cakes, a charming atmosphere, and loyal customers — but they needed a stronger online presence to keep the foot traffic flowing.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                With a limited budget, the goal was to make every post, ad, and story count. We focused on using digital marketing to drive real-world results — turning local reach into actual visits, and helping the community rediscover their favorite neighborhood pastry shop.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
              The Process
            </h2>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Eye className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Initial Account Audit</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                We started with a full audit of their existing Facebook and Instagram presence. Their Facebook already had a strong local following, so we focused on finding the content gaps and identifying what could actually drive foot traffic.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                We also did a competitor analysis to see what other local businesses were posting — what worked, what didn't — and used that insight to guide our tone, visual direction, and content plan moving forward.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Target className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Content Strategy & Pillars</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Instead of just posting sweets, we built out a full content strategy based on clear pillars — from product highlights and behind-the-scenes moments to local engagement and seasonal specials.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                This gave the feed structure and variety while staying true to the brand. Each post had a purpose: to connect, inform, or tempt people into visiting — not just to fill a grid.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <MapPin className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Ad Campaign Management</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                With a limited budget, we focused on one thing: making the most out of every click. We created a targeted ad campaign that showcased their summer cake lineup — fresh visuals, tempting captions, and a clear call to action.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Instead of sending users to a website, the ads linked directly to their Google Maps location. The goal? Get people off their phones and into the shop. Simple, local, and effective.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
              Results
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 max-w-4xl mx-auto mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Immediate Impact</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              After just one month, the numbers — and the energy — spoke for themselves. Their social media came back to life: new followers, high engagement, and a clear boost in local interest. People were liking, commenting, and most importantly, showing up in person.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl mb-2 text-primary" style={{ fontFamily: 'DM Serif Display, serif' }}>1</div>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Month to Results</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl mb-2 text-primary" style={{ fontFamily: 'DM Serif Display, serif' }}>↑</div>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Increased Foot Traffic</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl mb-2 text-primary" style={{ fontFamily: 'DM Serif Display, serif' }}>🎯</div>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Local Community Engagement</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
              What Made It Work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 text-center"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary" size={24} />
              </div>
              <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Local Focus</h3>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Targeted local audience with geo-specific ads and community engagement
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 text-center"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="text-primary" size={24} />
              </div>
              <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Smart Budget Use</h3>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Maximized limited budget with strategic ad placement and organic content
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 text-center"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-primary" size={24} />
              </div>
              <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Seasonal Timing</h3>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Perfect summer campaign timing to boost foot traffic during peak season
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
              Ready to Drive Local Traffic?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Let's bring more customers through your doors with smart, budget-friendly campaigns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://calendly.com/theignitingstudio/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl flex items-center gap-3 cursor-pointer shadow-lg"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <span>Schedule a Call</span>
                <ArrowRight size={20} />
              </motion.a>
              
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-primary text-primary px-8 py-4 rounded-xl cursor-pointer"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  View All Services
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}