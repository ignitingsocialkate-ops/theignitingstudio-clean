// WordPress REST API Service
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
    completion_date?: string;
    gallery?: Array<{
      url: string;
      alt: string;
    }>;
    testimonial?: {
      content: string;
      author: string;
      position: string;
    };
  };
}

export interface ServiceItem extends WordPressPost {
  acf?: {
    service_price?: string;
    service_features?: string[];
    service_duration?: string;
    service_includes?: string[];
    cta_text?: string;
    cta_url?: string;
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
    social_media?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
    business_hours?: string;
    address?: string;
  };
}

class WordPressAPIService {
  private baseUrl: string;
  private apiUrl: string;

  constructor(baseUrl: string = (typeof process !== 'undefined' ? process.env.REACT_APP_WP_API_URL : null) || 'https://admin.theignitingstudio.com') {
    this.baseUrl = baseUrl;
    this.apiUrl = `${baseUrl}/wp-json/wp/v2`;
  }

  // Generic fetch method with error handling
  private async fetchAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.apiUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('WordPress API fetch error:', error);
      throw error;
    }
  }

  // Pages
  async getPages(): Promise<WordPressPage[]> {
    return this.fetchAPI('/pages?_embed&per_page=100');
  }

  async getPageBySlug(slug: string): Promise<WordPressPage | null> {
    const pages = await this.fetchAPI(`/pages?slug=${slug}&_embed`);
    return pages.length > 0 ? pages[0] : null;
  }

  async getPageById(id: number): Promise<WordPressPage> {
    return this.fetchAPI(`/pages/${id}?_embed`);
  }

  // Portfolio Items (Custom Post Type)
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return this.fetchAPI('/portfolio?_embed&per_page=100&status=publish');
  }

  async getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
    const items = await this.fetchAPI(`/portfolio?slug=${slug}&_embed`);
    return items.length > 0 ? items[0] : null;
  }

  // Services (Custom Post Type)
  async getServices(): Promise<ServiceItem[]> {
    return this.fetchAPI('/services?_embed&per_page=100&status=publish');
  }

  async getServiceBySlug(slug: string): Promise<ServiceItem | null> {
    const services = await this.fetchAPI(`/services?slug=${slug}&_embed`);
    return services.length > 0 ? services[0] : null;
  }

  // Blog Posts
  async getPosts(page: number = 1, perPage: number = 10): Promise<WordPressPost[]> {
    return this.fetchAPI(`/posts?_embed&page=${page}&per_page=${perPage}&status=publish`);
  }

  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const posts = await this.fetchAPI(`/posts?slug=${slug}&_embed`);
    return posts.length > 0 ? posts[0] : null;
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    return this.fetchAPI('/settings');
  }

  // Media
  async getMediaById(id: number) {
    return this.fetchAPI(`/media/${id}`);
  }

  // Search
  async search(query: string, type: string = 'post'): Promise<WordPressPost[]> {
    return this.fetchAPI(`/${type}?search=${encodeURIComponent(query)}&_embed`);
  }

  // Contact Form Submission (if using Contact Form 7 REST API)
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

  // Newsletter Subscription (if using a newsletter plugin)
  async subscribeToNewsletter(email: string, firstName?: string, lastName?: string): Promise<any> {
    const formData = new FormData();
    formData.append('email', email);
    if (firstName) formData.append('first_name', firstName);
    if (lastName) formData.append('last_name', lastName);

    return this.fetchAPI('/newsletter/subscribe', {
      method: 'POST',
      body: formData,
    });
  }
}

// Export singleton instance
export const wordPressAPI = new WordPressAPIService();
export default WordPressAPIService;