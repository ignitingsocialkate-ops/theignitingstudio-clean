import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { wordPressAPI, WordPressPage, PortfolioItem, ServiceItem, SiteSettings } from '../services/wordpress-api';

interface ContentContextType {
  // Data
  pages: WordPressPage[];
  portfolioItems: PortfolioItem[];
  services: ServiceItem[];
  siteSettings: SiteSettings | null;
  
  // Loading states
  isLoading: boolean;
  pagesLoading: boolean;
  portfolioLoading: boolean;
  servicesLoading: boolean;
  settingsLoading: boolean;
  
  // Error states
  error: string | null;
  
  // Helper functions
  getPageBySlug: (slug: string) => WordPressPage | null;
  getPortfolioItemBySlug: (slug: string) => PortfolioItem | null;
  getServiceBySlug: (slug: string) => ServiceItem | null;
  
  // Refresh functions
  refreshContent: () => Promise<void>;
  refreshPages: () => Promise<void>;
  refreshPortfolio: () => Promise<void>;
  refreshServices: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | null>(null);

interface ContentProviderProps {
  children: ReactNode;
  enableCaching?: boolean;
  cacheExpiry?: number; // in milliseconds
}

export function ContentProvider({ 
  children, 
  enableCaching = true, 
  cacheExpiry = 5 * 60 * 1000 // 5 minutes
}: ContentProviderProps) {
  // Data states
  const [pages, setPages] = useState<WordPressPage[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  
  // Loading states
  const [pagesLoading, setPagesLoading] = useState(false);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // Cache management
  const [lastFetch, setLastFetch] = useState<{ [key: string]: number }>({});
  
  // Helper to check if cache is valid
  const isCacheValid = (key: string): boolean => {
    if (!enableCaching) return false;
    const lastFetchTime = lastFetch[key];
    return lastFetchTime && (Date.now() - lastFetchTime) < cacheExpiry;
  };
  
  // Helper to update cache timestamp
  const updateCacheTimestamp = (key: string) => {
    setLastFetch(prev => ({ ...prev, [key]: Date.now() }));
  };
  
  // Computed loading state
  const isLoading = pagesLoading || portfolioLoading || servicesLoading || settingsLoading;
  
  // Fetch functions with caching
  const fetchPages = async () => {
    if (isCacheValid('pages') && pages.length > 0) return;
    
    setPagesLoading(true);
    setError(null);
    
    try {
      const fetchedPages = await wordPressAPI.getPages();
      setPages(fetchedPages);
      updateCacheTimestamp('pages');
    } catch (err) {
      console.warn('WordPress not available, using mock data:', err.message);
      
      // Always fallback to mock data if WordPress is unavailable
      setPages(getMockPages());
      updateCacheTimestamp('pages');
      // Don't set error for development - just use mock data silently
    } finally {
      setPagesLoading(false);
    }
  };
  
  const fetchPortfolio = async () => {
    if (isCacheValid('portfolio') && portfolioItems.length > 0) return;
    
    setPortfolioLoading(true);
    setError(null);
    
    try {
      const fetchedPortfolio = await wordPressAPI.getPortfolioItems();
      setPortfolioItems(fetchedPortfolio);
      updateCacheTimestamp('portfolio');
    } catch (err) {
      console.warn('WordPress not available, using mock portfolio data:', err.message);
      
      // Always fallback to mock data if WordPress is unavailable
      setPortfolioItems(getMockPortfolio());
      updateCacheTimestamp('portfolio');
      // Don't set error - just use mock data silently
    } finally {
      setPortfolioLoading(false);
    }
  };
  
  const fetchServices = async () => {
    if (isCacheValid('services') && services.length > 0) return;
    
    setServicesLoading(true);
    setError(null);
    
    try {
      const fetchedServices = await wordPressAPI.getServices();
      setServices(fetchedServices);
      updateCacheTimestamp('services');
    } catch (err) {
      console.warn('WordPress not available, using mock services data:', err.message);
      
      // Always fallback to mock data if WordPress is unavailable
      setServices(getMockServices());
      updateCacheTimestamp('services');
      // Don't set error - just use mock data silently
    } finally {
      setServicesLoading(false);
    }
  };
  
  const fetchSettings = async () => {
    if (isCacheValid('settings') && siteSettings) return;
    
    setSettingsLoading(true);
    setError(null);
    
    try {
      const fetchedSettings = await wordPressAPI.getSiteSettings();
      setSiteSettings(fetchedSettings);
      updateCacheTimestamp('settings');
    } catch (err) {
      console.warn('WordPress not available, using mock settings data:', err.message);
      
      // Always fallback to mock data if WordPress is unavailable
      setSiteSettings(getMockSettings());
      updateCacheTimestamp('settings');
      // Don't set error - just use mock data silently
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
  
  const getServiceBySlug = (slug: string): ServiceItem | null => {
    return services.find(service => service.slug === slug) || null;
  };
  
  // Refresh functions
  const refreshPages = async () => {
    delete lastFetch.pages;
    await fetchPages();
  };
  
  const refreshPortfolio = async () => {
    delete lastFetch.portfolio;
    await fetchPortfolio();
  };
  
  const refreshServices = async () => {
    delete lastFetch.services;
    await fetchServices();
  };
  
  const refreshContent = async () => {
    setLastFetch({});
    await Promise.all([
      fetchPages(),
      fetchPortfolio(),
      fetchServices(),
      fetchSettings()
    ]);
  };
  
  // Initial data fetch
  useEffect(() => {
    const initializeContent = async () => {
      await Promise.all([
        fetchPages(),
        fetchPortfolio(),
        fetchServices(),
        fetchSettings()
      ]);
    };
    
    initializeContent();
  }, []);
  
  const contextValue: ContentContextType = {
    // Data
    pages,
    portfolioItems,
    services,
    siteSettings,
    
    // Loading states
    isLoading,
    pagesLoading,
    portfolioLoading,
    servicesLoading,
    settingsLoading,
    
    // Error state
    error,
    
    // Helper functions
    getPageBySlug,
    getPortfolioItemBySlug,
    getServiceBySlug,
    
    // Refresh functions
    refreshContent,
    refreshPages,
    refreshPortfolio,
    refreshServices,
  };
  
  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

// Hook to use the content context
export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

// Mock data for development/fallback
function getMockPages(): WordPressPage[] {
  return [
    {
      id: 1,
      slug: 'about',
      title: { rendered: 'About The Igniting Studio' },
      content: { rendered: '<p>We are a creative studio specializing in digital marketing and business intelligence.</p>' },
      excerpt: { rendered: 'Learn about our story and mission.' },
      // ... other required fields with defaults
    } as WordPressPage,
  ];
}

function getMockPortfolio(): PortfolioItem[] {
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
      content: { rendered: '<p>When Michelin-star chef Frank Bordoni launched his chocolate-focused cookbook, he asked us to help build momentum from scratch. With no existing social media presence, our job was to create something that truly felt like him — while also driving sales.</p>' },
      excerpt: { rendered: 'Real estate marketing transformation' },
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
        project_type: 'Social Media Management',
        project_date: '2024-01-15',
        featured: true,
        gallery: [],
        technologies: ['Instagram', 'Facebook', 'Content Creation'],
        testimonial: {
          content: 'The Igniting Studio transformed our social media presence completely.',
          author: 'Frank Bordoni',
          position: 'Chef & Author'
        }
      },
      featured_media_url: 'https://images.unsplash.com/photo-1556909114-8f7e94d7bf20?w=800&h=600&fit=crop',
    } as PortfolioItem,
    {
      id: 2,
      date: '2023-12-10',
      date_gmt: '2023-12-10',
      guid: { rendered: 'https://admin.theignitingstudio.com/?post_type=portfolio&#038;p=2' },
      modified: '2023-12-10',
      modified_gmt: '2023-12-10',
      slug: 'puregems',
      status: 'publish',
      type: 'portfolio',
      link: 'https://theignitingstudio.com/portfolio/puregems',
      title: { rendered: 'PureGems' },
      content: { rendered: '<p>PureGems, a luxury gemstone brand, approached us to elevate their social media presence and refine their online aesthetic. We created a cohesive style that reflected their luxury, clean, yet unique brand identity.</p>' },
      excerpt: { rendered: 'Luxury gemstone brand social media transformation' },
      author: 1,
      featured_media: 124,
      comment_status: 'closed',
      ping_status: 'closed',
      sticky: false,
      template: '',
      format: 'standard',
      meta: [],
      categories: [],
      tags: [],
      acf: {
        project_url: 'https://puregems.com',
        client_name: 'PureGems',
        project_type: 'Social Media Management',
        project_date: '2023-12-10',
        featured: false,
        gallery: [],
        technologies: ['Instagram', 'Pinterest', 'Brand Design'],
      },
      featured_media_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
    } as PortfolioItem,
    {
      id: 3,
      date: '2023-11-20',
      date_gmt: '2023-11-20',
      guid: { rendered: 'https://admin.theignitingstudio.com/?post_type=portfolio&#038;p=3' },
      modified: '2023-11-20',
      modified_gmt: '2023-11-20',
      slug: 'u4u-teen',
      status: 'publish',
      type: 'portfolio',
      link: 'https://theignitingstudio.com/portfolio/u4u-teen',
      title: { rendered: 'U4U Teen Organization' },
      content: { rendered: '<p>U4U Teen is a dynamic organization dedicated to supporting teenagers by fostering a safe community. We built an engaging presence helping them connect with their audience in meaningful ways.</p>' },
      excerpt: { rendered: 'Teen organization community building' },
      author: 1,
      featured_media: 125,
      comment_status: 'closed',
      ping_status: 'closed',
      sticky: false,
      template: '',
      format: 'standard',
      meta: [],
      categories: [],
      tags: [],
      acf: {
        client_name: 'U4U Teen',
        project_type: 'Social Media Management',
        project_date: '2023-11-20',
        featured: false,
        gallery: [],
        technologies: ['Instagram', 'TikTok', 'Community Management'],
      },
      featured_media_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    } as PortfolioItem,
    {
      id: 4,
      date: '2024-02-01',
      date_gmt: '2024-02-01',
      guid: { rendered: 'https://admin.theignitingstudio.com/?post_type=portfolio&#038;p=4' },
      modified: '2024-02-01',
      modified_gmt: '2024-02-01',
      slug: 'anna-pastry',
      status: 'publish',
      type: 'portfolio',
      link: 'https://theignitingstudio.com/portfolio/anna-pastry',
      title: { rendered: 'Anna Pastry Shop' },
      content: { rendered: '<p>This local pastry shop came to us with a clear goal: get more people walking through the door. We partnered up using one of our starter packages, combining ad creation and management with consistent organic content.</p>' },
      excerpt: { rendered: 'Local pastry shop marketing success' },
      author: 1,
      featured_media: 126,
      comment_status: 'closed',
      ping_status: 'closed',
      sticky: false,
      template: '',
      format: 'standard',
      meta: [],
      categories: [],
      tags: [],
      acf: {
        client_name: 'Anna Pastry Shop',
        project_type: 'Social Media Management',
        project_date: '2024-02-01',
        featured: false,
        gallery: [],
        technologies: ['Instagram', 'Facebook Ads', 'Local Marketing'],
      },
      featured_media_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
    } as PortfolioItem,
  ];
}

function getMockServices(): ServiceItem[] {
  return [
    {
      id: 1,
      slug: 'social-media-management',
      title: { rendered: 'Social Media Management' },
      content: { rendered: '<p>Complete social media management services.</p>' },
      excerpt: { rendered: 'Professional social media management' },
      acf: {
        service_features: ['Content Creation', 'Analytics', 'Strategy'],
      },
      // ... other required fields
    } as ServiceItem,
  ];
}

function getMockSettings(): SiteSettings {
  return {
    title: 'The Igniting Studio',
    description: 'Creative Digital Marketing & Business Intelligence Studio',
    url: 'https://theignitingstudio.com',
    admin_email: 'hello@theignitingstudio.com',
    timezone: 'America/New_York',
    date_format: 'F j, Y',
    time_format: 'g:i a',
    start_of_week: 1,
    language: 'en_US',
    acf: {
      contact_email: 'hello@theignitingstudio.com',
      contact_phone: '(555) 123-4567',
      social_media: {
        instagram: 'https://instagram.com/theignitingstudio',
        linkedin: 'https://linkedin.com/company/theignitingstudio',
      },
    },
  };
}