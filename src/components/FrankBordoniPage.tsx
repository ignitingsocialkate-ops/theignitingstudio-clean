import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, TrendingUp, Users, Heart } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FrankBordoniPage() {
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
              Frank Bordoni Recipes
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              When Michelin-star chef Frank Bordoni launched his chocolate-focused cookbook, he asked us to help build momentum from scratch. With no existing social media presence, our job was to create something that truly felt like him — while also driving sales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-16"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1602513902411-40bc2cf5044a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwZm9vZCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1NzA2MDM2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Frank Bordoni chocolate cookbook"
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
                We rolled up our sleeves and got to work. With our mid-tier package (strategy, content creation, and social media management), we built his brand presence from the ground up. In just under two months, Frank's audience began to flourish. His content started pulling in high engagement organically, and both his Instagram and TikTok accounts showed consistent growth — all without a single ad.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Timeline</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>2 months</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Services</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Strategy, Content Creation, Social Media Management</p>
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
              <p className="text-muted-foreground leading-relaxed text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Frank is a chef, not a content creator. And while his name carries weight in the food world, he didn't have time to show up on camera or film videos. The challenge? Create faceless content that still feels personal — that reflects his expertise and his vibe, without him needing to be front and center.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
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
              Our Approach
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Creating accounts from scratch</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                First things first: we built the account from the ground up.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                We handled everything — the username, the bio, the colors, the fonts. No guesswork, no messy visuals. Just a clean, cohesive setup that matched Frank's style and the tone of the cookbook.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                The goal was to make it look like the brand was already established — even before the first post went live.
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
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Content Strategy and Creation</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Once the foundations were set, we dove into strategy. We researched competitors, spotted what was working in the faceless food niche, and tailored it to Frank's style.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                He sent us a few voiceovers and raw clips, but the rest came from our kitchen (literally). We developed recipes, shot beautiful step-by-step videos, styled chocolate creations, and built a feed that gave value and had that indulgent, luxurious vibe people want from a cookbook like his.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                We watched what the audience loved, refined our content rhythm, and stayed consistent. Within weeks, people were liking, saving, and engaging — no ads needed.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Platform Strategies</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our main focus was on Instagram and TikTok — the perfect platforms for the kind of short, tip-filled and recipe-driven videos we created. By consistently posting value-packed content and engaging directly with the audience, we built an active, loyal community that interacted with the brand daily.
            </p>
          </motion.div>
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
            className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Heart className="text-primary" size={24} />
              </div>
              <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Organic Growth Success</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              In just two months, both Instagram and TikTok grew from zero to over 500 followers — all organically, with no ads. More importantly, the audience wasn't just growing, it was engaged: many posts pulled in 50–100+ likes and comments, creating a consistent, active community from day one.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl mb-2 text-primary" style={{ fontFamily: 'DM Serif Display, serif' }}>500+</div>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Followers (Each Platform)</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl mb-2 text-primary" style={{ fontFamily: 'DM Serif Display, serif' }}>100%</div>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Organic Growth</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl mb-2 text-primary" style={{ fontFamily: 'DM Serif Display, serif' }}>2</div>
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Months Timeline</p>
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
              Ready to Build Your Brand?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Let's create something amazing for your brand, just like we did for Frank.
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