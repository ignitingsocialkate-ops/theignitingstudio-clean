import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
  isRTL: boolean;
}

interface Translation {
  [key: string]: string | Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const en: Translation = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Contact',
    language: 'Language',
    digitalProducts: 'Digital Products'
  },
  services: {
    social: 'Social Media Management',
    content: 'Content Creation',
    website: 'Website Creation',
    bi: 'Business Intelligence',
    title: 'Our Services',
    subtitle: 'Comprehensive digital solutions tailored to your business needs',
    socialMedia: {
      title: 'Social Media Management',
      description: 'Strategic social media management that builds your brand and engages your audience.',
      price: 'Starting at $1,500/month'
    },
    businessIntelligence: {
      title: 'Business Intelligence',
      description: 'Data-driven insights to optimize your business performance.',
      price: 'Starting at $2,000/month'
    },
    cta: 'Get Started',
    websiteDescription: 'Beautiful, responsive websites that convert visitors into customers and reflect your brand perfectly across all devices with cutting-edge design and seamless user experience.',
    contentDescription: 'Compelling content that tells your story and connects with your audience across all platforms with creative excellence, professional photography, and engaging video content.',
    strategicBrandPresence: 'Strategic Brand Presence',
    digitalExcellence: 'Digital Excellence',
    visualStorytelling: 'Visual Storytelling',
    dataDrivenGrowth: 'Data-Driven Growth',
    contentStrategy: 'Content Strategy',
    communityManagement: 'Community Management',
    analyticsGrowth: 'Analytics & Growth',
    brandStorytelling: 'Brand Storytelling',
    customDesign: 'Custom Design',
    mobileResponsive: 'Mobile Responsive',
    seoOptimized: 'SEO Optimized',
    performanceFocused: 'Performance Focused',
    photography: 'Photography',
    videoProduction: 'Video Production',
    copywriting: 'Copywriting',
    brandContent: 'Brand Content',
    analyticsSetup: 'Analytics Setup',
    performanceTracking: 'Performance Tracking',
    growthStrategy: 'Growth Strategy',
    roiOptimization: 'ROI Optimization'
  },
  hero: {
    tagline: 'Creative Digital Studio',
    mainHeadline: 'We handle the digital side, you focus on your next big move.',
    ctaPrimary: 'Start Your Project',
    ctaSecondary: 'View Our Work'
  },
  about: {
    title: 'About The Igniting Studio',
    description: 'We\'re a creative digital studio that specializes in transforming businesses through strategic social media management, stunning website creation, and data-driven business intelligence solutions.',
    mission: 'Our mission is simple: handle the digital complexity so you can focus on what you do best - growing your business and serving your customers.',
    statsTitle: 'Why Choose Us',
    cta: 'Let\'s Work Together'
  },

  portfolio: {
    title: 'Our Work',
    subtitle: 'See how we\'ve helped businesses ignite their potential',
    viewProject: 'View Project',
    allWork: 'View All Work',
    featuredProject: 'Featured Project',
    moreProjects: 'More Projects'
  },
  contact: {
    title: 'Let\'s Work Together',
    subtitle: 'Ready to ignite your brand\'s potential?',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    phone: 'Phone',
    address: 'Address',
    hours: 'Business Hours',
    emailUs: 'Email Us',
    callUs: 'Call Us',
    lastName: 'Last Name',
    subject: 'Subject',
    subjectPlaceholder: 'What can we help you with?',
    messagePlaceholder: 'Tell us about your project and how we can help...',
    messageSentSuccess: 'Message Sent Successfully!',
    whatToExpect: 'What to Expect',
    quickResponse: 'Quick response within 24 hours',
    freeConsultation: 'Free consultation and project assessment',
    transparentPricing: 'Transparent pricing and timeline',
    dedicatedSupport: 'Dedicated support throughout your project'
  },
  blog: {
    title: 'Latest Insights',
    subtitle: 'Discover the latest trends in digital marketing and business growth',
    readMore: 'Read More',
    categories: 'Categories',
    tags: 'Tags',
    author: 'Author',
    publishedOn: 'Published on',
    relatedPosts: 'Related Posts'
  },
  footer: {
    tagline: 'Igniting brands, inspiring growth',
    quickLinks: 'Quick Links',
    services: 'Services',
    legal: 'Legal',
    followUs: 'Follow Us',
    copyright: '© {{year}} The Igniting Studio. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    description: 'We handle the digital side, you focus on your next big move. Your creative partner for digital growth.',
    company: 'Company',
    support: 'Support',
    socialMediaManagement: 'Social Media Management',
    contentCreation: 'Content Creation',
    websiteDesign: 'Website Design',
    businessIntelligence: 'Business Intelligence',
    aboutUs: 'About Us',
    ourPortfolio: 'Our Portfolio',
    contact: 'Contact',
    getStarted: 'Get Started',
    contactSupport: 'Contact Support',
    projectInquiry: 'Project Inquiry',
    madeWithLove: 'Made with',
    forAmazingClients: 'for amazing clients.'
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Try Again',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    share: 'Share',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    searchPlaceholder: 'Search...',
    noResults: 'No results found',
    showMore: 'Show More',
    showLess: 'Show Less'
  }
};

// Hungarian translations
const hu: Translation = {
  nav: {
    home: 'Kezdőlap',
    about: 'Rólunk',
    services: 'Szolgáltatások',
    portfolio: 'Portfólió',
    blog: 'Blog',
    contact: 'Kapcsolat',
    language: 'Nyelv',
    digitalProducts: 'Digitális Termékek'
  },
  services: {
    social: 'Közösségimédia-menedzsment',
    content: 'Tartalomkészítés',
    website: 'Weboldalkészítés',
    bi: 'Üzleti Intelligencia',
    title: 'Szolgáltatásaink',
    subtitle: 'Átfogó digitális megoldások, amelyek a vállalkozásod igényeire szabottak',
    socialMedia: {
      title: 'Közösségimédia-menedzsment',
      description: 'Stratégiai közösségimédia-menedzsment, amely építi a márkádat és bevonza a közönségedet.',
      price: '450.000 Ft-tól/hónap'
    },
    businessIntelligence: {
      title: 'Üzleti Intelligencia',
      description: 'Adatvezérelt betekintések a vállalkozásod teljesítményének optimalizálásához.',
      price: '600.000 Ft-tól/hónap'
    },
    cta: 'Érdekel',
    websiteDescription: 'Gyönyörű, reszponzív weboldalak, amelyek a látogatókból ügyfeleket csinálnak és tökéletesen tükrözik a márkádat minden eszközön élvonalbeli tervezéssel és zökkenőmentes felhasználói élménnyel.',
    contentDescription: 'Meggyőző tartalom, amely elmeséli a történetedet és összeköt a közönségeddel minden platformon kreatív kiválósággal, professzionális fotózással és lebilincselő videotartalommal.',
    strategicBrandPresence: 'Stratégiai Márkajelenlét',
    digitalExcellence: 'Digitális Kiválóság',
    visualStorytelling: 'Vizuális Történetmesélés',
    dataDrivenGrowth: 'Adatvezérelt Növekedés',
    contentStrategy: 'Tartalomstratégia',
    communityManagement: 'Közösségmenedzsment',
    analyticsGrowth: 'Analitika és Növekedés',
    brandStorytelling: 'Márkatörténet',
    customDesign: 'Egyedi Tervezés',
    mobileResponsive: 'Mobilbarát',
    seoOptimized: 'SEO Optimalizált',
    performanceFocused: 'Teljesítményfókuszú',
    photography: 'Fotózás',
    videoProduction: 'Videógyártás',
    copywriting: 'Szövegírás',
    brandContent: 'Márkatartalom',
    analyticsSetup: 'Analitika Beállítás',
    performanceTracking: 'Teljesítménykövetés',
    growthStrategy: 'Növekedési Stratégia',
    roiOptimization: 'ROI Optimalizálás'
  },
  hero: {
    tagline: 'Kreatív Digitális Stúdió',
    mainHeadline: 'Mi intézzük a digitális oldalt, te a következő nagy lépésre koncentrálj.',
    ctaPrimary: 'Projekt Indítása',
    ctaSecondary: 'Munkáink Megtekintése'
  },
  about: {
    title: 'Az Igniting Studio-ról',
    description: 'Kreatív digitális stúdió vagyunk, amely arra specializálódott, hogy stratégiai közösségimédia-menedzsment, lenyűgöző weboldalkészítés és adatvezérelt üzleti intelligencia megoldások segítségével átformálja a vállalkozásokat.',
    mission: 'Küldetésünk egyszerű: intézzük a digitális bonyodalmakat, hogy te arra koncentrálhass, amiben a legjobb vagy - a vállalkozásod növelésére és az ügyfeleide kiszolgálására.',
    statsTitle: 'Miért válassz minket?',
    cta: 'Dolgozzunk Együtt'
  },

  portfolio: {
    title: 'Munkáink',
    subtitle: 'Nézd meg, hogyan segítettük a vállalkozásokat kibontakoztatni a potenciáljukat',
    viewProject: 'Projekt Megtekintése',
    allWork: 'Összes Munka Megtekintése',
    featuredProject: 'Kiemelt Projekt',
    moreProjects: 'További Projektek'
  },
  contact: {
    title: 'Dolgozzunk Együtt',
    subtitle: 'Készen állsz kibontakoztatni a márkád potenciálját?',
    name: 'Név',
    email: 'E-mail',
    message: 'Üzenet',
    send: 'Üzenet Küldése',
    phone: 'Telefon',
    address: 'Cím',
    hours: 'Nyitvatartás',
    emailUs: 'Írj Nekünk',
    callUs: 'Hívj Fel',
    lastName: 'Vezetéknév',
    subject: 'Tárgy',
    subjectPlaceholder: 'Miben segíthetünk?',
    messagePlaceholder: 'Mesélj a projektedről és hogy tudunk segíteni...',
    messageSentSuccess: 'Üzenet Sikeresen Elküldve!',
    whatToExpected: 'Mire Számíthatsz',
    quickResponse: 'Gyors válasz 24 órán belül',
    freeConsultation: 'Ingyenes konzultáció és projektértékelés',
    transparentPricing: 'Átlátható árazás és határidő',
    dedicatedSupport: 'Teljes körű támogatás a projekt alatt'
  },
  blog: {
    title: 'Legfrissebb Betekintések',
    subtitle: 'Fedezd fel a digitális marketing és üzleti növekedés legújabb trendjeit',
    readMore: 'Továbbiak',
    categories: 'Kategóriák',
    tags: 'Címkék',
    author: 'Szerző',
    publishedOn: 'Megjelent',
    relatedPosts: 'Kapcsolódó Bejegyzések'
  },
  footer: {
    tagline: 'Márkákat gyújtunk, növekedést inspirálunk',
    quickLinks: 'Gyors Linkek',
    services: 'Szolgáltatások',
    legal: 'Jogi',
    followUs: 'Kövess Minket',
    copyright: '© {{year}} The Igniting Studio. Minden jog fenntartva.',
    privacyPolicy: 'Adatvédelmi Irányelvek',
    termsOfService: 'Felhasználási Feltételek',
    description: 'Mi intézzük a digitális oldalt, te a következő nagy lépésre koncentrálj. A kreatív partnerem a digitális növekedésért.',
    company: 'Cég',
    support: 'Támogatás',
    socialMediaManagement: 'Közösségimédia-menedzsment',
    contentCreation: 'Tartalomkészítés',
    websiteDesign: 'Weboldaltervezés',
    businessIntelligence: 'Üzleti Intelligencia',
    aboutUs: 'Rólunk',
    ourPortfolio: 'Portfóliónk',
    contact: 'Kapcsolat',
    getStarted: 'Kezdjük El',
    contactSupport: 'Kapcsolat a Támogatással',
    projectInquiry: 'Projektkérdés',
    madeWithLove: 'Készítve',
    forAmazingClients: 'csodálatos ügyfelek számára.'
  },
  common: {
    loading: 'Betöltés...',
    error: 'Valami hiba történt',
    retry: 'Újra',
    close: 'Bezár',
    save: 'Mentés',
    cancel: 'Mégse',
    edit: 'Szerkesztés',
    delete: 'Törlés',
    view: 'Megtekintés',
    share: 'Megosztás',
    back: 'Vissza',
    next: 'Következő',
    previous: 'Előző',
    searchPlaceholder: 'Keresés...',
    noResults: 'Nincs találat',
    showMore: 'Több',
    showLess: 'Kevesebb'
  }
};

const translations: Record<Language, Translation> = { en, hu };

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check URL for language
    const path = window.location.pathname;
    if (path.startsWith('/hu')) {
      setLanguage('hu');
    } else {
      setLanguage('en');
    }

    // Store language preference
    localStorage.setItem('igniting-studio-language', language);
  }, [language]);

  const t = (key: string, params: Record<string, string> = {}): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" not found for language "${language}"`);
      return key;
    }
    
    // Replace parameters
    let result = value;
    Object.entries(params).forEach(([param, replacement]) => {
      result = result.replace(new RegExp(`{{${param}}}`, 'g'), replacement);
    });
    
    return result;
  };

  const changeLanguage = (lang: Language) => {
    const currentPath = window.location.pathname;
    let newPath: string;

    if (lang === 'hu') {
      // Switch to Hungarian
      if (currentPath.startsWith('/hu')) {
        newPath = currentPath;
      } else {
        newPath = `/hu${currentPath === '/' ? '' : currentPath}`;
      }
    } else {
      // Switch to English
      if (currentPath.startsWith('/hu')) {
        newPath = currentPath.replace('/hu', '') || '/';
      } else {
        newPath = currentPath;
      }
    }

    setLanguage(lang);
    window.history.pushState({}, '', newPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
        isRTL: false, // Hungarian is LTR like English
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}