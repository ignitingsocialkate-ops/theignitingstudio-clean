import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, TrendingUp, Megaphone, Search, Users, BarChart3, ArrowRight, CheckCircle, Eye, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { StudioBackground } from './StudioBackground';
import { TextureOverlay } from './TextureOverlay';

export function SocialMediaPage() {
  const ref = useRef(null);
  const processRef = useRef(null);
  const portfolioRef = useRef(null);
  const pricingRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const portfolioInView = useInView(portfolioRef, { once: true, margin: "-100px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Target,
      title: "Content Strategy",
      description: "We develop a customized content plan aligned with your brand goals to ensure consistency and engagement across all platforms."
    },
    {
      icon: TrendingUp,
      title: "Organic Growth",
      description: "Through strategic planning and audience engagement, we grow your social media presence naturally, building an authentic following."
    },
    {
      icon: Megaphone,
      title: "Paid Advertisements",
      description: "We create and manage targeted ad campaigns to boost visibility, drive traffic, and increase conversions."
    },
    {
      icon: Search,
      title: "Account Audit",
      description: "We analyze your current social media performance to identify strengths, areas for improvement, and opportunities for growth."
    },
    {
      icon: Users,
      title: "Community Management",
      description: "We engage with your audience by responding to comments, messages, and inquiries, fostering a loyal community around your brand."
    },
    {
      icon: BarChart3,
      title: "Analytics and Reporting",
      description: "We provide regular insights and reports on performance metrics, so you're always informed about your social media progress."
    }
  ];

  const portfolioItems = [
    {
      title: "Frank Bordoni",
      description: "When Michelin-star chef Frank Bordoni launched his chocolate-focused cookbook, he asked us to help build momentum from scratch. With no existing social media presence, our job was to create something that truly felt like him — while also driving sales.",
      fullDescription: "We rolled up our sleeves and got to work. With our mid-tier package (strategy, content creation, and social media management), we built his brand presence from the ground up. In just under two months, Frank's audience began to flourish. His content started pulling in high engagement organically, and both his Instagram and TikTok accounts showed consistent growth — all without a single ad.",
      image: "https://images.unsplash.com/photo-1578338705925-51b521fb2e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2Jvb2slMjBjaG9jb2xhdGUlMjBmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU3MDU1MTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "/portfolio/frank-bordoni"
    },
    {
      title: "PureGems",
      description: "PureGems is a luxury gemstone online webshop that entrusted us with elevating their social media presence. We provided comprehensive social media management, including content creation and product photography, to showcase their stunning gemstone collections.",
      fullDescription: "Our approach focused on organic growth, helping PureGems build an engaged audience across TikTok, Instagram, and Pinterest. By crafting a tailored content strategy, designing a cohesive feed, and conducting an in-depth account audit, we ensured their online presence reflected the elegance and sophistication of their brand.",
      image: "https://images.unsplash.com/photo-1721206625539-42e1f345a468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnZW1zdG9uZSUyMGpld2VscnklMjBlbGVnYW50fGVufDF8fHx8MTc1NzA1NTEzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "/portfolio/puregems"
    },
    {
      title: "U4U Teen",
      description: "U4U Teen is a vibrant organization dedicated to empowering teenage girls. We managed their social media on Instagram and TikTok, focusing on creating meaningful connections with their audience.",
      fullDescription: "Our work included crafting engaging graphics and videos using Canva, tailored to resonate with young girls and promote the organization's mission. We also developed a comprehensive content strategy and a detailed content calendar, ensuring consistent and impactful messaging across both platforms.",
      image: "https://images.unsplash.com/photo-1545886082-e66c6b9e011a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlJTIwZ2lybHMlMjBlbXBvd2VybWVudCUyMHlvdXRoJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc1NzA1NTE0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "/portfolio/u4u-teen"
    },
    {
      title: "Anna Pastry Shop",
      description: "This local pastry shop came to us with a clear goal: get more people walking through the door. We partnered up using one of our starter packages, combining ad creation and management with consistent organic content.",
      fullDescription: "After just one month, the numbers — and the energy — spoke for themselves. Their social media came back to life: new followers, high engagement, and a clear boost in local interest. People were liking, commenting, and most importantly, showing up in person.",
      image: "https://images.unsplash.com/photo-1659352000773-db010210946c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBzaG9wJTIwYmFrZXJ5JTIwY2FrZXN8ZW58MXx8fHwxNzU3MDYwMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "/portfolio/anna-pastry"
    }
  ];

  const workProcess = [
    {
      number: "1",
      title: "Discovery and Research",
      description: "We begin with a discovery call to understand your goals and conduct a thorough analysis of your competitors, audience, and current social media presence."
    },
    {
      number: "2",
      title: "Strategy and Planning",
      description: "Based on our research, we create a customized social media strategy and develop a content calendar to ensure consistent and engaging posts."
    },
    {
      number: "3",
      title: "Content Creation and Management",
      description: "We craft optional content, including visuals and captions, and handle all aspects of posting and community management to keep your audience engaged."
    },
    {
      number: "4",
      title: "Review and Optimization",
      description: "At the end of each month, we review performance, provide a detailed report, and refine the strategy for continued growth and success."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 text-foreground relative">
      <StudioBackground />
      <TextureOverlay />
      <div className="relative" style={{ zIndex: 5 }}>
        <Header />
        
        <main className="relative">
          {/* Hero Section */}
          <section className="py-20 relative min-h-screen flex items-center">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <motion.div
                  className="flex items-center justify-center gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-12 h-px bg-primary" />
                  <span 
                    className="text-primary/80 tracking-widest uppercase text-sm font-medium"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    the igniting studio
                  </span>
                  <div className="w-12 h-px bg-primary" />
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl mb-8 title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Social Media Management
                </motion.h1>
              </motion.div>
            </div>
          </section>

          {/* What We Do Section */}
          <section ref={ref} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 
                  className="text-4xl md:text-5xl mb-6 title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  What we do
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card/60 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                      <service.icon size={24} />
                    </div>
                    <h3 
                      className="text-xl mb-4"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section ref={portfolioRef} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 
                  className="text-4xl md:text-5xl mb-6 title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  Portfolio
                </h2>
              </motion.div>

              <div className="space-y-16 max-w-6xl mx-auto">
                {portfolioItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                  >
                    {/* Image */}
                    <motion.div
                      className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/30" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                    >
                      <h3 
                        className="text-3xl md:text-4xl title-readable-golden"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        {item.title}
                      </h3>
                      
                      <p 
                        className="text-lg leading-relaxed text-muted-foreground"
                        style={{ fontFamily: 'Alice, serif' }}
                      >
                        {item.description}
                      </p>

                      <p 
                        className="text-lg leading-relaxed text-muted-foreground"
                        style={{ fontFamily: 'Alice, serif' }}
                      >
                        {item.fullDescription}
                      </p>

                      <Link to={item.link}>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          More Details
                          <ArrowRight size={16} />
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Portfolio CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-center mt-16"
              >
                <Link to="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground px-10 py-4 rounded-xl text-lg flex items-center gap-3 mx-auto group overflow-hidden shadow-lg relative"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: '-200%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <span className="relative z-10">Check Out Our Portfolio</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Work Process Section */}
          <section ref={processRef} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 
                  className="text-4xl md:text-5xl mb-6 title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  Our work process
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {workProcess.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <motion.div 
                      className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-transform"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {step.number}
                    </motion.div>
                    <h3 
                      className="text-xl mb-4"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section ref={pricingRef} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 
                  className="text-4xl md:text-5xl mb-6 title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  Pricing
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-card/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-primary/20 shadow-xl">
                  <div className="space-y-8">
                    <p 
                      className="text-lg leading-relaxed text-muted-foreground"
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      We understand that every business is unique, and a one-size-fits-all approach doesn't always work. That's why we offer custom packages tailored to your specific needs and goals. Whether you're looking for full-service management or support in specific areas, we'll create a plan that works for you.
                    </p>



                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                      <h4 
                        className="text-xl mb-4"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        Interested in a custom package?
                      </h4>
                      <p 
                        className="text-muted-foreground mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Let us design a solution that fits your business perfectly. Get in touch, and we'll create a package tailored to your unique needs and goals.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Connect with us!
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="bg-gradient-to-br from-card/90 via-card/70 to-card/50 p-12 rounded-3xl border border-primary/30 backdrop-blur-sm overflow-hidden relative">
                  <div className="relative z-10">
                    <h3 
                      className="text-3xl md:text-4xl mb-6 title-readable-golden-gradient"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      Ignite your brand, elevate your business.
                    </h3>
                    
                    <p 
                      className="text-lg text-muted-foreground mb-8 leading-relaxed" 
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      Let us take the weight of digital management off your shoulders. From managing your social media to crafting stunning websites and turning complex data into clear insights, we're here to help your business grow and thrive while you focus on what you do best.
                    </p>
                    
                    <motion.button
                      whileHover={{ 
                        scale: 1.05, 
                        y: -3,
                        boxShadow: "0 20px 40px rgba(212, 157, 67, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary text-primary-foreground px-10 py-4 rounded-xl text-lg flex items-center gap-3 mx-auto group overflow-hidden shadow-lg relative"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        initial={{ x: '-200%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                      />
                      
                      <span className="relative z-10">Start Your Journey</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative z-10"
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}