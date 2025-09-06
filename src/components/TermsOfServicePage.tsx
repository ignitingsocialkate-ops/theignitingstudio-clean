import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { FileText, Handshake, Scale, CreditCard, Shield, AlertTriangle } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { StudioBackground } from './StudioBackground';
import { TextureOverlay } from './TextureOverlay';

export function TermsOfServicePage() {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" });

  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      title: "Services Provided",
      icon: Handshake,
      content: [
        "Creative design services including web design, branding, and digital assets",
        "Social media management and content creation",
        "Website development and maintenance services",
        "Business intelligence and data visualization solutions",
        "Digital marketing strategy and implementation"
      ]
    },
    {
      title: "Client Responsibilities",
      icon: FileText,
      content: [
        "Provide accurate and complete information for project requirements",
        "Respond to requests for feedback and approvals in a timely manner",
        "Provide necessary access to accounts, platforms, and systems as required",
        "Ensure all content provided is legally owned or properly licensed",
        "Make payments according to agreed terms and schedule"
      ]
    },
    {
      title: "Payment Terms",
      icon: CreditCard,
      content: [
        "50% deposit required before project commencement",
        "Remaining balance due upon project completion",
        "Monthly retainer payments due on the 1st of each month for ongoing services",
        "Late payments may incur additional fees after 30 days",
        "All fees are non-refundable unless otherwise specified in writing"
      ]
    },
    {
      title: "Intellectual Property",
      icon: Scale,
      content: [
        "Client retains ownership of their original content and materials",
        "The Igniting Studio retains rights to design concepts and methodologies",
        "Final deliverables ownership transfers to client upon full payment",
        "We reserve the right to showcase completed work in our portfolio",
        "Third-party licenses and stock materials are subject to their respective terms"
      ]
    },
    {
      title: "Project Scope & Changes",
      icon: AlertTriangle,
      content: [
        "Project scope will be clearly defined in our project agreement",
        "Additional requests outside the original scope may incur extra charges",
        "Major changes to project requirements may affect timeline and cost",
        "All scope changes must be approved in writing before implementation",
        "We reserve the right to pause work if scope significantly changes"
      ]
    },
    {
      title: "Limitation of Liability",
      icon: Shield,
      content: [
        "Our liability is limited to the total amount paid for services",
        "We are not responsible for third-party service interruptions",
        "Client is responsible for maintaining backups of their data",
        "We provide services 'as-is' without warranties beyond our direct control",
        "Force majeure events may affect service delivery without liability"
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
                  Terms of Service
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                  style={{ fontFamily: 'Alice, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Clear terms that protect both our clients and our studio, ensuring smooth project collaboration.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <FileText size={16} className="text-primary" />
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
                        <Scale size={24} className="text-primary" />
                      </div>
                      <h2 
                        className="text-2xl md:text-3xl"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        Agreement Overview
                      </h2>
                    </div>
                    
                    <div className="space-y-4 text-muted-foreground" style={{ fontFamily: 'Alice, serif' }}>
                      <p className="text-lg leading-relaxed">
                        These Terms of Service govern your relationship with The Igniting Studio. By engaging our services, you agree to these terms, which are designed to ensure a successful partnership.
                      </p>
                      <p className="text-lg leading-relaxed">
                        We believe in transparent communication and clear expectations. These terms protect both parties and establish the framework for our creative collaboration.
                      </p>
                      <div className="bg-primary/10 p-4 rounded-xl mt-6">
                        <p className="text-sm">
                          <strong>Important:</strong> By proceeding with our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Terms Sections */}
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

                {/* Additional Terms */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-16"
                >
                  <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
                    <h3 
                      className="text-xl md:text-2xl mb-6"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      Additional Terms
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <div>
                        <h4 className="font-medium mb-2">Termination</h4>
                        <p className="leading-relaxed">
                          Either party may terminate services with 30 days written notice. Completed work will be delivered upon payment of outstanding balances.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Governing Law</h4>
                        <p className="leading-relaxed">
                          These terms are governed by applicable local laws. Disputes will be resolved through professional mediation when possible.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Modifications</h4>
                        <p className="leading-relaxed">
                          Terms may be updated periodically. Clients will be notified of significant changes with reasonable advance notice.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Communication</h4>
                        <p className="leading-relaxed">
                          All official communications should be in writing via email. Verbal agreements must be confirmed in writing to be binding.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="mt-16"
                >
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                    <h3 
                      className="text-xl md:text-2xl mb-4"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      Questions About These Terms?
                    </h3>
                    <p 
                      className="text-muted-foreground mb-6 leading-relaxed"
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      We're happy to clarify any aspects of our terms of service. Contact us for questions or to discuss specific project requirements:
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
                          <Handshake size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Let's Discuss
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Schedule a consultation call
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