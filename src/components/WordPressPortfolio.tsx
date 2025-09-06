import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Eye, ExternalLink, ChevronLeft, ChevronRight, X, Play, BarChart3, Palette, Camera, Video, TrendingUp, Loader2 } from 'lucide-react';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';

// Fallback images for when WordPress images aren't available
import imgBackground from "figma:asset/602fd2e56a6f8e2f9542cc2ecdac97459971c1b0.png";
import imgBackground1 from "figma:asset/13062c581b2cd61609f89b11152d6cee9eed3ad6.png";
import imgBackground2 from "figma:asset/a8e2014ffc22d92cd295896366862f68a90d1c68.png";
import imgBackground3 from "figma:asset/0b86014a74f47d0cd3505be3925e4e45c2a88c3d.png";
import imgBackground4 from "figma:asset/c17caba9ced792c8b40a3ff12fe9148f3c0e113e.png";

interface WordPressProjectData {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  featured: boolean;
  serviceLink?: string;
  externalLink?: string;
  image: string;
  galleryImages?: string[];
  isVideo?: boolean;
  biDetails?: {
    overview: string;
    process: string;
    tools: string[];
    results: string;
  };
}

const fallbackImages = [imgBackground, imgBackground1, imgBackground2, imgBackground3, imgBackground4];

export function WordPressPortfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<WordPressProjectData | null>(null);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Get WordPress data
  const { portfolioItems, portfolioLoading, error } = useEnhancedContent();

  // Transform WordPress portfolio items to our component structure
  const transformPortfolioItem = (item: any, index: number): WordPressProjectData => {
    // Extract featured media URL
    const imageUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                     item.featured_media_url || 
                     fallbackImages[index % fallbackImages.length];

    // Extract category from custom fields or use default
    const category = item.acf?.project_type || 'Digital Marketing';
    
    // Extract year from date or custom field
    const year = item.acf?.project_date ? 
                 new Date(item.acf.project_date).getFullYear().toString() : 
                 new Date(item.date).getFullYear().toString();

    // Extract description from excerpt or content
    const description = item.excerpt?.rendered ? 
                       item.excerpt.rendered.replace(/<[^>]*>/g, '') : 
                       item.content?.rendered ? 
                       item.content.rendered.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : 
                       'No description available';

    // Check if this is a featured project
    const featured = item.acf?.featured === true || index === 0;

    // Determine service link based on slug
    const serviceLink = item.slug ? `/portfolio/${item.slug}` : undefined;

    // Get external link from custom fields
    const externalLink = item.acf?.project_url;

    // Get gallery images
    const galleryImages = item.acf?.gallery?.map((img: any) => img.url) || [];

    // Check if it's a video project
    const isVideo = category.toLowerCase().includes('video') || 
                    category.toLowerCase().includes('content');

    // Get BI details if available
    const biDetails = item.acf?.bi_details ? {
      overview: item.acf.bi_details.overview || '',
      process: item.acf.bi_details.process || '',
      tools: item.acf.bi_details.tools || [],
      results: item.acf.bi_details.results || ''
    } : undefined;

    return {
      id: item.id,
      title: item.title.rendered,
      category,
      year,
      description,
      featured,
      serviceLink,
      externalLink,
      image: imageUrl,
      galleryImages,
      isVideo,
      biDetails
    };
  };

  // Transform WordPress data
  const projects = portfolioItems.map((item, index) => transformPortfolioItem(item, index));
  
  const featuredProject = projects.find(p => p.featured) || projects[0];
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

  const handleProjectClick = (project: WordPressProjectData) => {
    // Handle Content Creation and Business Intelligence projects with modals
    if (project.category === "Content Creation" || project.category === "Business Intelligence") {
      setSelectedProject(project);
      setGalleryCurrentIndex(0);
      return;
    }
    
    // Handle other clickable projects
    if (project.externalLink) {
      window.open(project.externalLink, '_blank');
    } else if (project.serviceLink) {
      navigate(project.serviceLink);
    }
  };

  const handleEyeClick = (project: WordPressProjectData, e: React.MouseEvent) => {
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

  // Loading state
  if (portfolioLoading) {
    return (
      <section id="portfolio" className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="animate-spin mx-auto mb-4 text-primary" size={48} />
              <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Loading our amazing portfolio...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Skip error state - we always have fallback data now

  // No projects available
  if (projects.length === 0) {
    return (
      <section id="portfolio" className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 
              className="text-4xl md:text-5xl mb-4 title-readable-golden-gradient"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Our Work
            </h2>
            <p className="text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
              No portfolio items available at the moment. Please check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
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
              Our Work
            </h2>
            <p 
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Showcasing our creative expertise and the transformative results we deliver for our clients
            </p>
            
            {/* WordPress indicator for development */}
            {(typeof process !== 'undefined' && process.env.NODE_ENV === 'development') && (
              <div className="mt-4">
                <span className="text-xs text-primary/70 bg-primary/10 px-2 py-1 rounded">
                  ✓ Using Portfolio Data • {portfolioItems.length} items loaded
                </span>
              </div>
            )}
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
                    className="relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-sm border border-primary/30 shadow-2xl group h-full cursor-pointer"
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

            {/* More Projects - 2x2 Grid with Pagination */}
            {allOtherProjects.length > 0 && (
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
                      More Projects
                    </h3>
                    
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
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
                    )}
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
                          className="group cursor-pointer"
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
                                  className="text-white text-sm mb-1 line-clamp-2"
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
            )}
          </div>

          {/* View All Projects Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <span>View All Projects</span>
              <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modal for Content Creation and Business Intelligence projects */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 
                      className="text-2xl mb-2 title-readable-golden"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span 
                        className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {selectedProject.category}
                      </span>
                      <span 
                        className="text-muted-foreground text-sm"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {selectedProject.year}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 bg-muted/20 hover:bg-muted/40 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Project Gallery or Image */}
                {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 ? (
                  <div className="mb-6">
                    <div className="relative rounded-xl overflow-hidden mb-4">
                      <img
                        src={selectedProject.galleryImages[galleryCurrentIndex]}
                        alt={`${selectedProject.title} gallery ${galleryCurrentIndex + 1}`}
                        className="w-full h-80 object-cover"
                      />
                      
                      {/* Gallery Navigation */}
                      {selectedProject.galleryImages.length > 1 && (
                        <>
                          <button
                            onClick={prevGalleryImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextGalleryImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                      
                      {/* Video Play Button */}
                      {selectedProject.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.button
                            className="w-20 h-20 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Play size={24} className="ml-1" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                    
                    {/* Gallery Dots */}
                    {selectedProject.galleryImages.length > 1 && (
                      <div className="flex items-center justify-center gap-2">
                        {selectedProject.galleryImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setGalleryCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === galleryCurrentIndex ? 'bg-primary' : 'bg-primary/30'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-6">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Project Description */}
                <div className="mb-6">
                  <p 
                    className="text-muted-foreground leading-relaxed"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {selectedProject.description}
                  </p>
                </div>

                {/* Business Intelligence Details */}
                {selectedProject.biDetails && (
                  <div className="space-y-6">
                    <div>
                      <h4 
                        className="text-lg mb-3 title-readable-golden flex items-center gap-2"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        <BarChart3 size={20} />
                        Project Overview
                      </h4>
                      <p 
                        className="text-muted-foreground leading-relaxed"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {selectedProject.biDetails.overview}
                      </p>
                    </div>

                    <div>
                      <h4 
                        className="text-lg mb-3 title-readable-golden flex items-center gap-2"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        <TrendingUp size={20} />
                        Our Process
                      </h4>
                      <p 
                        className="text-muted-foreground leading-relaxed"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {selectedProject.biDetails.process}
                      </p>
                    </div>

                    <div>
                      <h4 
                        className="text-lg mb-3 title-readable-golden"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        Tools & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.biDetails.tools.map((tool, index) => (
                          <span
                            key={index}
                            className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 
                        className="text-lg mb-3 title-readable-golden"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                      >
                        Results & Impact
                      </h4>
                      <p 
                        className="text-muted-foreground leading-relaxed"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {selectedProject.biDetails.results}
                      </p>
                    </div>
                  </div>
                )}

                {/* Project Links */}
                {(selectedProject.externalLink || selectedProject.serviceLink) && (
                  <div className="pt-6 border-t border-border">
                    <div className="flex gap-4">
                      {selectedProject.externalLink && (
                        <a
                          href={selectedProject.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:scale-105 transition-all"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          <ExternalLink size={16} />
                          View Live Project
                        </a>
                      )}
                      {selectedProject.serviceLink && (
                        <Link
                          to={selectedProject.serviceLink}
                          className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-all"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                          onClick={() => setSelectedProject(null)}
                        >
                          <Eye size={16} />
                          View Case Study
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}