import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock, User, ArrowRight, Calendar, Tag } from 'lucide-react';

export function WordPressBlog() {
  const { getFeaturedBlogPosts, blogLoading } = useEnhancedContent();
  const { t, language } = useLanguage();
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const featuredPosts = getFeaturedBlogPosts(3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'hu' ? 'hu-HU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getBlogLink = (slug: string) => {
    return language === 'hu' ? `/hu/blog/${slug}` : `/blog/${slug}`;
  };

  if (featuredPosts.length === 0 && !blogLoading) {
    return null; // Don't show blog section if no posts
  }

  return (
    <section 
      ref={sectionRef}
      id="blog" 
      className="relative py-20 overflow-hidden"
    >
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={`blog-bg-${i}`}
            className="absolute"
            style={{
              left: `${5 + i * 10}%`,
              top: `${15 + i * 8}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut"
            }}
          >
            {i % 4 === 0 ? (
              <div className="w-6 h-6 bg-primary/20 rotate-45" />
            ) : i % 4 === 1 ? (
              <div className="w-8 h-8 bg-foreground/10 rounded-full" />
            ) : i % 4 === 2 ? (
              <div className="w-4 h-12 bg-primary/15" />
            ) : (
              <div className="w-10 h-2 bg-foreground/5 rounded-full" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl mb-6 title-readable-golden-gradient"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              {t('blog.title')}
            </h2>
            
            <p 
              className="text-xl text-foreground/80 max-w-3xl mx-auto"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {t('blog.subtitle')}
            </p>
          </motion.div>

          {/* Loading State */}
          {blogLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border animate-pulse">
                  <div className="w-full h-48 bg-muted"></div>
                  <div className="p-6">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-6 bg-muted rounded mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-6"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Blog Posts Grid */}
          {!blogLoading && featuredPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(212, 157, 67, 0.15)"
                  }}
                  className="group relative bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
                >
                  {/* Featured Image */}
                  {post.featured_media_url && (
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={post.featured_media_url}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        whileHover={{ scale: 1.05 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Read time badge */}
                      {post.acf?.read_time && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          <Clock size={14} />
                          <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {post.acf.read_time} {language === 'hu' ? 'perc' : 'min'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    {/* Meta information */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {formatDate(post.date)}
                        </span>
                      </div>
                      
                      {post.author_name && (
                        <div className="flex items-center gap-2">
                          <User size={14} />
                          <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {post.author_name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Categories */}
                    {post.category_names && post.category_names.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.category_names.slice(0, 2).map((category, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            <Tag size={10} />
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 
                      className="text-xl mb-3 title-readable-golden group-hover:text-primary transition-colors duration-300 line-clamp-2"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    {/* Excerpt */}
                    <div 
                      className="text-foreground/80 mb-4 line-clamp-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />

                    {/* Read More Link */}
                    <motion.a
                      href={getBlogLink(post.slug)}
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group/link"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <span>{t('blog.readMore')}</span>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </motion.a>
                  </div>

                  {/* Hover effects */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={false}
                  />
                </motion.article>
              ))}
            </div>
          )}

          {/* View All Blog Posts CTA */}
          {featuredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <motion.a
                href={language === 'hu' ? '/hu/blog' : '/blog'}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(212, 157, 67, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-primary/90 overflow-hidden group relative"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                
                <span className="relative z-10">
                  {language === 'hu' ? 'Összes bejegyzés megtekintése' : 'View All Posts'}
                </span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Development indicator */}
      {(typeof process !== 'undefined' && process.env.NODE_ENV === 'development') && (
        <div className="mt-4 text-center">
          <span className="text-xs text-primary/70 bg-primary/10 px-2 py-1 rounded">
            ✓ WordPress Blog • {featuredPosts.length} featured posts loaded
          </span>
        </div>
      )}
    </section>
  );
}