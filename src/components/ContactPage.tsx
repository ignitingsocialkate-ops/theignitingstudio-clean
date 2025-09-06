import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { StudioBackground } from './StudioBackground';
import { TextureOverlay } from './TextureOverlay';

export function ContactPage() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });
  const contactInfoInView = useInView(contactInfoRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@theignitingstudio.com",
      description: "Send us a message anytime, we'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Available Monday to Friday, 9 AM to 6 PM EST"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Remote Studio",
      description: "Serving clients worldwide with digital excellence"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "< 24 Hours",
      description: "Quick turnaround for all inquiries and consultations"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const projectTypes = [
    "Social Media Management",
    "Content Creation", 
    "Website Development",
    "Business Intelligence",
    "Brand Photography",
    "Graphic Design",
    "Custom Package"
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
                  Get in Touch
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                  style={{ fontFamily: 'Alice, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Ready to ignite your brand? Let's discuss your vision and create something extraordinary together.
                </motion.p>

                {/* Quick CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-12 flex items-center justify-center gap-4"
                >
                  <motion.div 
                    className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 157, 67, 0.3)" }}
                  >
                    <Sparkles size={16} className="text-primary" />
                    <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Free consultation available
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Contact Information Section */}
          <section ref={contactInfoRef} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 
                  className="text-4xl md:text-5xl mb-6 title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  Let's Connect
                </h2>
                <p 
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  style={{ fontFamily: 'Alice, serif' }}
                >
                  Choose your preferred way to reach out. We're here to help bring your vision to life.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <motion.div
                      className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <info.icon size={24} />
                    </motion.div>
                    <h3 
                      className="text-xl mb-3"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      {info.title}
                    </h3>
                    <p 
                      className="text-lg mb-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {info.details}
                    </p>
                    <p 
                      className="text-sm text-muted-foreground leading-relaxed"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {info.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section ref={formRef} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 
                    className="text-4xl md:text-5xl mb-6 title-readable-golden-gradient"
                    style={{ fontFamily: 'DM Serif Display, serif' }}
                  >
                    Start Your Project
                  </h2>
                  <p 
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    style={{ fontFamily: 'Alice, serif' }}
                  >
                    Tell us about your project and let's create something amazing together.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/20 shadow-xl relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

                  <div className="relative z-10">
                    {!isSubmitted ? (
                      <>
                        {/* Project Type Selection */}
                        <div className="mb-8">
                          <h3 
                            className="text-lg mb-4"
                            style={{ fontFamily: 'DM Serif Display, serif' }}
                          >
                            What type of project interests you?
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {projectTypes.map((type) => (
                              <motion.button
                                key={type}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm hover:bg-primary hover:text-white transition-all"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              >
                                {type}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <motion.div 
                              className="relative"
                              whileFocus={{ scale: 1.02 }}
                            >
                              <User className="absolute left-4 top-4 text-muted-foreground" size={20} />
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-input-background border border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              />
                            </motion.div>

                            <motion.div 
                              className="relative"
                              whileFocus={{ scale: 1.02 }}
                            >
                              <Mail className="absolute left-4 top-4 text-muted-foreground" size={20} />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Your Email"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-input-background border border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              />
                            </motion.div>
                          </div>

                          <motion.div 
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                          >
                            <MessageSquare className="absolute left-4 top-4 text-muted-foreground" size={20} />
                            <input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              placeholder="Project Subject"
                              required
                              className="w-full pl-12 pr-4 py-4 bg-input-background border border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                            />
                          </motion.div>

                          <motion.div 
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                          >
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                              rows={6}
                              required
                              className="w-full px-4 py-4 bg-input-background border border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                            />
                          </motion.div>

                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-xl flex items-center justify-center gap-3 group transition-all shadow-lg hover:shadow-xl relative overflow-hidden"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {isSubmitting ? (
                              <>
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                                <span>Sending Message...</span>
                              </>
                            ) : (
                              <>
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                  initial={{ x: '-200%' }}
                                  animate={{ x: '200%' }}
                                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                />
                                <span className="relative z-10">Send Message</span>
                                <motion.div
                                  animate={{ x: [0, 3, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="relative z-10"
                                >
                                  <Send size={20} />
                                </motion.div>
                              </>
                            )}
                          </motion.button>
                        </form>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                          <CheckCircle size={40} className="text-green-600" />
                        </motion.div>
                        <h3 
                          className="text-2xl mb-4"
                          style={{ fontFamily: 'DM Serif Display, serif' }}
                        >
                          Message Sent Successfully!
                        </h3>
                        <p 
                          className="text-muted-foreground"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          Thank you for reaching out. We'll get back to you within 24 hours.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section ref={ref} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="bg-gradient-to-br from-card/90 via-card/70 to-card/50 p-12 rounded-3xl border border-primary/30 backdrop-blur-sm overflow-hidden relative">
                  <div className="relative z-10">
                    <h3 
                      className="text-3xl md:text-4xl mb-6 title-readable-golden-gradient"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      Ready to Ignite Your Brand?
                    </h3>
                    
                    <p 
                      className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto" 
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      From concept to execution, we're here to transform your digital presence and help your business thrive in the modern landscape.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <motion.a
                        href="mailto:hello@theignitingstudio.com"
                        whileHover={{ 
                          scale: 1.05, 
                          y: -3,
                          boxShadow: "0 20px 40px rgba(212, 157, 67, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-primary-foreground px-8 py-4 rounded-xl flex items-center gap-3 group shadow-lg relative overflow-hidden"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: '-200%' }}
                          animate={{ x: '200%' }}
                          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                        />
                        
                        <span className="relative z-10">Start Your Project</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="relative z-10"
                        >
                          <ArrowRight size={20} />
                        </motion.div>
                      </motion.a>

                      <motion.a
                        href="tel:+15551234567"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-card/80 border border-primary/20 text-foreground px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-primary/10 transition-all"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <Phone size={20} className="text-primary" />
                        <span>Schedule a Call</span>
                      </motion.a>
                    </div>
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