import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock, User, Calendar, Tag, Search, Filter, ArrowRight } from 'lucide-react';

export function BlogPage() {
  const { blogPosts, categories, tags, blogLoading } = useEnhancedContent();
  const { t, language } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    document.title = `${t('blog.title')} - The Igniting Studio`;
  }, [t]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'hu' ? 'hu-HU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getBlogPostLink = (slug: string) => {
    return language === 'hu' ? `/hu/blog/${slug}` : `/blog/${slug}`;
  };

  // Filter blog posts based on search and filters
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.rendered.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      post.category_names?.includes(selectedCategory);
    
    const matchesTag = !selectedTag || 
      post.tag_names?.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 
              className="text-5xl md:text-6xl mb-6 title-readable-golden-gradient"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              {t('blog.title')}
            </h1>
            
            <p 
              className="text-xl text-foreground/80 max-w-3xl mx-auto"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {t('blog.subtitle')}
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" size={20} />
                  <input
                    type="text"
                    placeholder={t('common.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Filter size={20} />
                  {language === 'hu' ? 'Szűrők' : 'Filters'}
                </button>

                {/* Desktop Filters */}
                <div className={`flex flex-col sm:flex-row gap-4 ${isFilterOpen ? 'block' : 'hidden lg:flex'} w-full lg:w-auto`}>
                  
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <option value="">{t('blog.categories')}</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  {/* Tag Filter */}
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <option value="">{t('blog.tags')}</option>
                    {tags.map(tag => (
                      <option key={tag.id} value={tag.name}>
                        {tag.name}
                      </option>
                    ))}
                  </select>

                  {/* Clear Filters */}
                  {(searchTerm || selectedCategory || selectedTag) && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-3 bg-foreground/10 hover:bg-foreground/20 rounded-lg transition-colors"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {language === 'hu' ? 'Törlés' : 'Clear'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {blogLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
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
          {!blogLoading && (
            <>
              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <p 
                  className="text-foreground/70"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {language === 'hu' 
                    ? `${filteredPosts.length} bejegyzés találva`
                    : `${filteredPosts.length} posts found`
                  }
                </p>
              </motion.div>

              {filteredPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-center py-16"
                >
                  <p 
                    className="text-xl text-foreground/60"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t('common.noResults')}
                  </p>
                </motion.div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
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

                          {/* Featured badge */}
                          {post.acf?.featured_post && (
                            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                              {language === 'hu' ? 'Kiemelt' : 'Featured'}
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
                        <h2 
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
                          href={getBlogPostLink(post.slug)}
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
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}