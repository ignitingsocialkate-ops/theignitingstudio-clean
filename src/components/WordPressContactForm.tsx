import { motion } from 'motion/react';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useContactForm } from '../hooks/useWordPress';

interface ContactFormProps {
  formId?: number; // Contact Form 7 form ID
  className?: string;
  title?: string;
  description?: string;
}

export function WordPressContactForm({ 
  formId = 1, 
  className = "",
  title = "Get In Touch",
  description = "Ready to start your project? Let's discuss how we can help."
}: ContactFormProps) {
  const { submitForm, submitting, submitted, error } = useContactForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Map form fields to Contact Form 7 field names
    const cfFormData = {
      'your-name': formData.name,
      'your-email': formData.email,
      'your-subject': formData.subject,
      'your-message': formData.message
    };

    await submitForm(formId, cfFormData);
    
    // Reset form on success
    if (!error) {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="text-center mb-8">
          {title && (
            <h3 
              className="text-2xl md:text-3xl mb-4 title-readable-golden"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p 
              className="text-muted-foreground"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
      >
        {/* Success State */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle className="text-primary mx-auto mb-4" size={48} />
            <h4 className="text-xl mb-2 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
              Message Sent Successfully!
            </h4>
            <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="text-destructive" size={20} />
            <p className="text-destructive text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {error}
            </p>
          </motion.div>
        )}

        {/* Form Fields */}
        {!submitted && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  placeholder="Enter your full name"
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label 
                htmlFor="subject" 
                className="block text-sm mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={submitting}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                placeholder="What would you like to discuss?"
              />
            </div>

            {/* Message */}
            <div>
              <label 
                htmlFor="message" 
                className="block text-sm mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={submitting}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none disabled:opacity-50"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                placeholder="Tell us about your project, goals, or any questions you have..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={!submitting ? { scale: 1.02 } : {}}
              whileTap={!submitting ? { scale: 0.98 } : {}}
              className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {submitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </motion.button>

            {/* WordPress Contact Form 7 Integration Note */}
            {(typeof process !== 'undefined' && process.env.NODE_ENV === 'development') && (
              <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  ⚡ Connected to WordPress Contact Form 7 (ID: {formId})
                </p>
              </div>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
}