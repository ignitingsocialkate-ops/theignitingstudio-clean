import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpRight, Eye, ExternalLink, ChevronLeft, ChevronRight, X, Play, BarChart3, Palette, Camera, Video, TrendingUp } from 'lucide-react';
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
  featured?: boolean;
  serviceLink?: string;
  externalLink?: string;
  isClickable: boolean;
  isVideo?: boolean;
  galleryImages?: string[];
  biDetails?: {
    overview: string;
    process: string;
    tools: string[];
    results: string;
  };
}

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const projects: Project[] = [
    {
      id: 0,
      image: imgBackground,
      title: "Frank Bordoni Recipes",
      category: "Social Media Management",
      year: "2024",
      description: "When Michelin-star chef Frank Bordoni launched his chocolate-focused cookbook, he asked us to help build momentum from scratch. With no existing social media presence, our job was to create something that truly felt like him — while also driving sales.",
      featured: true,
      serviceLink: language === 'hu' ? "/hu/portfolio/frank-bordoni" : "/portfolio/frank-bordoni",
      isClickable: true
    },
    {
      id: 1,
      image: imgBackground1,
      title: "E-commerce Excellence",
      category: "Website Creation",
      year: "2024", 
      description: "Modern responsive platform with seamless user experience and 300% conversion increase.",
      externalLink: "https://stripe.com",
      isClickable: true
    },
    {
      id: 2,
      image: imgBackground2,
      title: "PureGems",
      category: "Social Media Management",
      year: "2023",
      description: "PureGems, a luxury gemstone brand, approached us to elevate their social media presence and refine their online aesthetic. We created a cohesive style that reflected their luxury, clean, yet unique brand identity.",
      serviceLink: "/portfolio/puregems",
      isClickable: true
    },
    {
      id: 3,
      image: imgBackground3,
      title: "Data-Driven Growth",
      category: "Business Intelligence",
      year: "2023",
      description: "Analytics dashboard that helped optimize strategy and increase ROI by 250%.",
      isClickable: true,
      biDetails: {
        overview: "We developed a comprehensive analytics solution for a mid-size e-commerce business struggling to understand their customer journey and optimize their marketing spend.",
        process: "Our team implemented a multi-platform tracking system, connecting Google Analytics, Facebook Ads, email marketing data, and sales records into a unified dashboard. We created custom KPIs and automated reporting systems.",
        tools: ["Google Analytics 4", "Power BI", "Google Tag Manager", "Facebook Pixel", "Klaviyo", "Shopify Analytics", "Google Data Studio"],
        results: "Within 3 months, the client saw a 250% increase in ROI through better ad targeting, reduced customer acquisition costs by 40%, and increased conversion rates by 85% through data-driven optimizations."
      }
    },
    {
      id: 4,
      image: imgBackground4,
      title: "Visual Storytelling",
      category: "Content Creation",
      year: "2024",
      description: "Professional content creation that elevated brand storytelling across all platforms.",
      isClickable: true,
      isVideo: true,
      galleryImages: [
        "https://images.unsplash.com/photo-1649297554304-70425a8e82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGNvbnRlbnQlMjBjcmVhdGlvbnxlbnwxfHx8fDE3NTcwNjMzODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1553165345-b273d826eb5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBmaWxtaW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NzA2MzM5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGdyYXBoaWNzJTIwY3JlYXRpdmUlMjBwcm9jZXNzfGVufDF8fHx8MTc1NzA2MzM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
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
      image: imgBackground1,
      title: "Content Strategy Master",
      category: "Content Creation",
      year: "2024",
      description: "Comprehensive content strategy that boosted brand awareness by 300%.",
      isClickable: true,
      isVideo: true,
      galleryImages: [
        "https://images.unsplash.com/photo-1649297554304-70425a8e82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGNvbnRlbnQlMjBjcmVhdGlvbnxlbnwxfHx8fDE3NTcwNjMzODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1553165345-b273d826eb5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBmaWxtaW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NzA2MzM5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGdyYXBoaWNzJTIwY3JlYXRpdmUlMjBwcm9jZXNzfGVufDF8fHx8MTc1NzA2MzM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    {
      id: 7,
      image: imgBackground2,
      title: "Analytics Suite Pro",
      category: "Business Intelligence",
      year: "2024",
      description: "Custom analytics solution providing actionable insights for strategic decisions.",
      isClickable: true,
      biDetails: {
        overview: "A growing SaaS company needed better insights into user behavior and product performance to guide their product roadmap and marketing strategies.",
        process: "We built a custom analytics suite that tracked user engagement, feature adoption, and customer journey mapping. Integration with their existing CRM and support systems provided a 360-degree view of customer health.",
        tools: ["Mixpanel", "Segment", "Tableau", "PostgreSQL", "Python", "HubSpot API", "Slack Integration", "Custom Dashboard"],
        results: "The company improved user retention by 60%, identified their most profitable customer segments, and reduced churn by 35% through proactive customer success initiatives based on predictive analytics."
      }
    },
    {
      id: 8,
      image: imgBackground3,
      title: "U4U Teen Organization",
      category: "Social Media Management",
      year: "2023",
      description: "U4U Teen is a dynamic organization dedicated to supporting teenagers by fostering a safe community. We built an engaging presence helping them connect with their audience in meaningful ways.",
      serviceLink: "/portfolio/u4u-teen",
      isClickable: true
    },
    {
      id: 9,
      image: imgBackground4,
      title: "Brand Redesign Project",
      category: "Content Creation",
      year: "2024",
      description: "Complete brand overhaul including logo, colors, and visual identity system.",
      isClickable: true,
      isVideo: true,
      galleryImages: [
        "https://images.unsplash.com/photo-1649297554304-70425a8e82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGNvbnRlbnQlMjBjcmVhdGlvbnxlbnwxfHx8fDE3NTcwNjMzODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1553165345-b273d826eb5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBmaWxtaW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NzA2MzM5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGdyYXBoaWNzJTIwY3JlYXRpdmUlMjBwcm9jZXNzfGVufDF8fHx8MTc1NzA2MzM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    {
      id: 10,
      image: imgBackground,
      title: "Anna Pastry Shop",
      category: "Social Media Management",
      year: "2024",
      description: "This local pastry shop came to us with a clear goal: get more people walking through the door. We partnered up using one of our starter packages, combining ad creation and management with consistent organic content.",
      serviceLink: "/portfolio/anna-pastry",
      isClickable: true
    }
  ];

  const featuredProject = projects.find(p => p.featured);
  const allOtherProjects = projects.filter(p => !p.featured);
  
  // Calculate pagination
  const projectsPerPage = 4;
  const totalPages = Math.ceil(allOtherProjects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const currentProjects = allOtherProjects.slice(startIndex, startIndex + projectsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleProjectClick = (project: Project) => {
    console.log('Project clicked:', project.title, project.category); // Debug log
    
    // Handle Content Creation and Business Intelligence projects with modals
    if (project.category === "Content Creation" || project.category === "Business Intelligence") {
      console.log('Opening modal for:', project.title); // Debug log
      setSelectedProject(project);
      setGalleryCurrentIndex(0);
      return;
    }
    
    // Handle other clickable projects
    if (!project.isClickable) return;
    
    if (project.externalLink) {
      window.open(project.externalLink, '_blank');
    } else if (project.serviceLink) {
      navigate(project.serviceLink);
    }
  };

  const handleEyeClick = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // For Content Creation and Business Intelligence, show popup
    if (project.category === "Content Creation" || project.category === "Business Intelligence") {
      setSelectedProject(project);
      setGalleryCurrentIndex(0);
    }
    // For others, proceed with normal navigation
    else if (project.externalLink) {
      window.open(project.externalLink, '_blank');
    } else if (project.serviceLink) {
      navigate(project.serviceLink);
    }
  };

  const nextGalleryImage = () => {
    if (selectedProject?.galleryImages) {
      setGalleryCurrentIndex((prev) => 
        (prev + 1) % selectedProject.galleryImages!.length
      );
    }
  };

  const prevGalleryImage = () => {
    if (selectedProject?.galleryImages) {
      setGalleryCurrentIndex((prev) => 
        prev === 0 ? selectedProject.galleryImages!.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="portfolio" ref={ref} className="relative">
      <div className="container mx-auto px-6 py-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl mb-4 title-readable-golden-gradient"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            {t('portfolio.title')}
          </h2>
          <p 
            className="text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Main Content: Featured Project + 4 Project Grid Side by Side */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Featured Project - Takes 2/3 of the width */}
          <div className="lg:col-span-2">
            {featuredProject && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full"
              >
                <motion.div
                  className={`relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-sm border border-primary/30 shadow-2xl group h-full ${featuredProject.isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                  style={{ minHeight: '600px' }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setHoveredProject(featuredProject.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleProjectClick(featuredProject)}
                >
                  
                  {/* Featured Project Image */}
                  <div className="absolute inset-0">
                    <motion.img
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      className="w-full h-full object-cover"
                      animate={hoveredProject === featuredProject.id ? { 
                        scale: 1.05,
                        filter: "brightness(1.1)" 
                      } : { 
                        scale: 1.02,
                        filter: "brightness(1)" 
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/60" />
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6">
                    <motion.span 
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      animate={hoveredProject === featuredProject.id ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
                    >
                      <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></span>
                      Featured Project
                    </motion.span>
                  </div>

                  {/* Category & Year */}
                  <div className="absolute top-6 right-6 flex gap-3">
                    <span 
                      className="bg-card/90 backdrop-blur-sm text-foreground px-3 py-2 rounded-lg text-sm"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {featuredProject.category}
                    </span>
                    <span 
                      className="bg-primary/20 backdrop-blur-sm text-primary px-3 py-2 rounded-lg text-sm"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {featuredProject.year}
                    </span>
                  </div>

                  {/* Action Icons */}
                  <motion.div
                    className="absolute bottom-6 right-6 flex gap-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hoveredProject === featuredProject.id ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary-foreground"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleEyeClick(featuredProject, e)}
                    >
                      <Eye size={20} />
                    </motion.button>
                    
                    {featuredProject.externalLink && (
                      <motion.button
                        className="w-12 h-12 bg-card/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-foreground"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(featuredProject.externalLink, '_blank');
                        }}
                      >
                        <ExternalLink size={20} />
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Featured Content */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-8"
                    animate={hoveredProject === featuredProject.id ? { y: 0 } : { y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3 
                      className="text-3xl md:text-4xl mb-4 text-white"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                      animate={hoveredProject === featuredProject.id ? { 
                        textShadow: "0 0 20px rgba(212, 157, 67, 0.8)" 
                      } : { 
                        textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)" 
                      }}
                    >
                      {featuredProject.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-white/90 text-lg leading-relaxed"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      initial={{ opacity: 0, height: 0 }}
                      animate={hoveredProject === featuredProject.id ? { 
                        opacity: 1, 
                        height: "auto" 
                      } : { 
                        opacity: 0.8, 
                        height: "auto" 
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {featuredProject.description}
                    </motion.p>
                  </motion.div>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(212, 157, 67, 0)",
                        "0 0 20px rgba(212, 157, 67, 0.3)",
                        "0 0 40px rgba(212, 157, 67, 0.5)",
                        "0 0 20px rgba(212, 157, 67, 0.3)",
                        "0 0 0px rgba(212, 157, 67, 0)"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* More Projects - 2x2 Grid with Pagination - Takes 1/3 of the width */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-full"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 
                  className="text-2xl title-readable-golden"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  {language === 'hu' ? 'További Projektek' : 'More Projects'}
                </h3>
                
                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={prevPage}
                    className="w-10 h-10 bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl flex items-center justify-center text-foreground hover:bg-primary/20 hover:border-primary/40 transition-all group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={18} className="group-hover:text-primary transition-colors" />
                  </motion.button>
                  
                  {/* Page Indicator */}
                  <div className="flex items-center gap-1 px-3">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentPage ? 'bg-primary' : 'bg-primary/30'
                        }`}
                        animate={i === currentPage ? { scale: 1.2 } : { scale: 1 }}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={nextPage}
                    className="w-10 h-10 bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl flex items-center justify-center text-foreground hover:bg-primary/20 hover:border-primary/40 transition-all group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight size={18} className="group-hover:text-primary transition-colors" />
                  </motion.button>
                </div>
              </div>

              {/* 2x2 Grid of Projects with Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-4 h-[600px]"
                >
                  {currentProjects.map((project, index) => (
                    <motion.div
                      key={`${currentPage}-${project.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`group cursor-pointer`}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => handleProjectClick(project)}
                    >
                      <motion.div
                        className="relative overflow-hidden rounded-xl bg-card/40 backdrop-blur-sm border border-primary/20 transition-all duration-300 h-full"
                        whileHover={{ y: -4, scale: 1.02 }}
                      >
                        
                        {/* Project Image */}
                        <div className="relative w-full h-full overflow-hidden">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-all duration-500"
                            animate={hoveredProject === project.id ? { 
                              scale: 1.1,
                              filter: "brightness(1.1)" 
                            } : { 
                              scale: 1.05,
                              filter: "brightness(1)" 
                            }}
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Category Badge */}
                          <div className="absolute top-2 left-2">
                            <span 
                              className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded text-xs"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                              {project.category.split(' ')[0]}
                            </span>
                          </div>

                          {/* Year */}
                          <div className="absolute top-2 right-2">
                            <span 
                              className="bg-card/90 backdrop-blur-sm text-foreground px-2 py-1 rounded text-xs"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                              {project.year}
                            </span>
                          </div>

                          {/* Action Icons */}
                          <motion.div
                            className="absolute bottom-2 right-2 flex gap-1"
                            initial={{ opacity: 0 }}
                            animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.button
                              className="w-7 h-7 bg-primary/90 backdrop-blur-sm rounded flex items-center justify-center text-primary-foreground"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleEyeClick(project, e)}
                            >
                              <Eye size={14} />
                            </motion.button>
                            
                            {project.externalLink && (
                              <motion.button
                                className="w-7 h-7 bg-card/90 backdrop-blur-sm rounded flex items-center justify-center text-foreground"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.externalLink, '_blank');
                                }}
                              >
                                <ExternalLink size={14} />
                              </motion.button>
                            )}
                          </motion.div>

                          {/* Project Title */}
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 p-3"
                            animate={hoveredProject === project.id ? { y: 0 } : { y: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 
                              className="text-white text-sm mb-1"
                              style={{ fontFamily: 'DM Serif Display, serif' }}
                            >
                              {project.title}
                            </h4>
                            <p 
                              className="text-white/70 text-xs overflow-hidden"
                              style={{ 
                                fontFamily: 'Poppins, sans-serif',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                              }}
                            >
                              {project.description}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* View All Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 hover:border-primary/50 px-6 py-3 rounded-lg transition-all group"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            View All Projects
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Specialized Modals */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-primary/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all z-10"
              >
                <X size={20} />
              </button>

              {/* Content Creation Modal */}
              {selectedProject.category === "Content Creation" && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      {selectedProject.isVideo ? <Video className="text-primary" size={24} /> : <Camera className="text-primary" size={24} />}
                    </div>
                    <div>
                      <h3 className="text-2xl title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                        {selectedProject.title}
                      </h3>
                      <p className="text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {selectedProject.category} • {selectedProject.year}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {selectedProject.description}
                  </p>

                  {/* Gallery */}
                  {selectedProject.galleryImages && (
                    <div className="relative mb-6">
                      <div className="relative aspect-video rounded-xl overflow-hidden">
                        <img
                          src={selectedProject.galleryImages[galleryCurrentIndex]}
                          alt={`${selectedProject.title} - Image ${galleryCurrentIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {selectedProject.isVideo && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                              <Play className="text-primary-foreground ml-1" size={24} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Gallery Navigation */}
                      {selectedProject.galleryImages.length > 1 && (
                        <>
                          <button
                            onClick={prevGalleryImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextGalleryImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            <ChevronRight size={20} />
                          </button>

                          {/* Dots Indicator */}
                          <div className="flex justify-center gap-2 mt-4">
                            {selectedProject.galleryImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setGalleryCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  index === galleryCurrentIndex ? 'bg-primary' : 'bg-primary/30'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Content Types */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Camera, label: "Photography" },
                      { icon: Video, label: "Video Content" },
                      { icon: Palette, label: "Design" },
                      { icon: TrendingUp, label: "Strategy" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <item.icon className="text-primary" size={20} />
                        <span className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Business Intelligence Modal */}
              {selectedProject.category === "Business Intelligence" && selectedProject.biDetails && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <BarChart3 className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                        {selectedProject.title}
                      </h3>
                      <p className="text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {selectedProject.category} • {selectedProject.year}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg mb-2 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                        Project Overview
                      </h4>
                      <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {selectedProject.biDetails.overview}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg mb-2 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                        Process & Implementation
                      </h4>
                      <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {selectedProject.biDetails.process}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg mb-3 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                        Tools & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.biDetails.tools.map((tool, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg mb-2 title-readable-golden" style={{ fontFamily: 'DM Serif Display, serif' }}>
                        Results & Impact
                      </h4>
                      <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {selectedProject.biDetails.results}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}