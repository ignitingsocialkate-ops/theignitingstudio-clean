import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { StudioBackground } from './StudioBackground';
import { TextureOverlay } from './TextureOverlay';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function AboutPage() {
  const ref = useRef(null);
  const teamRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

  const teamMembers: TeamMember[] = [
    {
      name: "Kata Vata-Gáspár",
      role: "The Founder",
      bio: "I'm Kate, the founder of The Igniting Studio. My career began in business intelligence, where I spent over four years as a freelancer delivering impactful data insights to large corporations. Alongside that, I discovered my passion for the creative side of digital: designing websites, managing social media, and building marketing strategies.\n\nOver time, what started as a side project turned into something much bigger: a vision to create a place where all digital services connect. I continue to work hands-on with clients while building a dynamic team that shares my belief in solving problems, adapting strategies, and bringing quality work to every project.\n\nFor me, every brand has its own story and its own path to growth and I love finding the right approach to make that happen.",
      image: "https://images.unsplash.com/photo-1720874129553-1d2e66076b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwZm91bmRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzA1MjI5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Andrea Zsolnai-Nagy",
      role: "Marketing & SEO Specialist",
      bio: "I'm Andi, Marketing and SEO Specialist at The Igniting Studio.\n\nI earned my Master's degree in Design and Arts Management, where I was first introduced to the world of creative projects and quickly realized that this is the environment where I truly belong.\n\nSince then, I've been working in marketing and search engine optimization, combining strategic thinking with a creative mindset. For me, SEO is not just about technical work – it's an opportunity to make a brand's story visible to the right audience.\n\nI enjoy exploring new approaches, conducting keyword research, shaping content, and most of all, seeing our clients achieve real, measurable results.",
      image: "https://images.unsplash.com/photo-1720874129553-1d2e66076b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzA1MjI5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Réka Buda",
      role: "Social Media Management Intern",
      bio: "I'm Réka, currently working towards my bachelor's degree in International Economics. Beyond my studies, I've found a strong passion for social media and the ways it connects people. At The Igniting Studio, I mainly focus on engagement and community-related tasks, which allows me to interact with audiences and see how brands build genuine connections. For me, this internship is a great opportunity to learn, grow, and evolve in a field that inspires me every day.",
      image: "https://images.unsplash.com/photo-1726722064997-d8d55362c663?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN5b3VuZyUyMGludGVybiUyMHN0dWRlbnQlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTcwNTIyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
                    About Us
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
                  About The Igniting Studio
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-3xl mx-auto"
                  style={{ fontFamily: 'Alice, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  The Igniting Studio was born from a simple idea: businesses should have access to comprehensive digital expertise without the complexity.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Main About Content */}
          <section ref={ref} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Content */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 1 }}
                >
                  <div className="space-y-6">
                    <p 
                      className="text-lg leading-relaxed text-muted-foreground"
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      We know you didn't start your company to become a marketing expert. You have a vision, a service, a product you're passionate about. That's where your energy should go. We handle everything digital: social media, content, websites, and analytics. This way you can focus on what you do best.
                    </p>

                    <p 
                      className="text-lg leading-relaxed text-muted-foreground"
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      What makes us different is that we really get to know your business first. Every company has unique challenges and opportunities. We take time to understand your goals and build a strategy that actually fits your situation.
                    </p>

                    <p 
                      className="text-lg leading-relaxed text-muted-foreground"
                      style={{ fontFamily: 'Alice, serif' }}
                    >
                      We love helping businesses discover what's possible online. When you have the right digital foundation, amazing things happen. More customers find you, your message reaches the right people, and you start seeing real growth.
                    </p>

                    <div className="p-6 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl border border-primary/20">
                      <p 
                        className="text-lg italic text-primary/90"
                        style={{ fontFamily: 'Alice, serif' }}
                      >
                        That's what gets us excited every day: being part of your success story.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Visual Elements - Studio Image */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1631038506857-6c970dd9ba02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMHRlYW0lMjB3b3Jrc3BhY2UlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc1NzA1MzA4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="The Igniting Studio Creative Workspace"
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-background/20" />
                    
                    {/* Floating Values Card */}
                    <motion.div
                      className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <h4 
                        className="text-lg mb-2 text-foreground"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        Our Approach
                      </h4>
                      <p 
                        className="text-sm text-muted-foreground"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Strategic • Personal • Results-driven
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Meet The Team Section */}
          <section ref={teamRef} className="py-16 relative">
            <div className="container mx-auto px-6 relative">
              
              {/* Section Header */}
              <motion.div
                className="text-center max-w-3xl mx-auto mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="flex items-center justify-center gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-12 h-px bg-primary" />
                  <span 
                    className="text-primary/80 tracking-widest uppercase text-sm font-medium"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Meet The Team
                  </span>
                  <div className="w-12 h-px bg-primary" />
                </motion.div>

                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl title-readable-golden-gradient"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Meet The Team
                </motion.h2>
              </motion.div>

              {/* Team Members */}
              <div className="space-y-24">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className={`grid lg:grid-cols-2 gap-16 items-center ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  >
                    {/* Image */}
                    <motion.div
                      className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <ImageWithFallback
                          src={member.image}
                          alt={member.name}
                          className="w-full h-[500px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/30" />
                      </div>
                      
                      {/* Floating Role Card */}
                      <motion.div
                        className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={teamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <p 
                          className="text-sm font-medium"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {member.role}
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      animate={teamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                    >
                      <div>
                        <h3 
                          className="text-3xl md:text-4xl mb-3 title-readable-golden"
                          style={{ fontFamily: 'DM Serif Display, serif' }}
                        >
                          {member.name}
                        </h3>
                        <p 
                          className="text-primary text-lg mb-6"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {member.role}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {member.bio.split('\n\n').map((paragraph, pIndex) => (
                          <p 
                            key={pIndex}
                            className="text-lg leading-relaxed text-muted-foreground"
                            style={{ fontFamily: 'Alice, serif' }}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}