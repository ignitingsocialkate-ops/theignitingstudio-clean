import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { BarChart3, Database, Shield, TrendingUp, Zap, ArrowRight, Eye, Lock, Users, Target } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { StudioBackground } from './StudioBackground';
import { TextureOverlay } from './TextureOverlay';

export function BusinessIntelligencePage() {
  const ref = useRef(null);
  const processRef = useRef(null);
  const technologyRef = useRef(null);
  const portfolioRef = useRef(null);
  const pricingRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const technologyInView = useInView(technologyRef, { once: true, margin: "-100px" });
  const portfolioInView = useInView(portfolioRef, { once: true, margin: "-100px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" });

  const keyFeatures = [
    {
      icon: BarChart3,
      title: "Dynamic Interactive Dashboards",
      description: "Transform raw data into meaningful insights with custom Power BI dashboards tailored to your business needs."
    },
    {
      icon: Database,
      title: "Multiple Data Source Integration",
      description: "Connect all your data sources for a comprehensive view of your operations and business performance."
    },
    {
      icon: TrendingUp,
      title: "Key Metrics & Trend Analysis",
      description: "Track essential KPIs, identify patterns, and make informed decisions with clear, actionable insights."
    },
    {
      icon: Target,
      title: "Customized Business Solutions",
      description: "Every dashboard is specifically designed to align with your unique goals, workflows, and industry requirements."
    }
  ];

  const workProcess = [
    {
      number: "1",
      title: "Discovery Call",
      description: "We start with a call to understand your needs, what insights you're looking for, and the scope of your project. This helps us identify your goals and tailor our approach to your business."
    },
    {
      number: "2",
      title: "Data Integration and Modeling",
      description: "Next, we gather your data sources and create a robust data model. This ensures all your data is connected and structured for accurate and meaningful analysis."
    },
    {
      number: "3",
      title: "Report Creation and Security Setup",
      description: "We design and develop the dashboard, complete with the insights you need. During this step, we also implement the necessary security measures to protect your data and ensure proper access control."
    },
    {
      number: "4",
      title: "Testing, Refinement, and Enhancements",
      description: "Finally, we test the dashboard thoroughly, make adjustments based on your feedback, and incorporate any nice-to-have features to enhance functionality and usability."
    }
  ];

  const powerBIFeatures = [
    {
      icon: Zap,
      title: "Real-time Dashboards",
      description: "Dynamic features that provide live data updates and instant insights"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in security measures to keep your sensitive data protected"
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "Grows with your business needs from small teams to enterprise level"
    },
    {
      icon: Users,
      title: "Collaborative Platform",
      description: "Share insights across teams with proper access control and permissions"
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
                  Business Intelligence
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                  style={{ fontFamily: 'Alice, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Transform your data into actionable insights with dynamic Power BI dashboards
                </motion.p>
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
                  className="text-4xl md:text-5xl mb-8 title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  What we do
                </h2>
                
                <div className="max-w-4xl mx-auto">
                  <p 
                    className="text-lg leading-relaxed text-muted-foreground mb-8"
                    style={{ fontFamily: 'Alice, serif' }}
                  >
                    We specialize in creating dynamic, interactive dashboards using Power BI that transform raw data into meaningful insights, empowering better decision-making and improving your understanding of your business performance. Whether you're a small business owner or part of a large organization, we tailor our solutions to fit your unique needs.
                  </p>
                  
                  <p 
                    className="text-lg leading-relaxed text-muted-foreground mb-8"
                    style={{ fontFamily: 'Alice, serif' }}
                  >
                    Our expertise includes integrating multiple data sources to provide a comprehensive view of your operations. Each dashboard is customized specifically for your business, ensuring it aligns with your goals and workflows.
                  </p>
                  
                  <p 
                    className="text-lg leading-relaxed text-muted-foreground"
                    style={{ fontFamily: 'Alice, serif' }}
                  >
                    With our business intelligence solutions, you'll have the tools you need to track key metrics, identify trends, and make informed decisions with ease. Let us help you turn data into your competitive advantage.
                  </p>
                </div>
              </motion.div>

              {/* Key Features Grid */}
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {keyFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card/60 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                      <feature.icon size={24} />
                    </div>
                    <h3 
                      className="text-xl mb-4"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
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

          {/* Our Technology of Choice Section */}
          <section ref={technologyRef} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={technologyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 
                  className="text-4xl md:text-5xl mb-8 title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  Our Technology of Choice
                </h2>
              </motion.div>

              <div className="max-w-6xl mx-auto">
                {/* Power BI Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={technologyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-gradient-to-br from-card/90 via-card/70 to-card/50 p-8 md:p-12 rounded-3xl border border-primary/30 backdrop-blur-sm mb-12 text-center"
                >
                  <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <BarChart3 size={48} className="text-primary" />
                  </div>
                  
                  <h3 
                    className="text-3xl md:text-4xl mb-6"
                    style={{ fontFamily: 'DM Serif Display, serif' }}
                  >
                    Microsoft Power BI
                  </h3>
                  
                  <p 
                    className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto mb-8"
                    style={{ fontFamily: 'Alice, serif' }}
                  >
                    We rely on Power BI, a leading business intelligence tool, to deliver powerful and insightful dashboards. Power BI is trusted by businesses of all sizes for its ability to transform raw data into visually stunning and interactive reports.
                  </p>
                  
                  <p 
                    className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto"
                    style={{ fontFamily: 'Alice, serif' }}
                  >
                    Its dynamic features allow us to integrate multiple data sources, create real-time dashboards, and provide actionable insights tailored to your specific needs. With built-in security measures and scalability, Power BI ensures your data remains safe while supporting your business growth. It's an excellent choice for unlocking the full potential of your data.
                  </p>
                </motion.div>

                {/* Power BI Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {powerBIFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={technologyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="bg-card/60 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all text-center group"
                      whileHover={{ y: -3 }}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                        <feature.icon size={20} />
                      </div>
                      <h4 
                        className="text-lg mb-3"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        {feature.title}
                      </h4>
                      <p 
                        className="text-sm text-muted-foreground"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
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
                  Our Portfolio
                </h2>
              </motion.div>

              {/* Data Security Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl mx-auto mb-16"
              >
                <div className="bg-card/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-primary/20 shadow-xl relative overflow-hidden">
                  {/* Security-themed background decoration */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Shield size={120} className="text-primary" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Lock size={24} className="text-primary" />
                      </div>
                    </div>
                    
                    <p 
                      className="text-lg leading-relaxed text-muted-foreground mb-8 text-center"
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      While we don't share specific examples due to the sensitive nature of data and the strict security measures we uphold, rest assured that we have extensive experience delivering impactful business intelligence solutions.
                    </p>
                    
                    <p 
                      className="text-lg leading-relaxed text-muted-foreground text-center"
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      We've worked with a range of clients, from large corporations to smaller businesses and individuals, tailoring dashboards and reports to meet their unique needs. Whether it's simplifying complex datasets or providing actionable insights, our work has consistently empowered businesses to make smarter decisions.
                    </p>

                    {/* Trust indicators */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Users size={20} className="text-primary" />
                        </div>
                        <h4 className="font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Diverse Clientele
                        </h4>
                        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          From startups to enterprises
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Shield size={20} className="text-primary" />
                        </div>
                        <h4 className="font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Data Security
                        </h4>
                        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Strict confidentiality protocols
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Eye size={20} className="text-primary" />
                        </div>
                        <h4 className="font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Proven Results
                        </h4>
                        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Actionable insights delivered
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sample Dashboard Examples */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center mb-12"
              >
                <h3 
                  className="text-2xl md:text-3xl mb-4"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  Sample Dashboard Examples
                </h3>
                <p 
                  className="text-lg text-muted-foreground max-w-3xl mx-auto"
                  style={{ fontFamily: 'Alice, serif' }}
                >
                  These dummy reports showcase the capabilities and potential of our Power BI solutions.
                </p>
              </motion.div>

              {/* Dashboard Examples Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={portfolioInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              >
                {[
                  {
                    title: "Financial Performance Dashboard",
                    description: "Comprehensive financial KPIs and revenue tracking with real-time insights",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGludGVsbGlnZW5jZSUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTcwNTcwMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    category: "Financial Analytics"
                  },
                  {
                    title: "Sales Performance Report",
                    description: "Interactive sales metrics with regional breakdowns and trend analysis",
                    image: "https://images.unsplash.com/photo-1612198273689-b437f53152ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGNoYXJ0cyUyMGdyYXBoc3xlbnwxfHx8fDE3NTcwMjU1OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    category: "Sales Analytics"
                  },
                  {
                    title: "Operational Metrics Dashboard",
                    description: "Key operational indicators with productivity and efficiency measurements",
                    image: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjcmVlbiUyMGNoYXJ0cyUyMHN0YXRpc3RpY3N8ZW58MXx8fHwxNzU3MDU3MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    category: "Operations"
                  },
                  {
                    title: "Customer Analytics Report",
                    description: "Customer behavior patterns and segmentation analysis with retention metrics",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBzY3JlZW58ZW58MXx8fHwxNzU3MDM5NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    category: "Customer Intelligence"
                  },
                  {
                    title: "Executive Summary Dashboard",
                    description: "High-level business overview with key strategic metrics and performance indicators",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGRhc2hib2FyZCUyMEtQSSUyMG1ldHJpY3N8ZW58MXx8fHwxNzU3MDU3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    category: "Executive Reporting"
                  },
                  {
                    title: "Market Analysis Report",
                    description: "Market trends, competitive analysis, and growth opportunity identification",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjByZXBvcnQlMjBjaGFydHMlMjBkYXRhfGVufDF8fHx8MTc1NzA1NzAzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                    category: "Market Research"
                  }
                ].map((report, index) => (
                  <motion.div
                    key={`${report.title}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20">
                      {/* Dashboard Preview Container */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {/* Power BI Header Bar */}
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#ffb900] to-[#d49d43] p-3 z-10 flex items-center gap-2">
                          <BarChart3 size={16} className="text-white" />
                          <span className="text-white text-xs font-medium">Power BI</span>
                          <div className="ml-auto text-white text-xs opacity-75">Dashboard</div>
                        </div>
                        
                        {/* Dashboard Screenshot */}
                        <div className="pt-10">
                          <ImageWithFallback
                            src={report.image}
                            alt={report.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h4 
                          className="text-lg mb-2"
                          style={{ fontFamily: 'DM Serif Display, serif' }}
                        >
                          {report.title}
                        </h4>
                        <p 
                          className="text-sm text-muted-foreground leading-relaxed mb-4"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {report.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                            {report.category}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Zap size={12} className="text-primary" />
                            <span>Sample Report</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Capabilities Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={portfolioInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-16"
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 
                      className="text-2xl mb-4"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      What These Dashboards Demonstrate
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { icon: BarChart3, title: "Interactive Visualizations", description: "Dynamic charts and graphs" },
                      { icon: Database, title: "Multi-Source Integration", description: "Connected data streams" },
                      { icon: TrendingUp, title: "Real-Time Analytics", description: "Live performance tracking" },
                      { icon: Target, title: "Custom KPIs", description: "Business-specific metrics" }
                    ].map((feature, index) => (
                      <div key={feature.title} className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <feature.icon size={20} className="text-primary" />
                        </div>
                        <h4 className="font-medium mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {feature.title}
                        </h4>
                        <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
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