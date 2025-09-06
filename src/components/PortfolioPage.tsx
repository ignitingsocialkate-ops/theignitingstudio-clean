import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, ExternalLink, Filter, Grid, List, Play, Camera, Code, BarChart3, Palette } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import imgBackground from "figma:asset/602fd2e56a6f8e2f9542cc2ecdac97459971c1b0.png";
import imgBackground1 from "figma:asset/13062c581b2cd61609f89b11152d6cee9eed3ad6.png";
import imgBackground2 from "figma:asset/a8e2014ffc22d92cd295896366862f68a90d1c68.png";
import imgBackground3 from "figma:asset/0b86014a74f47d0cd3505be3925e4e45c2a88c3d.png";
import imgBackground4 from "figma:asset/c17caba9ced792c8b40a3ff12fe9148f3c0e113e.png";

interface Project {
  id: number;
  image: string;
  title: string;
  category: string;
  year: string;
  description: string;
  serviceLink?: string;
  externalLink?: string;
  isClickable: boolean;
  isVideo?: boolean;
  featured?: boolean;
}

export function PortfolioPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      id: 0,
      image: imgBackground,
      title: "Frank Bordoni Recipes",
      category: "Social Media Management",
      year: "2024",
      description: "When Michelin-star chef Frank Bordoni launched his chocolate-focused cookbook, he asked us to help build momentum from scratch. With no existing social media presence, our job was to create something that truly felt like him — while also driving sales.",
      featured: true,
      serviceLink: "/portfolio/frank-bordoni",
      isClickable: true
    },
    {
      id: 1,
      image: imgBackground2,
      title: "PureGems",
      category: "Social Media Management",
      year: "2023",
      description: "PureGems, a luxury gemstone brand, approached us to elevate their social media presence and refine their online aesthetic. We created a cohesive style that reflected their luxury, clean, yet unique brand identity.",
      serviceLink: "/portfolio/puregems",
      isClickable: true
    },
    {
      id: 2,
      image: imgBackground3,
      title: "U4U Teen Organization",
      category: "Social Media Management",
      year: "2023",
      description: "U4U Teen is a dynamic organization dedicated to supporting teenagers by fostering a safe community. We built an engaging presence helping them connect with their audience in meaningful ways.",
      serviceLink: "/portfolio/u4u-teen",
      isClickable: true
    },
    {
      id: 3,
      image: imgBackground,
      title: "Anna Pastry Shop",
      category: "Social Media Management",
      year: "2024",
      description: "This local pastry shop came to us with a clear goal: get more people walking through the door. We partnered up using one of our starter packages, combining ad creation and management with consistent organic content.",
      serviceLink: "/portfolio/anna-pastry",
      isClickable: true
    },
    {
      id: 4,
      image: imgBackground1,
      title: "E-commerce Excellence",
      category: "Website Creation",
      year: "2024", 
      description: "Modern responsive platform with seamless user experience and 300% conversion increase.",
      externalLink: "https://stripe.com",
      isClickable: true
    },
    {
      id: 5,
      image: imgBackground,
      title: "Corporate Digital Hub",
      category: "Website Creation",
      year: "2023",
      description: "Professional corporate website with modern design and enhanced user experience.",
      externalLink: "https://vercel.com",
      isClickable: true
    },
    {
      id: 6,
      image: imgBackground4,
      title: "Visual Storytelling",
      category: "Content Creation",
      year: "2024",
      description: "Professional content creation that elevated brand storytelling across all platforms.",
      isClickable: false,
      isVideo: true
    },
    {
      id: 7,
      image: imgBackground1,
      title: "Content Strategy Master",
      category: "Content Creation",
      year: "2024",
      description: "Comprehensive content strategy that boosted brand awareness by 300%.",
      isClickable: false,
      isVideo: true
    },
    {
      id: 8,
      image: imgBackground4,
      title: "Brand Redesign Project",
      category: "Content Creation",
      year: "2024",
      description: "Complete brand overhaul including logo, colors, and visual identity system.",
      isClickable: false,
      isVideo: true
    },
    {
      id: 9,
      image: imgBackground3,
      title: "Data-Driven Growth",
      category: "Business Intelligence",
      year: "2023",
      description: "Analytics dashboard that helped optimize strategy and increase ROI by 250%.",
      isClickable: false
    },
    {
      id: 10,
      image: imgBackground2,
      title: "Analytics Suite Pro",
      category: "Business Intelligence",
      year: "2024",
      description: "Custom analytics solution providing actionable insights for strategic decisions.",
      isClickable: false
    },
    {
      id: 11,
      image: imgBackground4,
      title: "Product Photography Series",
      category: "Content Creation",
      year: "2024",
      description: "High-end product photography showcasing luxury items with artistic flair.",
      isClickable: false
    },
    {
      id: 12,
      image: imgBackground1,
      title: "Brand Video Campaign",
      category: "Content Creation",
      year: "2023",
      description: "Cinematic brand video that captured the essence of modern entrepreneurship.",
      isClickable: false,
      isVideo: true
    }
  ];

  const categories = ['All', 'Social Media Management', 'Website Creation', 'Content Creation', 'Business Intelligence'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (project: Project) => {
    if (!project.isClickable) return;
    
    if (project.externalLink) {
      window.open(project.externalLink, '_blank');
    } else if (project.serviceLink) {
      navigate(project.serviceLink);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Social Media Management': return Palette;
      case 'Website Creation': return Code;
      case 'Content Creation': return Camera;
      case 'Business Intelligence': return BarChart3;
      default: return Grid;
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12" ref={ref}>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            
            <h1 
              className="text-4xl md:text-6xl mb-6 title-readable-golden-gradient"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Our Portfolio
            </h1>
            <p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Explore our comprehensive collection of creative projects spanning social media management, 
              website design, content creation, and business intelligence solutions.
            </p>
          </motion.div>

          {/* Filters and View Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
          >
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category);
                return (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card/60 text-foreground hover:bg-primary/20 border border-primary/20'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={16} />
                    {category}
                  </motion.button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-card/60 rounded-xl p-1 border border-primary/20">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-primary/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-primary/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Projects Grid/List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "space-y-6"
            }
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group ${project.isClickable ? 'cursor-pointer' : 'cursor-default'} ${
                  viewMode === 'list' ? 'flex gap-6 bg-card/60 rounded-2xl p-6 border border-primary/20' : ''
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectClick(project)}
              >
                {viewMode === 'grid' ? (
                  <motion.div
                    className="relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-sm border border-primary/20 shadow-lg h-80"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Project Image */}
                    <div className="relative h-3/5 overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        animate={hoveredProject === project.id ? { 
                          scale: 1.1,
                          filter: "brightness(1.1)" 
                        } : { 
                          scale: 1.05,
                          filter: "brightness(1)" 
                        }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Video/External Icons */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        {project.isVideo && (
                          <div className="w-8 h-8 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play size={14} className="text-white" />
                          </div>
                        )}
                        {project.externalLink && (
                          <div className="w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <ExternalLink size={14} />
                          </div>
                        )}
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span 
                          className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded text-xs"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute bottom-3 right-3">
                          <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse"></span>
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-4 h-2/5 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <h3 
                          className="font-medium text-foreground"
                          style={{ fontFamily: 'DM Serif Display, serif' }}
                        >
                          {project.title}
                        </h3>
                        <span 
                          className="text-sm text-muted-foreground"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {project.year}
                        </span>
                      </div>
                      
                      <p 
                        className="text-sm text-muted-foreground leading-relaxed flex-1"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {project.description.substring(0, 120)}...
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* List View Image */}
                    <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* List View Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 
                          className="text-xl font-medium text-foreground"
                          style={{ fontFamily: 'DM Serif Display, serif' }}
                        >
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span 
                            className="text-sm text-muted-foreground"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {project.year}
                          </span>
                          {project.isVideo && <Play size={16} className="text-primary" />}
                          {project.externalLink && <ExternalLink size={16} className="text-primary" />}
                        </div>
                      </div>
                      
                      <p 
                        className="text-muted-foreground leading-relaxed"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {project.description}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-20 p-12 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl border border-primary/20"
          >
            <h2 
              className="text-3xl md:text-4xl mb-4 title-readable-golden-gradient"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Ready to Start Your Project?
            </h2>
            <p 
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Let's collaborate to create something extraordinary that elevates your brand and achieves your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg flex items-center gap-3 shadow-lg"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Start Your Project
                  <ArrowLeft className="rotate-180" size={20} />
                </motion.div>
              </Link>
              
              <motion.a
                href="https://calendly.com/theignitingstudio/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl text-lg transition-all"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Schedule a Call
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}