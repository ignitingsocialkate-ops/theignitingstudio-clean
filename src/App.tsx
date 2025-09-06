import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { EnhancedContentProvider } from './contexts/EnhancedContentContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StudioBackground } from './components/StudioBackground';
import { TextureOverlay } from './components/TextureOverlay';
import { StartupIndicator } from './components/StartupIndicator';
import { WordPressConnectionStatus } from './components/WordPressConnectionStatus';
// Import blog page components (to be created)
import { BlogPage } from './components/BlogPage';
import { BlogPostPage } from './components/BlogPostPage';
// Import existing pages (will be converted to WordPress gradually)
import { AboutPage } from './components/AboutPage';
import { SocialMediaPage } from './components/SocialMediaPage';
import { ContentCreationPage } from './components/ContentCreationPage';
import { WebsiteCreationPage } from './components/WebsiteCreationPage';
import { BusinessIntelligencePage } from './components/BusinessIntelligencePage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { PortfolioPage } from './components/PortfolioPage';
import { FrankBordoniPage } from './components/FrankBordoniPage';
import { PureGemsPage } from './components/PureGemsPage';
import { U4UTeenPage } from './components/U4UTeenPage';
import { AnnaPastryPage } from './components/AnnaPastryPage';
import { DigitalProductsPage } from './components/DigitalProductsPage';

function HomePage() {
  return (
    <>
      <Header />
      <main className="relative space-y-0">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// Wrapper component for pages with header/footer
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <EnhancedContentProvider enableCaching={true} cacheExpiry={5 * 60 * 1000}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 text-foreground relative">
            <StudioBackground />
            <TextureOverlay />
            <StartupIndicator />
            <WordPressConnectionStatus />
            <div className="relative" style={{ zIndex: 5 }}>
              <Routes>
                {/* English Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
                <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
                <Route path="/portfolio" element={<PageLayout><PortfolioPage /></PageLayout>} />
                <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
                <Route path="/blog/:slug" element={<PageLayout><BlogPostPage /></PageLayout>} />
                <Route path="/services/social-media" element={<PageLayout><SocialMediaPage /></PageLayout>} />
                <Route path="/services/content-creation" element={<PageLayout><ContentCreationPage /></PageLayout>} />
                <Route path="/services/website-creation" element={<PageLayout><WebsiteCreationPage /></PageLayout>} />
                <Route path="/services/business-intelligence" element={<PageLayout><BusinessIntelligencePage /></PageLayout>} />
                <Route path="/privacy-policy" element={<PageLayout><PrivacyPolicyPage /></PageLayout>} />
                <Route path="/terms-of-service" element={<PageLayout><TermsOfServicePage /></PageLayout>} />
                <Route path="/portfolio/frank-bordoni" element={<PageLayout><FrankBordoniPage /></PageLayout>} />
                <Route path="/portfolio/puregems" element={<PageLayout><PureGemsPage /></PageLayout>} />
                <Route path="/portfolio/u4u-teen" element={<PageLayout><U4UTeenPage /></PageLayout>} />
                <Route path="/portfolio/anna-pastry" element={<PageLayout><AnnaPastryPage /></PageLayout>} />
                <Route path="/digital-products" element={<PageLayout><DigitalProductsPage /></PageLayout>} />

                {/* Hungarian Routes */}
                <Route path="/hu" element={<HomePage />} />
                <Route path="/hu/about" element={<PageLayout><AboutPage /></PageLayout>} />
                <Route path="/hu/contact" element={<PageLayout><ContactPage /></PageLayout>} />
                <Route path="/hu/portfolio" element={<PageLayout><PortfolioPage /></PageLayout>} />
                <Route path="/hu/blog" element={<PageLayout><BlogPage /></PageLayout>} />
                <Route path="/hu/blog/:slug" element={<PageLayout><BlogPostPage /></PageLayout>} />
                <Route path="/hu/services/social-media" element={<PageLayout><SocialMediaPage /></PageLayout>} />
                <Route path="/hu/services/content-creation" element={<PageLayout><ContentCreationPage /></PageLayout>} />
                <Route path="/hu/services/website-creation" element={<PageLayout><WebsiteCreationPage /></PageLayout>} />
                <Route path="/hu/services/business-intelligence" element={<PageLayout><BusinessIntelligencePage /></PageLayout>} />
                <Route path="/hu/privacy-policy" element={<PageLayout><PrivacyPolicyPage /></PageLayout>} />
                <Route path="/hu/terms-of-service" element={<PageLayout><TermsOfServicePage /></PageLayout>} />
                <Route path="/hu/portfolio/frank-bordoni" element={<PageLayout><FrankBordoniPage /></PageLayout>} />
                <Route path="/hu/portfolio/puregems" element={<PageLayout><PureGemsPage /></PageLayout>} />
                <Route path="/hu/portfolio/u4u-teen" element={<PageLayout><U4UTeenPage /></PageLayout>} />
                <Route path="/hu/portfolio/anna-pastry" element={<PageLayout><AnnaPastryPage /></PageLayout>} />
                <Route path="/hu/digital-products" element={<PageLayout><DigitalProductsPage /></PageLayout>} />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </Router>
      </EnhancedContentProvider>
    </LanguageProvider>
  );
}