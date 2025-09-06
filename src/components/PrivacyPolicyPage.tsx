import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Shield, Eye, Lock, Users, FileText, Clock } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { StudioBackground } from './StudioBackground';
import { TextureOverlay } from './TextureOverlay';

export function PrivacyPolicyPage() {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" });

  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      title: "Information We Collect",
      icon: FileText,
      content: [
        "Contact information (name, email, phone number) when you submit inquiries",
        "Project details and requirements shared during consultations",
        "Technical information about your website usage (analytics)",
        "Communication history and preferences"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "Provide and deliver our creative services",
        "Communicate about projects and respond to inquiries",
        "Improve our services and website functionality",
        "Send project updates and relevant business communications"
      ]
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: [
        "We do not sell, trade, or share your personal information with third parties",
        "Information may be shared with trusted service providers who assist in our operations",
        "We may disclose information if required by law or to protect our rights",
        "Client testimonials are only shared with explicit written consent"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Industry-standard encryption for all data transmission",
        "Secure servers with regular security updates and monitoring",
        "Limited access to personal information on a need-to-know basis",
        "Regular backups and disaster recovery procedures in place"
      ]
    },
    {
      title: "Your Rights",
      icon: Eye,
      content: [
        "Access and review your personal information",
        "Request corrections to inaccurate information",
        "Request deletion of your personal data",
        "Opt-out of marketing communications at any time"
      ]
    },
    {
      title: "Data Retention",
      icon: Clock,
      content: [
        "Client project files are retained for 2 years after project completion",
        "Contact information is kept until you request removal",
        "Analytics data is aggregated and anonymized after 12 months",
        "Email communications are retained for business record purposes"
      ]
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
          <section ref={ref} className="py-20 relative min-h-screen flex items-center">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <motion.div
                  className="flex items-center justify-center gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-12 h-px bg-primary" />
                  <span 
                    className="text-primary/80 tracking-widest uppercase text-sm font-medium"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Legal Information
                  </span>
                  <div className="w-12 h-px bg-primary" />
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl mb-8 title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Privacy Policy
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                  style={{ fontFamily: 'Alice, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Clock size={16} className="text-primary" />
                  Last updated: {lastUpdated}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Content Section */}
          <section ref={contentRef} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <div className="max-w-4xl mx-auto">
                {/* Introduction */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8 }}
                  className="mb-16"
                >
                  <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/20 shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Shield size={24} className="text-primary" />
                      </div>
                      <h2 
                        className="text-2xl md:text-3xl"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        Our Commitment to Your Privacy
                      </h2>
                    </div>
                    
                    <div className="space-y-4 text-muted-foreground" style={{ fontFamily: 'Alice, serif' }}>
                      <p className="text-lg leading-relaxed">
                        At The Igniting Studio, we are committed to protecting your privacy and handling your personal information with care and respect. This Privacy Policy explains how we collect, use, share, and protect your information when you use our services.
                      </p>
                      <p className="text-lg leading-relaxed">
                        We believe in transparency and want you to understand exactly how your information is handled. If you have any questions about this policy, please don't hesitate to contact us.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Policy Sections */}
                <div className="space-y-8">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <section.icon size={20} className="text-primary" />
                          </div>
                          <h3 
                            className="text-xl md:text-2xl"
                            style={{ fontFamily: 'DM Serif Display, serif' }}
                          >
                            {section.title}
                          </h3>
                        </div>
                        
                        <ul className="space-y-3">
                          {section.content.map((item, itemIndex) => (
                            <li 
                              key={itemIndex} 
                              className="flex items-start gap-3 text-muted-foreground"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-16"
                >
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                    <h3 
                      className="text-xl md:text-2xl mb-4"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      Questions About This Policy?
                    </h3>
                    <p 
                      className="text-muted-foreground mb-6 leading-relaxed"
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Email Us
                          </p>
                          <p className="text-sm text-muted-foreground">
                            hello@theignitingstudio.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Clock size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Response Time
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}