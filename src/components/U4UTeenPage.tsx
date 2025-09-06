import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, TrendingUp, Users, Heart, Target, Zap } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function U4UTeenPage() {
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
              U4U Teen Organization
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              U4U Teen is a dynamic organization dedicated to supporting teenagers by fostering a safe community where they can talk freely, be themselves, and find resources to navigate mental health challenges. Partnering with U4U was an exciting opportunity, as their confident brand voice and image allowed for a creative exploration of strategies that resonated with teens.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-16"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1545886082-e66c6b9e011a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybHMlMjB5b3V0aCUyMGVtcG93ZXJtZW50fGVufDF8fHx8MTc1NzA2MDM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="U4U Teen Organization empowering youth"
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
                Through social media management, content creation, and collaborations, we built an engaging presence for U4U Teen on Instagram and TikTok, helping them connect with their audience in meaningful ways.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Target Audience</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Teenagers seeking community and mental health support</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Services</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Social Media Management, Content Creation, Influencer Collaboration</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Platforms</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Instagram, TikTok</p>
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
                Working with a teen audience required staying up-to-date with trends, maintaining a fun yet sensitive tone, and overcoming challenges related to Instagram's algorithm, which prioritizes child protection.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Additionally, since the organization preferred not to feature actual teens in their content, we needed to creatively represent their message through graphics and videos.
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
                  <Target className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Platform Strategy Development</h3>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <strong>Instagram:</strong> Leveraged U4U's established brand voice to create engaging carousels, videos, and graphics centered on teen-related issues.
                </p>
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <strong>TikTok:</strong> Recommended and introduced TikTok to their strategy, recognizing its dominance among teenage audiences.
                </p>
              </div>
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
                  <Heart className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Content Creation</h3>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Created a variety of carousels, graphics, and short videos that addressed common teen challenges while keeping the tone fun and approachable.
                </p>
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Ensured all content aligned with U4U's mission and stayed relevant to trends teens were engaging with.
                </p>
              </div>
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
                  <Users className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Influencer Collaboration</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Partnered with a teen influencer to amplify U4U's message, resulting in significantly higher engagement and a boost in followers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Zap className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Adaptability and Problem-Solving</h3>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Worked around the limitations of Instagram's child-protective algorithm, ensuring all content met guidelines while still engaging the target audience.
                </p>
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Focused on creative, visually appealing designs in Canva to compensate for the absence of real-life teen visuals.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Results */}
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
              Key Achievements
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-primary" size={32} />
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>Higher Engagement</h3>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Significantly increased engagement through influencer collaboration
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>Follower Growth</h3>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Boosted follower count across both Instagram and TikTok
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary" size={32} />
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>Safe Community</h3>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Successfully navigated platform guidelines while maintaining authentic teen engagement
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
              Ready to Connect with Your Audience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Let's build meaningful connections and create content that resonates with your community.
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