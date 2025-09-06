import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { enhancedWordPressAPI } from '../services/enhanced-wordpress-api';
import { useLanguage } from './LanguageContext';

// Enhanced types for WordPress content with multi-language support
export interface PortfolioItem {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: number[];
  acf: {
    project_url?: string;
    client_name?: string;
    project_type?: string;
    project_type_hu?: string;
    project_date?: string;
    featured?: boolean;
    gallery?: any[];
    technologies?: string[];
    testimonial?: {
      content: string;
      content_hu?: string;
      author: string;
      position: string;
      position_hu?: string;
    };
  };
  featured_media_url?: string;
  language?: string;
  translations?: Record<string, number>;
}

export interface WordPressPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  acf?: Record<string, any>;
  language?: string;
  translations?: Record<string, number>;
}

export interface Service {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  acf?: {
    price?: string;
    price_hu?: string;
    features?: string[];
    features_hu?: string[];
    duration?: string;
    duration_hu?: string;
    service_icon?: string;
  };
  language?: string;
  translations?: Record<string, number>;
}

export interface BlogPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: number[];
  acf?: {
    read_time?: number;
    featured_post?: boolean;
    author_bio?: string;
    seo_title?: string;
    seo_description?: string;
  };
  featured_media_url?: string;
  author_name?: string;
  category_names?: string[];
  tag_names?: string[];
  language?: string;
  translations?: Record<string, number>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface SiteSettings {
  title: string;
  tagline: string;
  url: string;
  admin_email: string;
  timezone: string;
  language: string;
  contact_info?: {
    phone?: string;
    phone_hu?: string;
    email?: string;
    address?: string;
    address_hu?: string;
    hours?: string;
    hours_hu?: string;
  };
  social_links?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  acf?: Record<string, any>;
}

interface ContentContextType {
  // Data
  pages: WordPressPage[];
  portfolioItems: PortfolioItem[];
  services: Service[];
  blogPosts: BlogPost[];
  categories: Category[];
  tags: Tag[];
  siteSettings: SiteSettings | null;
  
  // Loading states
  isLoading: boolean;
  pagesLoading: boolean;
  portfolioLoading: boolean;
  servicesLoading: boolean;
  blogLoading: boolean;
  settingsLoading: boolean;
  
  // Error states
  error: string | null;
  
  // Helper functions
  getPageBySlug: (slug: string) => WordPressPage | null;
  getPortfolioItemBySlug: (slug: string) => PortfolioItem | null;
  getServiceBySlug: (slug: string) => Service | null;
  getBlogPostBySlug: (slug: string) => BlogPost | null;
  getFeaturedBlogPosts: (limit?: number) => BlogPost[];
  getPostsByCategory: (categorySlug: string) => BlogPost[];
  getRelatedPosts: (postId: number, limit?: number) => BlogPost[];
  
  // Refresh functions
  refreshContent: () => Promise<void>;
  refreshPages: () => Promise<void>;
  refreshPortfolio: () => Promise<void>;
  refreshServices: () => Promise<void>;
  refreshBlog: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | null>(null);

interface ContentProviderProps {
  children: ReactNode;
  enableCaching?: boolean;
  cacheExpiry?: number; // in milliseconds
}

export function EnhancedContentProvider({ 
  children, 
  enableCaching = true, 
  cacheExpiry = 5 * 60 * 1000 // 5 minutes
}: ContentProviderProps) {
  const { language } = useLanguage();
  
  // Data states
  const [pages, setPages] = useState<WordPressPage[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  
  // Loading states
  const [pagesLoading, setPagesLoading] = useState(false);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // Cache management
  const [lastFetch, setLastFetch] = useState<{ [key: string]: number }>({});
  
  // Flag to show startup message only once
  const [startupMessageShown, setStartupMessageShown] = useState(false);
  
  // Helper to check if cache is valid
  const isCacheValid = (key: string): boolean => {
    if (!enableCaching) return false;
    const cacheKey = `${key}_${language}`;
    const lastFetchTime = lastFetch[cacheKey];
    return lastFetchTime && (Date.now() - lastFetchTime) < cacheExpiry;
  };
  
  // Helper to update cache timestamp
  const updateCacheTimestamp = (key: string) => {
    const cacheKey = `${key}_${language}`;
    setLastFetch(prev => ({ ...prev, [cacheKey]: Date.now() }));
  };
  
  // Computed loading state
  const isLoading = pagesLoading || portfolioLoading || servicesLoading || blogLoading || settingsLoading;
  
  // Fetch functions with multi-language support
  const fetchPages = async () => {
    if (isCacheValid('pages') && pages.length > 0) return;
    
    setPagesLoading(true);
    setError(null);
    
    try {
      // Try to fetch from WordPress with language parameter
      const fetchedPages = await enhancedWordPressAPI.getPages(language);
      setPages(fetchedPages);
      updateCacheTimestamp('pages');
    } catch (err: any) {
      // Only show friendly message once per session in development
      if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
        // Don't spam console - just use demo content silently
      } else {
        console.info('Using demo content (WordPress connection not configured)');
      }
      
      // Always fallback to mock data if WordPress is unavailable
      setPages(getMockPages(language));
      updateCacheTimestamp('pages');
    } finally {
      setPagesLoading(false);
    }
  };
  
  const fetchPortfolio = async () => {
    if (isCacheValid('portfolio') && portfolioItems.length > 0) return;
    
    setPortfolioLoading(true);
    setError(null);
    
    try {
      const fetchedPortfolio = await enhancedWordPressAPI.getPortfolioItems(language);
      setPortfolioItems(fetchedPortfolio);
      updateCacheTimestamp('portfolio');
    } catch (err: any) {
      // Silently use demo content in development
      if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'development') {
        console.info('Using demo portfolio content');
      }
      
      setPortfolioItems(getMockPortfolio(language));
      updateCacheTimestamp('portfolio');
    } finally {
      setPortfolioLoading(false);
    }
  };
  
  const fetchServices = async () => {
    if (isCacheValid('services') && services.length > 0) return;
    
    setServicesLoading(true);
    setError(null);
    
    try {
      const fetchedServices = await enhancedWordPressAPI.getServices(language);
      setServices(fetchedServices);
      updateCacheTimestamp('services');
    } catch (err: any) {
      // Silently use demo content in development  
      if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'development') {
        console.info('Using demo services content');
      }
      
      setServices(getMockServices(language));
      updateCacheTimestamp('services');
    } finally {
      setServicesLoading(false);
    }
  };

  const fetchBlog = async () => {
    if (isCacheValid('blog') && blogPosts.length > 0) return;
    
    setBlogLoading(true);
    setError(null);
    
    try {
      const [posts, cats, blogTags] = await Promise.all([
        enhancedWordPressAPI.getBlogPosts(language),
        enhancedWordPressAPI.getCategories(),
        enhancedWordPressAPI.getTags()
      ]);
      
      setBlogPosts(posts);
      setCategories(cats);
      setTags(blogTags);
      updateCacheTimestamp('blog');
    } catch (err: any) {
      // Silently use demo content in development
      if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'development') {
        console.info('Using demo blog content');
      }
      
      setBlogPosts(getMockBlogPosts(language));
      setCategories(getMockCategories());
      setTags(getMockTags());
      updateCacheTimestamp('blog');
    } finally {
      setBlogLoading(false);
    }
  };
  
  const fetchSettings = async () => {
    if (isCacheValid('settings') && siteSettings) return;
    
    setSettingsLoading(true);
    setError(null);
    
    try {
      const fetchedSettings = await enhancedWordPressAPI.getSiteSettings();
      setSiteSettings(fetchedSettings);
      updateCacheTimestamp('settings');
    } catch (err: any) {
      // Silently use demo content in development
      if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'development') {
        console.info('Using demo site settings');
      }
      
      setSiteSettings(getMockSettings(language));
      updateCacheTimestamp('settings');
    } finally {
      setSettingsLoading(false);
    }
  };
  
  // Helper functions
  const getPageBySlug = (slug: string): WordPressPage | null => {
    return pages.find(page => page.slug === slug) || null;
  };
  
  const getPortfolioItemBySlug = (slug: string): PortfolioItem | null => {
    return portfolioItems.find(item => item.slug === slug) || null;
  };
  
  const getServiceBySlug = (slug: string): Service | null => {
    return services.find(service => service.slug === slug) || null;
  };

  const getBlogPostBySlug = (slug: string): BlogPost | null => {
    return blogPosts.find(post => post.slug === slug) || null;
  };

  const getFeaturedBlogPosts = (limit: number = 3): BlogPost[] => {
    return blogPosts
      .filter(post => post.acf?.featured_post)
      .slice(0, limit);
  };

  const getPostsByCategory = (categorySlug: string): BlogPost[] => {
    return blogPosts.filter(post => 
      post.category_names?.some(cat => 
        cat.toLowerCase().replace(/\s+/g, '-') === categorySlug
      )
    );
  };

  const getRelatedPosts = (postId: number, limit: number = 3): BlogPost[] => {
    const currentPost = blogPosts.find(p => p.id === postId);
    if (!currentPost) return [];

    return blogPosts
      .filter(post => post.id !== postId)
      .filter(post => {
        // Find posts with similar categories or tags
        const hasSharedCategories = currentPost.categories.some(cat => 
          post.categories.includes(cat)
        );
        const hasSharedTags = currentPost.tags.some(tag => 
          post.tags.includes(tag)
        );
        return hasSharedCategories || hasSharedTags;
      })
      .slice(0, limit);
  };
  
  // Refresh functions
  const refreshPages = async () => {
    const cacheKey = `pages_${language}`;
    delete lastFetch[cacheKey];
    await fetchPages();
  };
  
  const refreshPortfolio = async () => {
    const cacheKey = `portfolio_${language}`;
    delete lastFetch[cacheKey];
    await fetchPortfolio();
  };
  
  const refreshServices = async () => {
    const cacheKey = `services_${language}`;
    delete lastFetch[cacheKey];
    await fetchServices();
  };

  const refreshBlog = async () => {
    const cacheKey = `blog_${language}`;
    delete lastFetch[cacheKey];
    await fetchBlog();
  };
  
  const refreshContent = async () => {
    setLastFetch({});
    await Promise.all([
      fetchPages(),
      fetchPortfolio(),
      fetchServices(),
      fetchBlog(),
      fetchSettings()
    ]);
  };
  
  // Re-fetch content when language changes
  useEffect(() => {
    const refetchForLanguage = async () => {
      // Add a small delay to prevent overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await Promise.all([
        fetchPages(),
        fetchPortfolio(),
        fetchServices(),
        fetchBlog(),
        fetchSettings()
      ]);
    };
    
    refetchForLanguage();
  }, [language]);
  
  // Initial data fetch
  useEffect(() => {
    const initializeContent = async () => {
      // Show a single clean startup message only once
      if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development' && !startupMessageShown) {
        console.info('🚀 The Igniting Studio - Loaded successfully with demo content');
        setStartupMessageShown(true);
      }
      
      // Stagger the API calls slightly to reduce any connection attempts
      await Promise.all([
        fetchPages(),
        new Promise(resolve => setTimeout(resolve, 50)).then(() => fetchPortfolio()),
        new Promise(resolve => setTimeout(resolve, 100)).then(() => fetchServices()),
        new Promise(resolve => setTimeout(resolve, 150)).then(() => fetchBlog()),
        new Promise(resolve => setTimeout(resolve, 200)).then(() => fetchSettings())
      ]);
    };
    
    initializeContent();
  }, []);
  
  const contextValue: ContentContextType = {
    // Data
    pages,
    portfolioItems,
    services,
    blogPosts,
    categories,
    tags,
    siteSettings,
    
    // Loading states
    isLoading,
    pagesLoading,
    portfolioLoading,
    servicesLoading,
    blogLoading,
    settingsLoading,
    
    // Error state
    error,
    
    // Helper functions
    getPageBySlug,
    getPortfolioItemBySlug,
    getServiceBySlug,
    getBlogPostBySlug,
    getFeaturedBlogPosts,
    getPostsByCategory,
    getRelatedPosts,
    
    // Refresh functions
    refreshContent,
    refreshPages,
    refreshPortfolio,
    refreshServices,
    refreshBlog,
  };
  
  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

// Hook to use the enhanced content context
export function useEnhancedContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useEnhancedContent must be used within an EnhancedContentProvider');
  }
  return context;
}

// Mock data functions with language support
function getMockPages(lang: string): WordPressPage[] {
  const isHu = lang === 'hu';
  
  return [
    {
      id: 1,
      slug: 'hero',
      title: { 
        rendered: isHu ? 
          'Mi intézzük a digitális oldalt, te a következő nagy lépésre koncentrálj.' : 
          'We handle the digital side, you focus on your next big move.'
      },
      content: { rendered: '' },
      excerpt: { rendered: '' },
      acf: {
        tagline: isHu ? 'Kreatív Digitális Stúdió' : 'Creative Digital Studio',
        cta_text: isHu ? 'Projekt Indítása' : 'Start Your Project',
        cta_link: 'https://calendly.com/theignitingstudio/30min',
        secondary_cta_text: isHu ? 'Munkáink Megtekintése' : 'View Our Work',
        secondary_cta_link: '/#portfolio'
      }
    },
    {
      id: 2,
      slug: 'about',
      title: { 
        rendered: isHu ? 'Az Igniting Studio-ról' : 'About The Igniting Studio'
      },
      content: { 
        rendered: isHu ? 
          '<p>Kreatív digitális stúdió vagyunk, amely arra specializálódott, hogy stratégiai közösségimédia-menedzsment, lenyűgöző weboldalkészítés és adatvezérelt üzleti intelligencia megoldások segítségével átformálja a vállalkozásokat.</p><p>Küldetésünk egyszerű: intézzük a digitális bonyodalmakat, hogy te arra koncentrálhass, amiben a legjobb vagy - a vállalkozásod növelésére és az ügyfeleid kiszolgálására.</p>' :
          '<p>We\'re a creative digital studio that specializes in transforming businesses through strategic social media management, stunning website creation, and data-driven business intelligence solutions.</p><p>Our mission is simple: handle the digital complexity so you can focus on what you do best - growing your business and serving your customers.</p>'
      },
      excerpt: { rendered: '' },
      acf: {
        stats_title: isHu ? 'Miért válassz minket?' : 'Why Choose Us',
        stats: [
          { 
            number: '50+', 
            label: isHu ? 'Befejezett Projekt' : 'Projects Completed', 
            icon: 'target' 
          },
          { 
            number: '98%', 
            label: isHu ? 'Ügyfél Elégedettség' : 'Client Satisfaction', 
            icon: 'users' 
          },
          { 
            number: '2x', 
            label: isHu ? 'Átlagos ROI Növekedés' : 'Average ROI Increase', 
            icon: 'zap' 
          }
        ]
      }
    }
  ];
}

function getMockPortfolio(lang: string): PortfolioItem[] {
  const isHu = lang === 'hu';
  
  return [
    {
      id: 1,
      date: '2024-01-15',
      date_gmt: '2024-01-15',
      guid: { rendered: 'https://admin.theignitingstudio.com/?post_type=portfolio&#038;p=1' },
      modified: '2024-01-15',
      modified_gmt: '2024-01-15',
      slug: 'frank-bordoni',
      status: 'publish',
      type: 'portfolio',
      link: 'https://theignitingstudio.com/portfolio/frank-bordoni',
      title: { rendered: 'Frank Bordoni Recipes' },
      content: { 
        rendered: isHu ?
          '<p>Amikor a Michelin-csillagos séf, Frank Bordoni elindította csokoládéra fókuszáló szakácskönyvét, megkért minket, hogy segítsünk a nulláról lendületet építeni. Meglévő közösségimédia-jelenlét nélkül a feladatunk az volt, hogy valami olyat hozzunk létre, ami igazán őrá hasonlít — miközben az értékesítést is növeljük.</p>' :
          '<p>When Michelin-star chef Frank Bordoni launched his chocolate-focused cookbook, he asked us to help build momentum from scratch. With no existing social media presence, our job was to create something that truly felt like him — while also driving sales.</p>'
      },
      excerpt: { 
        rendered: isHu ? 
          'Michelin-csillagos séf közösségimédia-átalakítása' : 
          'Michelin-star chef social media transformation'
      },
      author: 1,
      featured_media: 123,
      comment_status: 'closed',
      ping_status: 'closed',
      sticky: false,
      template: '',
      format: 'standard',
      meta: [],
      categories: [],
      tags: [],
      acf: {
        project_url: 'https://frankbordoni.com',
        client_name: 'Frank Bordoni',
        project_type: isHu ? 'Közösségimédia-menedzsment' : 'Social Media Management',
        project_date: '2024-01-15',
        featured: true,
        gallery: [],
        technologies: ['Instagram', 'Facebook', 'Content Creation'],
        testimonial: {
          content: isHu ? 
            'Az Igniting Studio teljesen átalakította a közösségimédia-jelenlétünket.' :
            'The Igniting Studio transformed our social media presence completely.',
          author: 'Frank Bordoni',
          position: isHu ? 'Séf és Szerző' : 'Chef & Author'
        }
      },
      featured_media_url: 'https://images.unsplash.com/photo-1556909114-8f7e94d7bf20?w=800&h=600&fit=crop',
      language: lang
    }
    // Add more portfolio items...
  ];
}

function getMockServices(lang: string): Service[] {
  const isHu = lang === 'hu';
  
  return [
    {
      id: 1,
      slug: 'social-media-management',
      title: { 
        rendered: isHu ? 'Közösségimédia-menedzsment' : 'Social Media Management'
      },
      content: { 
        rendered: isHu ?
          '<p>Stratégiai közösségimédia-menedzsment, amely építi a márkádat és bevonza a közönségedet.</p>' :
          '<p>Strategic social media management that builds your brand and engages your audience.</p>'
      },
      acf: {
        price: isHu ? '450.000 Ft-tól/hónap' : 'Starting at $1,500/month',
        features: isHu ? 
          ['Tartalomkészítés', 'Analitika', 'Stratégia', 'Közösségmenedzsment'] :
          ['Content Creation', 'Analytics', 'Strategy', 'Community Management'],
        service_icon: 'instagram'
      },
      language: lang
    },
    {
      id: 2,
      slug: 'website-creation',
      title: { 
        rendered: isHu ? 'Weboldalkészítés' : 'Website Creation'
      },
      content: { 
        rendered: isHu ?
          '<p>Egyedi weboldalak, amelyek a látogatókból ügyfeleket csinálnak.</p>' :
          '<p>Custom websites that convert visitors into customers.</p>'
      },
      acf: {
        price: isHu ? '900.000 Ft-tól' : 'Starting at $3,000',
        features: isHu ?
          ['Egyedi Tervezés', 'Mobilbarát', 'SEO Optimalizálás', 'Analitika'] :
          ['Custom Design', 'Mobile Responsive', 'SEO Optimized', 'Analytics'],
        service_icon: 'globe'
      },
      language: lang
    },
    {
      id: 3,
      slug: 'business-intelligence',
      title: { 
        rendered: isHu ? 'Üzleti Intelligencia' : 'Business Intelligence'
      },
      content: { 
        rendered: isHu ?
          '<p>Adatvezérelt betekintések a vállalkozásod teljesítményének optimalizálásához.</p>' :
          '<p>Data-driven insights to optimize your business performance.</p>'
      },
      acf: {
        price: isHu ? '600.000 Ft-tól/hónap' : 'Starting at $2,000/month',
        features: isHu ?
          ['Adatelemzés', 'Jelentések', 'Dashboard', 'Betekintések'] :
          ['Data Analysis', 'Reporting', 'Dashboards', 'Insights'],
        service_icon: 'bar-chart'
      },
      language: lang
    }
  ];
}

function getMockBlogPosts(lang: string): BlogPost[] {
  const isHu = lang === 'hu';
  
  return [
    {
      id: 1,
      date: '2024-03-15',
      date_gmt: '2024-03-15',
      guid: { rendered: 'https://admin.theignitingstudio.com/?p=1' },
      modified: '2024-03-15',
      modified_gmt: '2024-03-15',
      slug: isHu ? 'kozossegimedia-strategiak-2024' : 'social-media-strategies-2024',
      status: 'publish',
      type: 'post',
      link: `https://theignitingstudio.com/${lang}/blog/${isHu ? 'kozossegimedia-strategiak-2024' : 'social-media-strategies-2024'}`,
      title: { 
        rendered: isHu ? 
          '2024 Közösségimédia Stratégiák Kisvállalkozásoknak' : 
          'Social Media Strategies for Small Businesses in 2024'
      },
      content: { 
        rendered: isHu ?
          '<p>A közösségimédia-marketing gyorsan változó világában a kisvállalkozásoknak lépést kell tartaniuk a legújabb trendekkel és stratégiákkal...</p>' :
          '<p>In the rapidly evolving world of social media marketing, small businesses need to stay ahead of the latest trends and strategies...</p>'
      },
      excerpt: { 
        rendered: isHu ?
          'Fedezd fel a legújabb közösségimédia-stratégiákat, amelyek segítenek a kisvállalkozásodnak növekedni 2024-ben.' :
          'Discover the latest social media strategies to help your small business grow in 2024.'
      },
      author: 1,
      featured_media: 201,
      comment_status: 'open',
      ping_status: 'open',
      sticky: false,
      template: '',
      format: 'standard',
      meta: [],
      categories: [1, 3],
      tags: [1, 2, 5],
      acf: {
        read_time: 5,
        featured_post: true,
        author_bio: isHu ? 
          'Digitális marketing szakértő több mint 8 év tapasztalattal.' :
          'Digital marketing expert with over 8 years of experience.'
      },
      featured_media_url: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop',
      author_name: 'The Igniting Studio',
      category_names: isHu ? ['Közösségimédia', 'Stratégia'] : ['Social Media', 'Strategy'],
      tag_names: isHu ? ['Instagram', 'Facebook', 'Tippek'] : ['Instagram', 'Facebook', 'Tips'],
      language: lang
    }
    // Add more blog posts...
  ];
}

function getMockCategories(): Category[] {
  return [
    { id: 1, name: 'Social Media', slug: 'social-media', description: 'Social media marketing tips and strategies', count: 12 },
    { id: 2, name: 'Web Design', slug: 'web-design', description: 'Website design and development insights', count: 8 },
    { id: 3, name: 'Strategy', slug: 'strategy', description: 'Business and marketing strategy guides', count: 15 }
  ];
}

function getMockTags(): Tag[] {
  return [
    { id: 1, name: 'Instagram', slug: 'instagram', description: 'Instagram marketing tips', count: 8 },
    { id: 2, name: 'Facebook', slug: 'facebook', description: 'Facebook marketing strategies', count: 6 },
    { id: 3, name: 'SEO', slug: 'seo', description: 'Search engine optimization', count: 10 },
    { id: 4, name: 'Content Marketing', slug: 'content-marketing', description: 'Content marketing strategies', count: 12 },
    { id: 5, name: 'Tips', slug: 'tips', description: 'Quick tips and tricks', count: 20 }
  ];
}

function getMockSettings(lang: string): SiteSettings {
  const isHu = lang === 'hu';
  
  return {
    title: 'The Igniting Studio',
    tagline: isHu ? 'Márkákat gyújtunk, növekedést inspirálunk' : 'Igniting brands, inspiring growth',
    url: 'https://theignitingstudio.com',
    admin_email: 'hello@theignitingstudio.com',
    timezone: 'America/New_York',
    language: lang,
    contact_info: {
      phone: '+1 (555) 123-4567',
      email: 'hello@theignitingstudio.com',
      address: isHu ? 
        'New York, NY 10001' : 
        'New York, NY 10001',
      hours: isHu ? 
        'Hétfő - Péntek: 9:00 - 18:00' : 
        'Monday - Friday: 9:00 AM - 6:00 PM'
    },
    social_links: {
      facebook: 'https://facebook.com/theignitingstudio',
      instagram: 'https://instagram.com/theignitingstudio',
      linkedin: 'https://linkedin.com/company/theignitingstudio',
      twitter: 'https://twitter.com/igniting_studio'
    }
  };
}