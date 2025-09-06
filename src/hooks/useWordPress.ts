import { useState, useEffect } from 'react';
import { wordPressAPI, WordPressPost, WordPressPage, PortfolioItem, ServiceItem } from '../services/wordpress-api';

// Generic hook for WordPress data fetching
export function useWordPressData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = [],
  initialData?: T
) {
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      console.error('WordPress data fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

// Specific hooks for different content types
export function useWordPressPage(slug: string) {
  return useWordPressData<WordPressPage | null>(
    () => wordPressAPI.getPageBySlug(slug),
    [slug]
  );
}

export function useWordPressPages() {
  return useWordPressData<WordPressPage[]>(
    () => wordPressAPI.getPages(),
    []
  );
}

export function usePortfolioItem(slug: string) {
  return useWordPressData<PortfolioItem | null>(
    () => wordPressAPI.getPortfolioItemBySlug(slug),
    [slug]
  );
}

export function usePortfolioItems() {
  return useWordPressData<PortfolioItem[]>(
    () => wordPressAPI.getPortfolioItems(),
    []
  );
}

export function useService(slug: string) {
  return useWordPressData<ServiceItem | null>(
    () => wordPressAPI.getServiceBySlug(slug),
    [slug]
  );
}

export function useServices() {
  return useWordPressData<ServiceItem[]>(
    () => wordPressAPI.getServices(),
    []
  );
}

export function useBlogPosts(page: number = 1, perPage: number = 10) {
  return useWordPressData<WordPressPost[]>(
    () => wordPressAPI.getPosts(page, perPage),
    [page, perPage]
  );
}

export function useBlogPost(slug: string) {
  return useWordPressData<WordPressPost | null>(
    () => wordPressAPI.getPostBySlug(slug),
    [slug]
  );
}

// Hook for contact form submissions
export function useContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (formId: number, formData: { [key: string]: string }) => {
    setSubmitting(true);
    setError(null);
    
    try {
      const wpFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        wpFormData.append(key, value);
      });
      
      await wordPressAPI.submitContactForm(formId, wpFormData);
      setSubmitted(true);
      
      // Reset form state after delay
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
      
    } catch (err) {
      console.error('Contact form submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  return { submitForm, submitting, submitted, error };
}

// Hook for newsletter subscriptions
export function useNewsletterSubscription() {
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string, firstName?: string, lastName?: string) => {
    setSubscribing(true);
    setError(null);
    
    try {
      await wordPressAPI.subscribeToNewsletter(email, firstName, lastName);
      setSubscribed(true);
      
      // Reset state after delay
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
      
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
    } finally {
      setSubscribing(false);
    }
  };

  return { subscribe, subscribing, subscribed, error };
}

// Hook for search functionality
export function useWordPressSearch() {
  const [results, setResults] = useState<WordPressPost[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string, type: string = 'post') => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setSearching(true);
    setError(null);
    
    try {
      const searchResults = await wordPressAPI.search(query, type);
      setResults(searchResults);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return { results, searching, error, search, clearResults };
}