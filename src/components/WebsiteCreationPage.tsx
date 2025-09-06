import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Figma, Code2, Palette, ShoppingCart, Zap, ArrowRight, Monitor, Smartphone, Tablet } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { StudioBackground } from './StudioBackground';
import { TextureOverlay } from './TextureOverlay';

export function WebsiteCreationPage() {
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
      icon: Figma,
      title: "Website Design in Figma",
      description: "Custom, modern designs created in Figma to perfectly match your brand's vision before bringing it to life."
    },
    {
      icon: Code2,
      title: "WordPress Website with Templates",
      description: "Efficient and professional websites built using high-quality templates, customized to fit your business needs."
    },
    {
      icon: Palette,
      title: "Custom WordPress Website Design",
      description: "Fully personalized websites designed to reflect your unique brand and meet your specific needs."
    },
    {
      icon: ShoppingCart,
      title: "WooCommerce Webshop Building",
      description: "Complete e-commerce solutions with custom WooCommerce development to help you sell online successfully."
    },
    {
      icon: Zap,
      title: "Modern Websites with AI Enhancement",
      description: "Very modern websites with animations and effects, using AI to help speed up the development process and deliver cutting-edge results."
    }
  ];

  const workProcess = [
    {
      number: "1",
      title: "Discussion & Discovery",
      description: "We start with a conversation or a detailed website questionnaire to understand your ideas, vision, and goals for the project."
    },
    {
      number: "2",
      title: "Moodboard & Inspiration",
      description: "Next, we create a moodboard or gather template inspirations to establish the visual style and direction of your website."
    },
    {
      number: "3",
      title: "Wireframe & Web Copy",
      description: "We design a wireframe to map out the structure of your website and if needed assist with creating compelling web copy to match your brand."
    },
    {
      number: "4",
      title: "Design & Creation",
      description: "Finally, we bring your vision to life by designing or building your website, ensuring it's polished, functional, and ready to launch."
    }
  ];

  // Portfolio data - showcasing different types of websites
  const portfolioData = [
    { 
      title: "Modern Business Website", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXNpbmVzcyUyMHdlYnNpdGUlMjBkZXNpZ258ZW58MXx8fHwxNzU3MDU1NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Business"
    },
    { 
      title: "E-commerce Store", 
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1NzA1NTcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "E-commerce"
    },
    { 
      title: "Creative Portfolio", 
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMHdlYnNpdGV8ZW58MXx8fHwxNzU3MDU1NzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Portfolio"
    },
    { 
      title: "Restaurant Website", 
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTcwNTU3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Restaurant"
    },
    { 
      title: "Fashion Brand", 
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYnJhbmQlMjB3ZWJzaXRlfGVufDF8fHx8MTc1NzA1NTczOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Fashion"
    },
    { 
      title: "Tech Startup", 
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMHdlYnNpdGV8ZW58MXx8fHwxNzU3MDU1NzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Technology"
    },
    { 
      title: "Healthcare Practice", 
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTcwNTU3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Healthcare"
    },
    { 
      title: "Real Estate Agency", 
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NTcwNTU3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Real Estate"
    }
  ];

  const [visibleItems, setVisibleItems] = useState(6);

  const loadMore = () => {
    setVisibleItems(prev => prev + 6);
  };

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
                  Website Design & Creation
                </motion.h1>
              </motion.div>
            </div>
          </section>

          {/* Hire Us For Section */}
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
                  Hire Us For
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

              {/* Portfolio CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-center mt-16"
              >
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
              </motion.div>
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

              {/* Portfolio Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={portfolioInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {portfolioData.slice(0, visibleItems).map((project, index) => (
                  <motion.div
                    key={`${project.title}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all">
                      {/* Website Preview Container */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {/* Browser Chrome */}
                        <div className="absolute top-0 left-0 right-0 bg-muted/80 p-2 z-10">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            </div>
                            <div className="flex-1 bg-white/50 rounded-sm h-4 ml-2"></div>
                          </div>
                        </div>
                        
                        {/* Website Screenshot */}
                        <div className="pt-10">
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Device Icons */}
                        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 p-2 rounded-lg">
                            <Monitor size={16} className="text-muted-foreground" />
                          </div>
                          <div className="bg-white/90 p-2 rounded-lg">
                            <Tablet size={16} className="text-muted-foreground" />
                          </div>
                          <div className="bg-white/90 p-2 rounded-lg">
                            <Smartphone size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 
                              className="text-lg mb-2"
                              style={{ fontFamily: 'DM Serif Display, serif' }}
                            >
                              {project.title}
                            </h4>
                            <span className="text-sm text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                              {project.category}
                            </span>
                          </div>
                          <motion.div
                            whileHover={{ x: 3 }}
                            className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ArrowRight size={20} />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {portfolioData.length > visibleItems && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-12"
                >
                  <motion.button
                    onClick={loadMore}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Load More
                  </motion.button>
                </motion.div>
              )}
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
                      className="text-lg leading-relaxed text-muted-foreground text-center"
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      Our prices are fully customized, because no two projects are the same. If you're interested in working together, just send a message with a few details about your project — what you need, your goals, or even just a rough idea — and we'll get back to you with a tailored plan that fits your needs.
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