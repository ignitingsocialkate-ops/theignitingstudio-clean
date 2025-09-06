# The Igniting Studio - Modern React Website

A stunning, modern website built with React, TypeScript, and Tailwind CSS, featuring beautiful animations and WordPress CMS integration.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Your site is running!** 🎉
   - The portfolio automatically loads with demo data
   - All animations and modern effects are working
   - WordPress integration is ready (see below)

## ✨ Features

- **🎨 Modern Design** - Clean, professional aesthetic with brand colors
- **⚡ Smooth Animations** - Motion-powered transitions and effects
- **📱 Fully Responsive** - Perfect on desktop, tablet, and mobile
- **🔗 WordPress Ready** - Headless CMS integration for easy content management
- **🎯 Performance Optimized** - Fast loading with smart caching
- **🛡️ Type Safe** - Built with TypeScript for reliability

## 🎬 Current State

**✅ Working Out of the Box:**
- Portfolio section with demo projects
- Contact forms ready for integration
- All animations and visual effects
- Responsive design across all devices
- Modern component architecture

**📝 Content Management Options:**

### Option 1: Use as Static Site (Current)
- Portfolio shows demo projects (Frank Bordoni, PureGems, etc.)
- All content is code-based
- Perfect for immediate deployment

### Option 2: Connect WordPress CMS
- Edit portfolio through WordPress admin
- Manage all content dynamically
- See `WORDPRESS_SETUP.md` for full instructions

## 🔧 WordPress Integration

The site includes a complete WordPress headless CMS setup:

### To Enable WordPress:

1. **Set up environment**
   ```bash
   cp env.example .env
   # Edit .env with your WordPress URL
   ```

2. **Configure WordPress**
   - Follow instructions in `WORDPRESS_SETUP.md`
   - Install required plugins (ACF, Contact Form 7)
   - Set up custom post types

3. **Content automatically syncs**
   - Portfolio items from WordPress
   - Contact forms connected
   - Smart fallbacks if WordPress unavailable

### WordPress Components Available:
- `<WordPressPortfolio />` - Dynamic portfolio
- `<WordPressContactForm />` - Contact Form 7 integration
- Full API service for any content type

## 📁 Project Structure

```
├── components/          # React components
│   ├── WordPressPortfolio.tsx    # CMS-powered portfolio
│   ├── WordPressContactForm.tsx  # CMS-powered forms
│   └── ...             # All other components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── services/           # API services (WordPress)
├── styles/             # Tailwind CSS configuration
└── WORDPRESS_SETUP.md  # Complete CMS setup guide
```

## 🎨 Customization

### Brand Colors (Already Applied)
- **Primary Gold**: `#d49d43`
- **Cream Background**: `#f2f1e5`
- **Dark Brown**: `#2c2927`

### Typography
- **Headings**: DM Serif Display
- **Body**: Poppins
- **Accent**: Alice

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Scroll-triggered animations
- Particle effects and background animations

## 🚀 Deployment

### Static Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the build folder
```

### With WordPress
1. Deploy WordPress site first
2. Update environment variables
3. Deploy React app

## 🔗 Links & Resources

- **WordPress Setup**: See `WORDPRESS_SETUP.md`
- **Environment Config**: See `env.example`
- **Component Documentation**: Each component is self-documenting

## 📞 Support

The site is ready to use immediately with demo content. For WordPress integration or customization, follow the setup guides or contact support.

---

**✨ Your modern, animated website is ready to ignite your brand's potential!**