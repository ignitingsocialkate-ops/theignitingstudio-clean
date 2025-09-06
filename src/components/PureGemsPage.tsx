import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Camera, TrendingUp, Eye, Instagram } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PureGemsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const portfolioImages = [
    "https://images.unsplash.com/photo-1602752249980-294b1d1e9ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnZW1zdG9uZSUyMGpld2VscnklMjBkaWFtb25kc3xlbnwxfHx8fDE3NTcwNjAzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1708221269460-fc630272e54d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwbW9kZWwlMjB3ZWFyaW5nJTIwcmluZ3N8ZW58MXx8fHwxNzU3MDYwMzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1662289032144-3ed681fdd260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW1zdG9uZSUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeSUyMGx1eHVyeXxlbnwxfHx8fDE3NTcwNjAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

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
              PureGems
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              PureGems, a luxury gemstone brand, approached me to elevate their social media presence and refine their online aesthetic. They were looking to create a cohesive style that reflected their luxury, clean, yet unique brand identity while also leveraging their content to reach new audiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-16"
          >
            <ImageWithFallback
              src={portfolioImages[0]}
              alt="PureGems luxury jewelry"
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
                Through social media management, content creation, and product photography, we developed a strategy that helped PureGems grow their presence across Instagram, TikTok, and Pinterest.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Services</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Social Media Management, Content Creation, Product Photography</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Platforms</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Instagram, TikTok, Pinterest</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>Focus</h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Luxury Brand Aesthetic, Organic Growth</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Gallery */}
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
              Portfolio Gallery
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              A showcase of the luxury content we created for PureGems
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {portfolioImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <ImageWithFallback
                  src={image}
                  alt={`PureGems portfolio item ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {index === 0 && "Luxury Diamond Collection"}
                    {index === 1 && "Model Photography Session"}
                    {index === 2 && "Product Photography"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-20">
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
                When I began working with PureGems, their social media lacked a defined style and consistency. They wanted to vamp up their platforms but weren't sure what approach worked best for their audience.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Budget constraints required us to maximize impact with shared content across platforms, while still customizing our approach for Pinterest to drive better engagement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Process */}
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
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Initial Instagram Audit</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                We started with a thorough Instagram audit to identify gaps and opportunities. This included rewriting their bio to better reflect their brand, designing custom highlight covers, and ensuring their profile presented a polished, cohesive look.
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
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Cohesive Feed Design</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                After trial and error, we developed a consistent feed design and style that embodied PureGems' luxury aesthetic. This approach balanced clean visuals with creative elements to showcase the uniqueness of their products.
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
                  <Camera className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Content Creation</h3>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  To bring the brand to life, we created:
                </p>
                <ul className="space-y-2 text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Model Photography:</strong> Highlighting the jewelry in elegant, real-world settings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Product Photography:</strong> Clean, professional images for both social media and their webshop.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Short Videos:</strong> High-performing Reels designed to maximize reach and engagement, leveraging the algorithm to attract non-followers.</span>
                  </li>
                </ul>
              </div>
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
                  <Instagram className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Platform Strategies</h3>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <strong>Instagram & TikTok:</strong> Shared content to maximize resources while maintaining consistent posting schedules.
                </p>
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <strong>Pinterest:</strong> Developed a tailored strategy to post multiple images across different boards, connecting with the audience and enhancing brand visibility.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'DM Serif Display, serif' }}>Monthly Strategy Check-ins</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                We held regular meetings to analyze performance, discuss what worked, and refine the strategy. This ensured our approach was always aligned with the brand's goals and evolving needs.
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
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Let's create a luxury aesthetic that truly represents your brand's uniqueness.
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