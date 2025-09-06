// Enhanced WordPress REST API Service with Multi-Language & Blog Support
export interface WordPressPost {
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
  acf?: any;
  language?: string;
  translations?: Record<string, number>;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
        sizes: any;
      };
    }>;
    author?: Array<{
      id: number;
      name: string;
      avatar_urls: any;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WordPressPage extends WordPressPost {
  parent: number;
  menu_order: number;
}

export interface PortfolioItem extends WordPressPost {
  acf?: {
    project_url?: string;
    technologies?: string[];
    client_name?: string;
    project_type?: string;
    project_type_hu?: string;
    completion_date?: string;
    gallery?: Array<{
      url: string;
      alt: string;
    }>;
    testimonial?: {
      content: string;
      content_hu?: string;
      author: string;
      position: string;
      position_hu?: string;
    };
  };
  featured_media_url?: string;
}

export interface ServiceItem extends WordPressPost {
  acf?: {
    service_price?: string;
    service_price_hu?: string;
    service_features?: string[];
    service_features_hu?: string[];
    service_duration?: string;
    service_duration_hu?: string;
    service_includes?: string[];
    service_includes_hu?: string[];
    service_icon?: string;
    cta_text?: string;
    cta_text_hu?: string;
    cta_url?: string;
  };
}

export interface BlogPost extends WordPressPost {
  acf?: {
    read_time?: number;
    featured_post?: boolean;
    author_bio?: string;
    author_bio_hu?: string;
    seo_title?: string;
    seo_description?: string;
    related_posts?: number[];
  };
  author_name?: string;
  category_names?: string[];
  tag_names?: string[];
  featured_media_url?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parent: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_urls: {
    24: string;
    48: string;
    96: string;
  };
  acf?: {
    bio?: string;
    bio_hu?: string;
    position?: string;
    position_hu?: string;
    social_links?: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  };
}

export interface SiteSettings {
  title: string;
  description: string;
  url: string;
  admin_email: string;
  timezone: string;
  date_format: string;
  time_format: string;
  start_of_week: number;
  language: string;
  acf?: {
    contact_email?: string;
    contact_phone?: string;
    contact_address?: string;
    contact_address_hu?: string;
    business_hours?: string;
    business_hours_hu?: string;
    social_media?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
    site_logo?: {
      url: string;
      alt: string;
    };
    footer_text?: string;
    footer_text_hu?: string;
    copyright_text?: string;
    copyright_text_hu?: string;
  };
}

class EnhancedWordPressAPIService {
  private baseUrl: string;
  private apiUrl: string;

  constructor(baseUrl?: string) {
    // Use environment variable or fallback
    this.baseUrl = baseUrl || 
      (typeof process !== 'undefined' && process.env.REACT_APP_WP_API_URL) || 
      'https://admin.theignitingstudio.com';
    this.apiUrl = `${this.baseUrl}/wp-json/wp/v2`;
    
    // Check if WordPress should be used
    const useWordPress = typeof process !== 'undefined' && 
      process.env.REACT_APP_USE_WORDPRESS !== 'false';
    
    if (!useWordPress) {
      console.info('🚀 WordPress integration disabled - using demo content');
    }
  }

  // Generic fetch method with error handling and language support
  private async fetchAPI(endpoint: string, language?: string, options: RequestInit = {}): Promise<any> {
    let url = `${this.apiUrl}${endpoint}`;
    
    // Add language parameter for WPML/Polylang support
    if (language && language !== 'en') {
      const separator = endpoint.includes('?') ? '&' : '?';
      url += `${separator}lang=${language}`;
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language || 'en',
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error: any) {
      // Create a clean error for expected connection failures
      if (error.name === 'AbortError') {
        throw new Error('Connection timeout');
      } else if (error.code === 'ENOTFOUND' || error.message.includes('Failed to fetch')) {
        throw new Error('WordPress not connected');
      } else {
        throw new Error('Connection failed');
      }
    }
  }

  // Enhanced helper to extract featured media URL
  private extractFeaturedMediaUrl(item: any): string | undefined {
    if (item._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return item._embedded['wp:featuredmedia'][0].source_url;
    }
    return undefined;
  }

  // Enhanced helper to extract author name
  private extractAuthorName(item: any): string | undefined {
    if (item._embedded?.author?.[0]?.name) {
      return item._embedded.author[0].name;
    }
    return undefined;
  }

  // Enhanced helper to extract category/tag names
  private extractTermNames(item: any, taxonomy: 'category' | 'post_tag'): string[] {
    const termIndex = taxonomy === 'category' ? 0 : 1;
    if (item._embedded?.['wp:term']?.[termIndex]) {
      return item._embedded['wp:term'][termIndex].map((term: any) => term.name);
    }
    return [];
  }

  // Pages with language support
  async getPages(language?: string): Promise<WordPressPage[]> {
    return this.fetchAPI('/pages?_embed&per_page=100&status=publish', language);
  }

  async getPageBySlug(slug: string, language?: string): Promise<WordPressPage | null> {
    const pages = await this.fetchAPI(`/pages?slug=${slug}&_embed`, language);
    return pages.length > 0 ? pages[0] : null;
  }

  async getPageById(id: number, language?: string): Promise<WordPressPage> {
    return this.fetchAPI(`/pages/${id}?_embed`, language);
  }

  // Portfolio Items with language support
  async getPortfolioItems(language?: string): Promise<PortfolioItem[]> {
    const items = await this.fetchAPI('/portfolio?_embed&per_page=100&status=publish', language);
    return items.map((item: any) => ({
      ...item,
      featured_media_url: this.extractFeaturedMediaUrl(item),
    }));
  }

  async getPortfolioItemBySlug(slug: string, language?: string): Promise<PortfolioItem | null> {
    const items = await this.fetchAPI(`/portfolio?slug=${slug}&_embed`, language);
    if (items.length > 0) {
      return {
        ...items[0],
        featured_media_url: this.extractFeaturedMediaUrl(items[0]),
      };
    }
    return null;
  }

  // Services with language support
  async getServices(language?: string): Promise<ServiceItem[]> {
    return this.fetchAPI('/services?_embed&per_page=100&status=publish', language);
  }

  async getServiceBySlug(slug: string, language?: string): Promise<ServiceItem | null> {
    const services = await this.fetchAPI(`/services?slug=${slug}&_embed`, language);
    return services.length > 0 ? services[0] : null;
  }

  // Blog Posts with enhanced metadata
  async getBlogPosts(language?: string, page: number = 1, perPage: number = 10): Promise<BlogPost[]> {
    const posts = await this.fetchAPI(`/posts?_embed&page=${page}&per_page=${perPage}&status=publish`, language);
    
    return posts.map((post: any) => ({
      ...post,
      featured_media_url: this.extractFeaturedMediaUrl(post),
      author_name: this.extractAuthorName(post),
      category_names: this.extractTermNames(post, 'category'),
      tag_names: this.extractTermNames(post, 'post_tag'),
    }));
  }

  async getBlogPostBySlug(slug: string, language?: string): Promise<BlogPost | null> {
    const posts = await this.fetchAPI(`/posts?slug=${slug}&_embed`, language);
    if (posts.length > 0) {
      const post = posts[0];
      return {
        ...post,
        featured_media_url: this.extractFeaturedMediaUrl(post),
        author_name: this.extractAuthorName(post),
        category_names: this.extractTermNames(post, 'category'),
        tag_names: this.extractTermNames(post, 'post_tag'),
      };
    }
    return null;
  }

  // Featured Blog Posts
  async getFeaturedBlogPosts(language?: string, limit: number = 3): Promise<BlogPost[]> {
    const posts = await this.fetchAPI(`/posts?_embed&per_page=${limit}&status=publish&meta_key=featured_post&meta_value=1`, language);
    
    return posts.map((post: any) => ({
      ...post,
      featured_media_url: this.extractFeaturedMediaUrl(post),
      author_name: this.extractAuthorName(post),
      category_names: this.extractTermNames(post, 'category'),
      tag_names: this.extractTermNames(post, 'post_tag'),
    }));
  }

  // Posts by Category
  async getPostsByCategory(categorySlug: string, language?: string): Promise<BlogPost[]> {
    const posts = await this.fetchAPI(`/posts?_embed&categories_slug=${categorySlug}&status=publish`, language);
    
    return posts.map((post: any) => ({
      ...post,
      featured_media_url: this.extractFeaturedMediaUrl(post),
      author_name: this.extractAuthorName(post),
      category_names: this.extractTermNames(post, 'category'),
      tag_names: this.extractTermNames(post, 'post_tag'),
    }));
  }

  // Related Posts
  async getRelatedPosts(postId: number, language?: string, limit: number = 3): Promise<BlogPost[]> {
    // First, get the current post to find its categories
    const currentPost = await this.fetchAPI(`/posts/${postId}`, language);
    if (!currentPost || !currentPost.categories.length) {
      return [];
    }

    // Get posts from the same categories, excluding the current post
    const categoryIds = currentPost.categories.join(',');
    const posts = await this.fetchAPI(`/posts?_embed&categories=${categoryIds}&exclude=${postId}&per_page=${limit}&status=publish`, language);
    
    return posts.map((post: any) => ({
      ...post,
      featured_media_url: this.extractFeaturedMediaUrl(post),
      author_name: this.extractAuthorName(post),
      category_names: this.extractTermNames(post, 'category'),
      tag_names: this.extractTermNames(post, 'post_tag'),
    }));
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.fetchAPI('/categories?per_page=100');
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const categories = await this.fetchAPI(`/categories?slug=${slug}`);
    return categories.length > 0 ? categories[0] : null;
  }

  // Tags
  async getTags(): Promise<Tag[]> {
    return this.fetchAPI('/tags?per_page=100');
  }

  async getTagBySlug(slug: string): Promise<Tag | null> {
    const tags = await this.fetchAPI(`/tags?slug=${slug}`);
    return tags.length > 0 ? tags[0] : null;
  }

  // Authors
  async getAuthors(): Promise<Author[]> {
    return this.fetchAPI('/users?per_page=100');
  }

  async getAuthorById(id: number): Promise<Author> {
    return this.fetchAPI(`/users/${id}`);
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    return this.fetchAPI('/settings');
  }

  // Media
  async getMediaById(id: number) {
    return this.fetchAPI(`/media/${id}`);
  }

  // Search with language support
  async search(query: string, type: string = 'post', language?: string): Promise<WordPressPost[]> {
    return this.fetchAPI(`/${type}?search=${encodeURIComponent(query)}&_embed`, language);
  }

  // Advanced search across multiple post types
  async globalSearch(query: string, language?: string): Promise<{
    posts: BlogPost[];
    pages: WordPressPage[];
    portfolio: PortfolioItem[];
    services: ServiceItem[];
  }> {
    const [posts, pages, portfolio, services] = await Promise.all([
      this.search(query, 'posts', language),
      this.search(query, 'pages', language),
      this.search(query, 'portfolio', language),
      this.search(query, 'services', language)
    ]);

    return { posts, pages, portfolio, services };
  }

  // Contact Form Submission (Contact Form 7)
  async submitContactForm(formId: number, formData: FormData): Promise<any> {
    const response = await fetch(`${this.baseUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Contact form submission failed: ${response.status}`);
    }

    return await response.json();
  }

  // Newsletter Subscription
  async subscribeToNewsletter(email: string, firstName?: string, lastName?: string, language?: string): Promise<any> {
    const formData = new FormData();
    formData.append('email', email);
    if (firstName) formData.append('first_name', firstName);
    if (lastName) formData.append('last_name', lastName);
    if (language) formData.append('language', language);

    return this.fetchAPI('/newsletter/subscribe', language, {
      method: 'POST',
      body: formData,
    });
  }

  // Comments (if enabled)
  async getComments(postId?: number): Promise<any[]> {
    const endpoint = postId ? `/comments?post=${postId}` : '/comments';
    return this.fetchAPI(endpoint);
  }

  async submitComment(postId: number, comment: {
    content: string;
    author_name?: string;
    author_email?: string;
    parent?: number;
  }): Promise<any> {
    const formData = new FormData();
    formData.append('post', postId.toString());
    formData.append('content', comment.content);
    if (comment.author_name) formData.append('author_name', comment.author_name);
    if (comment.author_email) formData.append('author_email', comment.author_email);
    if (comment.parent) formData.append('parent', comment.parent.toString());

    return this.fetchAPI('/comments', undefined, {
      method: 'POST',
      body: formData,
    });
  }

  // Menu Items (if using WP REST API Menus plugin)
  async getMenuItems(menuSlug: string): Promise<any[]> {
    try {
      return this.fetchAPI(`/menus/v1/menus/${menuSlug}`);
    } catch (error) {
      // Fallback to custom menu structure if plugin not available
      return this.getDefaultMenuItems();
    }
  }

  private getDefaultMenuItems(): any[] {
    return [
      { id: 1, title: 'Home', url: '/', type: 'page' },
      { id: 2, title: 'About', url: '/about', type: 'page' },
      { id: 3, title: 'Services', url: '/services', type: 'page' },
      { id: 4, title: 'Portfolio', url: '/portfolio', type: 'page' },
      { id: 5, title: 'Blog', url: '/blog', type: 'page' },
      { id: 6, title: 'Contact', url: '/contact', type: 'page' },
    ];
  }
}

// Export singleton instance
export const enhancedWordPressAPI = new EnhancedWordPressAPIService();
export default EnhancedWordPressAPIService;