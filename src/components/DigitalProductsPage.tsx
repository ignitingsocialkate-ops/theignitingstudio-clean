import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Download, Mail, Star, TrendingUp, BarChart3, Home, DollarSign, Users, ArrowRight, CheckCircle, User } from 'lucide-react';

export function DigitalProductsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Power BI Template form state
  const [templateForm, setTemplateForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [templateSubmitted, setTemplateSubmitted] = useState(false);
  const [showTemplateForm, setShowTemplateForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
      setEmail('');
      setFirstName('');
      setIsSubmitted(false);
    }, 3000);
  };

  const handleTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle Power BI template form submission here
    // This would send an automated email with the template
    setTemplateSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
      setTemplateForm({ firstName: '', lastName: '', email: '' });
      setTemplateSubmitted(false);
      setShowTemplateForm(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20" ref={ref}>
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl mb-6 title-readable-golden-gradient"
                style={{ fontFamily: 'DM Serif Display, serif' }}
              >
                Digital Products
              </h1>
              <p 
                className="text-xl text-muted-foreground mb-8"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Explore ready-to-use tools to power your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Free Audit CTA */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-primary" size={32} />
                </div>
                <h2 
                  className="text-2xl md:text-3xl mb-4 title-readable-golden"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  Get Your Free AI-Powered Digital Marketing Audit
                </h2>
                <p 
                  className="text-muted-foreground mb-6"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Discover untapped opportunities and get actionable insights to grow your business with our comprehensive digital marketing analysis.
                </p>
                <motion.a
                  href="https://calendly.com/theignitingstudio/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl transition-all hover:shadow-lg"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Get Free Audit
                  <ArrowRight size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 
                className="text-3xl md:text-4xl mb-6 title-readable-golden"
                style={{ fontFamily: 'DM Serif Display, serif' }}
              >
                More Products Coming Soon
              </h2>
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
                <p 
                  className="text-lg text-muted-foreground mb-6"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  We're cooking up something new!
                </p>
                <p 
                  className="text-muted-foreground mb-6"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Very soon, you'll find a collection of easy-to-use digital products right here, designed to save you time, keep things organized, and bring a little clarity to the chaos of running a business.
                </p>
                <p 
                  className="text-muted-foreground mb-6"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Think: checklists, planners, templates, mini-systems… all the practical things we wish we had when we started.
                </p>
                <p 
                  className="text-muted-foreground"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Coming soon — and we can't wait to share them with you.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Email Signup */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 border border-primary/20">
                <div className="text-center mb-8">
                  <h3 
                    className="text-2xl md:text-3xl mb-4 title-readable-golden"
                    style={{ fontFamily: 'DM Serif Display, serif' }}
                  >
                    Wanna be the first to know?
                  </h3>
                  <p 
                    className="text-muted-foreground"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Sign up to be the first to know when they launch.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="text-primary mx-auto mb-4" size={48} />
                    <h4 className="text-xl mb-2 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                      Thank you for subscribing!
                    </h4>
                    <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      We'll let you know as soon as our products are ready.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label 
                        htmlFor="firstName" 
                        className="block text-sm mb-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm mb-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg transition-all hover:shadow-lg"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Subscribe
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Power BI Templates Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 
                  className="text-3xl md:text-4xl mb-6 title-readable-golden"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  Power BI Templates
                </h2>
              </div>

              {/* What are Power BI Templates */}
              <div className="mb-16">
                <h3 
                  className="text-2xl md:text-3xl mb-6 title-readable-golden"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  What are Power BI template products?
                </h3>
                <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
                  <div className="space-y-4 text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <p>
                      Power BI template products are ready-made dashboards we've carefully designed and developed with thorough research and attention to detail. These templates are pre-built to showcase key data, KPIs, and insights specific to a particular field or business need.
                    </p>
                    <p>
                      Each template is unique, and you can explore our collection to find the one that best fits your interests. When you purchase a template, you'll receive a comprehensive manual guiding you through how to use and integrate it effectively.
                    </p>
                    <p>
                      If you need additional support, you're welcome to reach out to us for help. And if customization is required, we can set up a call to discuss your needs and create a tailored project just for you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Templates */}
              <div>
                <h3 
                  className="text-2xl md:text-3xl mb-8 title-readable-golden"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  Our product templates
                </h3>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
                  {/* Real Estate Dashboard */}
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 group"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Home className="text-primary" size={32} />
                      </div>
                      <div className="flex-1">
                        <h4 
                          className="text-xl md:text-2xl mb-4 title-readable-golden"
                          style={{ fontFamily: 'DM Serif Display, serif' }}
                        >
                          Real Estate Dashboard
                        </h4>
                        <p 
                          className="text-muted-foreground mb-6"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          A tailored Power BI template for real estate agents and companies to track property listings, sales performance, and agent activity—all in one place for better decision-making and efficiency.
                        </p>
                        
                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="text-primary" size={16} />
                            <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              Sales Analytics
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="text-primary" size={16} />
                            <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              Agent Performance
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="text-primary" size={16} />
                            <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              Revenue Tracking
                            </span>
                          </div>
                        </div>

                        {!showTemplateForm ? (
                          <motion.button
                            onClick={() => setShowTemplateForm(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg transition-all hover:shadow-lg"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            Get Template
                            <Download size={16} />
                          </motion.button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-primary/20"
                          >
                            {templateSubmitted ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-4"
                              >
                                <CheckCircle className="text-primary mx-auto mb-3" size={32} />
                                <h5 className="text-lg mb-2 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                                  Template Sent!
                                </h5>
                                <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                  Check your email for the Real Estate Dashboard template and setup instructions.
                                </p>
                              </motion.div>
                            ) : (
                              <>
                                <div className="text-center mb-6">
                                  <h5 className="text-lg mb-2 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                                    Get Your Real Estate Dashboard Template
                                  </h5>
                                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Enter your details below and we'll send you the template with setup instructions.
                                  </p>
                                </div>
                                
                                <form onSubmit={handleTemplateSubmit} className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label 
                                        htmlFor="templateFirstName" 
                                        className="block text-sm mb-2"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                      >
                                        First Name *
                                      </label>
                                      <input
                                        type="text"
                                        id="templateFirstName"
                                        value={templateForm.firstName}
                                        onChange={(e) => setTemplateForm(prev => ({ ...prev, firstName: e.target.value }))}
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                        placeholder="First name"
                                      />
                                    </div>
                                    <div>
                                      <label 
                                        htmlFor="templateLastName" 
                                        className="block text-sm mb-2"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                      >
                                        Last Name *
                                      </label>
                                      <input
                                        type="text"
                                        id="templateLastName"
                                        value={templateForm.lastName}
                                        onChange={(e) => setTemplateForm(prev => ({ ...prev, lastName: e.target.value }))}
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                        placeholder="Last name"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label 
                                      htmlFor="templateEmail" 
                                      className="block text-sm mb-2"
                                      style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                      Email Address *
                                    </label>
                                    <input
                                      type="email"
                                      id="templateEmail"
                                      value={templateForm.email}
                                      onChange={(e) => setTemplateForm(prev => ({ ...prev, email: e.target.value }))}
                                      required
                                      className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                      style={{ fontFamily: 'Poppins, sans-serif' }}
                                      placeholder="your@email.com"
                                    />
                                  </div>
                                  <div className="flex gap-3 pt-2">
                                    <motion.button
                                      type="submit"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg transition-all hover:shadow-lg"
                                      style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                      Send Template
                                    </motion.button>
                                    <motion.button
                                      type="button"
                                      onClick={() => setShowTemplateForm(false)}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="px-4 py-2 border border-border rounded-lg transition-all hover:bg-muted/50"
                                      style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                      Cancel
                                    </motion.button>
                                  </div>
                                </form>
                              </>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}