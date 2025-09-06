import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Video, Camera, Users, Palette, ArrowRight, Play, Grid3X3, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { StudioBackground } from './StudioBackground';
import { TextureOverlay } from './TextureOverlay';

export function ContentCreationPage() {
  const ref = useRef(null);
  const processRef = useRef(null);
  const portfolioRef = useRef(null);
  const pricingRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const portfolioInView = useInView(portfolioRef, { once: true, margin: "-100px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" });

  const [activePortfolioTab, setActivePortfolioTab] = useState('model');

  const services = [
    {
      icon: Video,
      title: "Videography",
      description: "We create professional, engaging videos tailored to showcase your brand and captivate your audience."
    },
    {
      icon: Camera,
      title: "Product Photos",
      description: "High-quality images that highlight your products, making them stand out and appeal to your customers."
    },
    {
      icon: Users,
      title: "Model Photography",
      description: "Dynamic and relatable visuals featuring models that bring your products or services to life."
    },
    {
      icon: Palette,
      title: "Branded Graphic Designs",
      description: "Custom-designed graphics, such as quotes or announcements, created to align perfectly with your brand's visual identity."
    }
  ];

  const workProcess = [
    {
      number: "1",
      title: "Idea Discussion",
      description: "We start with a call to discuss your vision, goals, and project details to ensure we're aligned with your expectations."
    },
    {
      number: "2",
      title: "Moodboard and Previews",
      description: "We create a moodboard and/or preview concepts to outline the visual direction and ensure the content reflects your brand perfectly."
    },
    {
      number: "3",
      title: "Content Creation",
      description: "Our team brings your ideas to life through professional videography, photography, or graphic design tailored to your needs."
    },
    {
      number: "4",
      title: "Editing and Final Touches",
      description: "We refine the content with Photoshop, effects, and other enhancements to deliver polished, ready-to-use visuals."
    }
  ];

  // Portfolio data - using placeholder images that represent the content types
  const portfolioData = {
    model: [
      { title: "PureGems Studio Shoot", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2RlbCUyMGpld2VscnklMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NTcwNTU1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "PureGems Studio Shoot", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwbW9kZWwlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NTcwNTU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "PureGems Studio Shoot", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW1zdG9uZSUyMG1vZGVsJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU3MDU1NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "PureGems Studio Shoot", image: "https://images.unsplash.com/photo-1506629905370-bbd29d7d6b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2RlbCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1NzA1NTU0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "PureGems Studio Shoot", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwbW9kZWwlMjBzdHVkaW8lMjBzaG9vdHxlbnwxfHx8fDE3NTcwNTU1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "PureGems Studio Shoot", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBtb2RlbCUyMGpld2VscnklMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NTcwNTU1NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "PureGems Studio Shoot", image: "https://images.unsplash.com/photo-1599582909646-3e8e936b7b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwbW9kZWwlMjBwaG90b3xsZW58MXx8fHwxNzU3MDU1NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "PureGems Jewellery", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbGxlcnklMjBtb2RlbCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1NzA1NTU1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" }
    ],
    product: [
      { title: "Luxury Product Photography", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU3MDU1NTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "Product Studio Setup", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwc3R1ZGlvJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU3MDU1NTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "Cosmetics Photography", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjb3NtZXRpY3MlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU3MDU1NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "Food Product Photography", image: "https://images.unsplash.com/photo-1578338705925-51b521fb2e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1NzA1NTU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "E-commerce Photography", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU3MDU1NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "Technology Products", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1NzA1NTU3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" }
    ],
    videography: [
      { title: "Chocolate Cookbook", image: "https://images.unsplash.com/photo-1578338705925-51b521fb2e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjaG9jb2xhdGUlMjBjb29rYm9vayUyMHZpZGVvfGVufDF8fHx8MTc1NzA1NTU3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", duration: "2:30" },
      { title: "Chocolate Cookbook", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjaG9jb2xhdGUlMjBjb29raW5nJTIwdmlkZW98ZW58MXx8fHwxNzU3MDU1NTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", duration: "1:45" },
      { title: "Jewellery Product", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqZXdlbGxlcnklMjBwcm9kdWN0JTIwdmlkZW98ZW58MXx8fHwxNzU3MDU1NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", duration: "0:16" },
      { title: "Jewellery Product", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqZXdlbHJ5JTIwcHJvZHVjdCUyMHZpZGVvZ3JhcGh5fGVufDF8fHx8MTc1NzA1NTU4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", duration: "0:32" },
      { title: "Luxury Villas", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYXMlMjB2aWRlb2dyYXBoeXxlbnwxfHx8fDE3NTcwNTU1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", duration: "3:20" },
      { title: "TheIgnitingStudio Branding", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMHZpZGVvZ3JhcGh5fGVufDF8fHx8MTc1NzA1NTU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", duration: "1:20" },
      { title: "Revox Coffee Serum", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjb2ZmZWUlMjBzZXJ1bSUyMHByb2R1Y3QlMjB2aWRlb3xlbnwxfHx8fDE3NTcwNTU1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", duration: "0:45" },
      { title: "Luxury Villas Story", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHN0b3J5JTIwdmlkZW98ZW58MXx8fHwxNzU3MDU1NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", duration: "2:15" }
    ],
    graphics: [
      { title: "Social Media Graphics", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGdyYXBoaWMlMjBkZXNpZ258ZW58MXx8fHwxNzU3MDU1NTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "Brand Identity Design", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZ3JhcGhpYyUyMGRlc2lnbnxlbnwxfHx8fDE3NTcwNTU2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "Quote Graphics", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhxdW90ZSUyMGdyYXBoaWMlMjBkZXNpZ258ZW58MXx8fHwxNzU3MDU1NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "Marketing Materials", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBtYXRlcmlhbHMlMjBkZXNpZ258ZW58MXx8fHwxNzU3MDU1NjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "Digital Announcements", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkaWdpdGFsJTIwYW5ub3VuY2VtZW50JTIwZGVzaWdufGVufDF8fHx8MTc1NzA1NTYxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { title: "Brand Campaigns", image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhicmFuZCUyMGNhbXBhaWduJTIwZGVzaWdufGVufDF8fHx8MTc1NzA1NTYxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" }
    ]
  };

  const portfolioTabs = [
    { id: 'model', label: 'Model Product Photography', icon: Users },
    { id: 'product', label: 'Product Photography', icon: Camera },
    { id: 'videography', label: 'Videography', icon: Video },
    { id: 'graphics', label: 'Branded Graphic Designs', icon: Palette }
  ];

  const [visibleItems, setVisibleItems] = useState({
    model: 6,
    product: 6,
    videography: 6,
    graphics: 6
  });

  const loadMore = (category: string) => {
    setVisibleItems(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev] + 6
    }));
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
                  Content Creation
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

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                transition={{ duration: 0.8, delay: 0.6 }}
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

              {/* Portfolio Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                {portfolioTabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActivePortfolioTab(tab.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                      activePortfolioTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <tab.icon size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Portfolio Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={portfolioInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                {portfolioTabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`${activePortfolioTab === tab.id ? 'block' : 'hidden'}`}
                  >
                    {activePortfolioTab === 'videography' ? (
                      // Video Grid Layout
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioData.videography.slice(0, visibleItems.videography).map((video, index) => (
                          <motion.div
                            key={`${video.title}-${index}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group cursor-pointer rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all"
                            whileHover={{ y: -5 }}
                          >
                            <div className="relative aspect-video">
                              <ImageWithFallback
                                src={video.image}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                              
                              {/* Play Button */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary transition-colors"
                                >
                                  <Play size={24} className="text-white ml-1" />
                                </motion.div>
                              </div>

                              {/* Duration Badge */}
                              <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs">
                                {video.duration}
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <h4 className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {video.title}
                              </h4>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      // Image Grid Layout
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {portfolioData[activePortfolioTab as keyof typeof portfolioData].slice(0, visibleItems[activePortfolioTab as keyof typeof visibleItems]).map((item, index) => (
                          <motion.div
                            key={`${item.title}-${index}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group cursor-pointer rounded-xl overflow-hidden bg-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all aspect-square"
                            whileHover={{ y: -3, scale: 1.02 }}
                          >
                            <ImageWithFallback
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                              <p className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {item.title}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Load More Button */}
                    {portfolioData[activePortfolioTab as keyof typeof portfolioData].length > visibleItems[activePortfolioTab as keyof typeof visibleItems] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mt-12"
                      >
                        <motion.button
                          onClick={() => loadMore(activePortfolioTab)}
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
                ))}
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