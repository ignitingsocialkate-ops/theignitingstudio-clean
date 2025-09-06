import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEnhancedContent } from '../contexts/EnhancedContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock, User, Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogPostBySlug, getRelatedPosts, blogLoading } = useEnhancedContent();
  const { t, language } = useLanguage();
  
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      const fetchedPost = getBlogPostBySlug(slug);
      setPost(fetchedPost);
      
      if (fetchedPost) {
        document.title = `${fetchedPost.title.rendered} - The Igniting Studio`;
        const related = getRelatedPosts(fetchedPost.id, 3);
        setRelatedPosts(related);
      }
    }
  }, [slug, getBlogPostBySlug, getRelatedPosts]);

  if (blogLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-6 w-3/4"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 
            className="text-3xl mb-4 title-readable-golden"
            style={{ fontFamily: 'DM Serif Display, serif' }}
          >
            {language === 'hu' ? 'Bejegyzés nem található' : 'Post Not Found'}
          </h1>
          <p 
            className="text-foreground/70 mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {language === 'hu' ? 
              'A keresett bejegyzés nem található.' : 
              'The blog post you\'re looking for doesn\'t exist.'
            }
          </p>
          <Link
            to={language === 'hu' ? '/hu/blog' : '/blog'}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ArrowLeft size={16} />
            {language === 'hu' ? 'Vissza a bloghoz' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'hu' ? 'hu-HU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getBlogLink = (postSlug: string) => {
    return language === 'hu' ? `/hu/blog/${postSlug}` : `/blog/${postSlug}`;
  };

  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title.rendered,
          text: post.excerpt.rendered,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          
          {/* Back to Blog Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Link
              to={language === 'hu' ? '/hu/blog' : '/blog'}
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <ArrowLeft size={16} />
              {language === 'hu' ? 'Vissza a bloghoz' : 'Back to Blog'}
            </Link>
          </motion.div>

          {/* Post Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            
            {/* Categories */}
            {post.category_names && post.category_names.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.category_names.map((category, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Tag size={12} />
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl mb-6 title-readable-golden-gradient leading-tight"
              style={{ fontFamily: 'DM Serif Display, serif' }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-foreground/60 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {formatDate(post.date)}
                </span>
              </div>
              
              {post.author_name && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {post.author_name}
                  </span>
                </div>
              )}

              {post.acf?.read_time && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {post.acf.read_time} {language === 'hu' ? 'perces olvasás' : 'min read'}
                  </span>
                </div>
              )}

              {/* Share Button */}
              <motion.button
                onClick={sharePost}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-lg hover:bg-primary/20 transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Share2 size={16} />
                <span>{language === 'hu' ? 'Megosztás' : 'Share'}</span>
              </motion.button>
            </div>

            {/* Excerpt */}
            {post.excerpt.rendered && (
              <div 
                className="text-xl text-foreground/80 leading-relaxed"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            )}
          </motion.header>

          {/* Featured Image */}
          {post.featured_media_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-12"
            >
              <motion.img
                src={post.featured_media_url}
                alt={post.title.rendered}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}

          {/* Post Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="prose prose-lg max-w-none mb-12"
            style={{ 
              fontFamily: 'Poppins, sans-serif',
              color: 'var(--foreground)'
            }}
          >
            <div 
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              className="blog-content"
            />
          </motion.div>

          {/* Tags */}
          {post.tag_names && post.tag_names.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-12"
            >
              <h3 
                className="text-lg mb-4 title-readable-golden"
                style={{ fontFamily: 'DM Serif Display, serif' }}
              >
                {t('blog.tags')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tag_names.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-muted text-foreground px-3 py-1 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Author Bio */}
          {post.acf?.author_bio && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-12 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border"
            >
              <h3 
                className="text-lg mb-4 title-readable-golden"
                style={{ fontFamily: 'DM Serif Display, serif' }}
              >
                {language === 'hu' ? 'A szerzőről' : 'About the Author'}
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="text-primary" size={24} />
                </div>
                <div>
                  <h4 
                    className="font-medium text-foreground mb-2"
                    style={{ fontFamily: 'DM Serif Display, serif' }}
                  >
                    {post.author_name}
                  </h4>
                  <p 
                    className="text-foreground/80"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    dangerouslySetInnerHTML={{ 
                      __html: language === 'hu' && post.acf.author_bio_hu 
                        ? post.acf.author_bio_hu 
                        : post.acf.author_bio 
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="border-t border-border pt-12"
            >
              <h3 
                className="text-2xl mb-8 title-readable-golden text-center"
                style={{ fontFamily: 'DM Serif Display, serif' }}
              >
                {t('blog.relatedPosts')}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
                  >
                    {relatedPost.featured_media_url && (
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={relatedPost.featured_media_url}
                          alt={relatedPost.title.rendered}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h4 
                        className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors"
                        style={{ fontFamily: 'DM Serif Display, serif' }}
                        dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                      />
                      
                      <div 
                        className="text-sm text-foreground/70 mb-3 line-clamp-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        dangerouslySetInnerHTML={{ __html: relatedPost.excerpt.rendered }}
                      />
                      
                      <Link
                        to={getBlogLink(relatedPost.slug)}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <span>{t('blog.readMore')}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          )}
        </motion.article>
      </div>

      {/* Blog content styles */}
      <style jsx>{`
        .blog-content h2 {
          font-family: 'DM Serif Display', serif !important;
          font-size: 1.875rem !important;
          color: var(--foreground) !important;
          margin: 2rem 0 1rem 0 !important;
        }
        
        .blog-content h3 {
          font-family: 'DM Serif Display', serif !important;
          font-size: 1.5rem !important;
          color: var(--foreground) !important;
          margin: 1.5rem 0 1rem 0 !important;
        }
        
        .blog-content p {
          font-family: 'Poppins', sans-serif !important;
          line-height: 1.75 !important;
          margin-bottom: 1.5rem !important;
        }
        
        .blog-content a {
          color: var(--primary) !important;
          text-decoration: underline !important;
        }
        
        .blog-content a:hover {
          color: var(--primary) !important;
          opacity: 0.8 !important;
        }
        
        .blog-content blockquote {
          border-left: 4px solid var(--primary) !important;
          padding-left: 1.5rem !important;
          margin: 2rem 0 !important;
          font-style: italic !important;
          color: var(--foreground) !important;
          opacity: 0.9 !important;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 1.5rem 0 !important;
          padding-left: 2rem !important;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem !important;
        }
        
        .blog-content img {
          border-radius: 0.75rem !important;
          margin: 2rem 0 !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </div>
  );
}