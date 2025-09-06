# Headless WordPress Integration Setup for The Igniting Studio

## Overview

This guide will help you set up your React application as a headless WordPress frontend. Your React app will continue to work exactly as it does now, but will fetch content from WordPress when available, falling back gracefully to demo content when WordPress is not connected.

## Architecture

```
WordPress Backend (admin.theignitingstudio.com) ← REST API → React Frontend (theignitingstudio.com)
```

## 1. WordPress Backend Setup

### 1.1 WordPress Installation
1. Install WordPress on a subdomain: `admin.theignitingstudio.com`
2. Install required plugins:
   - **Advanced Custom Fields (ACF) Pro** - For custom fields
   - **WPML** or **Polylang** - For multi-language support
   - **Contact Form 7** - For contact forms
   - **Custom Post Type UI** - For portfolio and services post types
   - **WP REST API** - Usually included in WordPress core
   - **Yoast SEO** - For SEO optimization

### 1.2 Custom Post Types Setup
Add this to your theme's `functions.php` or create a custom plugin:

```php
// Register Portfolio Custom Post Type
function create_portfolio_post_type() {
    register_post_type('portfolio',
        array(
            'labels' => array(
                'name' => 'Portfolio Items',
                'singular_name' => 'Portfolio Item'
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true, // Enable REST API
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
            'taxonomies' => array('portfolio_category', 'portfolio_tag')
        )
    );
}
add_action('init', 'create_portfolio_post_type');

// Register Services Custom Post Type
function create_services_post_type() {
    register_post_type('services',
        array(
            'labels' => array(
                'name' => 'Services',
                'singular_name' => 'Service'
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true, // Enable REST API
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields')
        )
    );
}
add_action('init', 'create_services_post_type');

// Enable CORS for your React app domain
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: https://theignitingstudio.com");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('init','add_cors_http_header');

// Expose ACF fields in REST API
add_filter('acf/settings/rest_api_format', function () {
    return 'standard';
});
```

### 1.3 ACF Field Groups Setup

#### Portfolio Fields
- **Project URL** (Text) - `project_url`
- **Client Name** (Text) - `client_name`
- **Project Type** (Text) - `project_type`
- **Project Type HU** (Text) - `project_type_hu`
- **Completion Date** (Date) - `completion_date`
- **Technologies** (Repeater with Text subfield) - `technologies`
- **Gallery** (Gallery) - `gallery`
- **Testimonial** (Group):
  - Content (Textarea) - `content`
  - Content HU (Textarea) - `content_hu`
  - Author (Text) - `author`
  - Position (Text) - `position`
  - Position HU (Text) - `position_hu`

#### Services Fields
- **Service Price** (Text) - `service_price`
- **Service Price HU** (Text) - `service_price_hu`
- **Service Features** (Repeater with Text) - `service_features`
- **Service Features HU** (Repeater with Text) - `service_features_hu`
- **Service Duration** (Text) - `service_duration`
- **Service Duration HU** (Text) - `service_duration_hu`
- **Service Icon** (Text) - `service_icon`
- **CTA Text** (Text) - `cta_text`
- **CTA Text HU** (Text) - `cta_text_hu`
- **CTA URL** (URL) - `cta_url`

#### Blog Post Fields
- **Read Time** (Number) - `read_time`
- **Featured Post** (True/False) - `featured_post`
- **Author Bio** (Textarea) - `author_bio`
- **Author Bio HU** (Textarea) - `author_bio_hu`
- **SEO Title** (Text) - `seo_title`
- **SEO Description** (Textarea) - `seo_description`

#### Site Settings (Options Page)
Create an ACF Options page for global settings:
- **Contact Email** (Email) - `contact_email`
- **Contact Phone** (Text) - `contact_phone`
- **Contact Address** (Textarea) - `contact_address`
- **Contact Address HU** (Textarea) - `contact_address_hu`
- **Business Hours** (Textarea) - `business_hours`
- **Business Hours HU** (Textarea) - `business_hours_hu`
- **Social Media** (Group):
  - Facebook (URL) - `facebook`
  - Instagram (URL) - `instagram`
  - LinkedIn (URL) - `linkedin`
  - Twitter (URL) - `twitter`

## 2. React App Environment Configuration

### 2.1 Environment Variables
Update your `.env` file:

```env
# WordPress API Configuration
REACT_APP_WP_API_URL=https://admin.theignitingstudio.com
REACT_APP_WP_SITE_URL=https://theignitingstudio.com

# Development vs Production
REACT_APP_ENVIRONMENT=production

# Contact Form 7 ID (get this from WordPress admin)
REACT_APP_CONTACT_FORM_ID=1

# Enable/disable WordPress features
REACT_APP_USE_WORDPRESS=true
REACT_APP_ENABLE_BLOG=true
REACT_APP_ENABLE_COMMENTS=false
```

### 2.2 WordPress API Configuration Update

Your WordPress API service is already configured! The `enhanced-wordpress-api.ts` handles all the WordPress integration with proper error handling and fallbacks.

## 3. Deployment Options

### Option A: Separate Hosting (Recommended)

**WordPress Backend:**
- Host on: `admin.theignitingstudio.com`
- Platform: Traditional WordPress hosting (SiteGround, WP Engine, etc.)
- Database: MySQL/MariaDB
- SSL Certificate required

**React Frontend:**
- Host on: `theignitingstudio.com`
- Platform: Vercel, Netlify, or Cloudflare Pages
- Build command: `npm run build`
- Deploy directory: `build` or `dist`

### Option B: Same Server Deployment

If you prefer hosting both on the same server:

```
your-server.com/
├── admin/          (WordPress installation)
├── public/         (React build files)
└── api/            (Optional: additional APIs)
```

## 4. WordPress Configuration Steps

### 4.1 WordPress Admin Setup

1. **Install WordPress** on `admin.theignitingstudio.com`

2. **Install Required Plugins:**
```bash
# Via WP-CLI (if available)
wp plugin install advanced-custom-fields-pro --activate
wp plugin install polylang --activate
wp plugin install contact-form-7 --activate
wp plugin install custom-post-type-ui --activate
```

3. **Configure Permalinks:**
   - Go to Settings → Permalinks
   - Set to "Post name" structure: `/%postname%/`

4. **Set up Multi-language (Polylang):**
   - Languages → Add new language
   - Add English (en) and Hungarian (hu)
   - Set URL modifications: "The language is set from different domains"
   - Or use subdirectories: `/en/` and `/hu/`

### 4.2 Custom Fields Setup

Use the ACF field groups defined in section 1.3. Import this JSON configuration:

```json
{
  "field_groups": [
    {
      "key": "group_portfolio",
      "title": "Portfolio Fields",
      "fields": [
        {
          "key": "field_project_url",
          "label": "Project URL",
          "name": "project_url",
          "type": "url"
        },
        {
          "key": "field_client_name",
          "label": "Client Name",
          "name": "client_name",
          "type": "text"
        }
      ],
      "location": [
        [
          {
            "param": "post_type",
            "operator": "==",
            "value": "portfolio"
          }
        ]
      ]
    }
  ]
}
```

### 4.3 Contact Form 7 Setup

1. Create a contact form in WordPress admin
2. Note the form ID (usually 1 for the first form)
3. Update your `.env` file: `REACT_APP_CONTACT_FORM_ID=1`

Example Contact Form 7 shortcode:
```
[text* your-name placeholder "Your Name"]
[email* your-email placeholder "Your Email"]
[text your-subject placeholder "Subject"]
[textarea* your-message placeholder "Your Message"]
[submit "Send Message"]
```

## 5. Content Migration & Setup

### 5.1 Initial Content Creation

Create the following content in WordPress:

**Pages:**
- Home (slug: `home`)
- About (slug: `about`)
- Contact (slug: `contact`)

**Portfolio Items:**
- Frank Bordoni Recipes
- PureGems
- U4U Teen
- Anna Pastry

**Services:**
- Social Media Management
- Website Creation
- Content Creation
- Business Intelligence

**Blog Posts:**
- Create 3-5 initial blog posts
- Mark some as "Featured" using ACF

### 5.2 Multi-language Content

For each piece of content:
1. Create English version
2. Use Polylang to create Hungarian translation
3. Ensure ACF fields have both EN and HU versions where needed

## 6. React App Integration

### 6.1 Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp env.example .env
```

2. Update the values:
```env
REACT_APP_WP_API_URL=https://admin.theignitingstudio.com
REACT_APP_WP_SITE_URL=https://theignitingstudio.com
REACT_APP_USE_WORDPRESS=true
REACT_APP_CONTACT_FORM_ID=1
```

### 6.2 Testing the Integration

1. **Start your React app:**
```bash
npm start
```

2. **Check WordPress connection:**
   - Look for the WordPress Connection Status indicator (bottom-right)
   - Green = Connected to WordPress
   - Red = Using demo content

3. **Verify content loading:**
   - Portfolio section should show WordPress content
   - Services should load from WordPress
   - Blog should display WordPress posts

## 7. Deployment Process

### 7.1 WordPress Backend Deployment

1. **Deploy WordPress to `admin.theignitingstudio.com`**
2. **Configure SSL certificate**
3. **Test REST API endpoints:**
   - `https://admin.theignitingstudio.com/wp-json/wp/v2/posts`
   - `https://admin.theignitingstudio.com/wp-json/wp/v2/portfolio`
   - `https://admin.theignitingstudio.com/wp-json/wp/v2/services`

### 7.2 React Frontend Deployment

**For Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Variables in Vercel:**
- Add all your `.env` variables to Vercel project settings
- Set `REACT_APP_ENVIRONMENT=production`
- Set `REACT_APP_SHOW_WP_STATUS=false` (hides status indicator in production)

**For Netlify:**
```bash
# Build locally
npm run build

# Deploy build folder to Netlify
```

### 7.3 DNS Configuration

Point your domain to the React app:
```
theignitingstudio.com → Vercel/Netlify
admin.theignitingstudio.com → WordPress hosting
```

## 8. Testing & Verification

### 8.1 API Endpoint Tests

Test these WordPress REST API endpoints:

```bash
# Basic WordPress info
curl https://admin.theignitingstudio.com/wp-json/wp/v2/

# Portfolio items
curl https://admin.theignitingstudio.com/wp-json/wp/v2/portfolio

# Services
curl https://admin.theignitingstudio.com/wp-json/wp/v2/services

# Blog posts
curl https://admin.theignitingstudio.com/wp-json/wp/v2/posts

# Site settings
curl https://admin.theignitingstudio.com/wp-json/wp/v2/settings
```

### 8.2 Multi-language Testing

Test language-specific endpoints:
```bash
# English content
curl https://admin.theignitingstudio.com/wp-json/wp/v2/posts?lang=en

# Hungarian content
curl https://admin.theignitingstudio.com/wp-json/wp/v2/posts?lang=hu
```

### 8.3 Frontend Testing

1. **Test language switching:**
   - Switch between EN/HU
   - Verify content updates
   - Check URL structure

2. **Test WordPress content:**
   - Portfolio items display
   - Services load correctly
   - Blog posts show
   - Contact form works

3. **Test fallback behavior:**
   - Temporarily disable WordPress
   - Verify demo content displays
   - Check error handling

## 9. Ongoing Maintenance

### 9.1 Content Updates

- WordPress admin: `admin.theignitingstudio.com/wp-admin`
- React app automatically fetches new content
- Cache refreshes every 5 minutes by default

### 9.2 WordPress Updates

- Keep WordPress core updated
- Update plugins regularly
- Monitor REST API functionality

### 9.3 Performance Monitoring

- Use WordPress Connection Status indicator
- Monitor API response times
- Check cache efficiency

## 10. Troubleshooting

### Common Issues

**1. CORS Errors:**
- Ensure CORS headers are set in WordPress
- Check domain whitelist

**2. API Not Found:**
- Verify WordPress REST API is enabled
- Check permalink structure
- Confirm custom post types have `show_in_rest: true`

**3. Missing Content:**
- Check ACF field exposure in REST API
- Verify multi-language plugin configuration
- Confirm content is published (not draft)

**4. Slow Loading:**
- Optimize WordPress hosting
- Enable WordPress caching
- Consider CDN for media files

### Debug Mode

Enable debug mode in React:
```env
REACT_APP_DEBUG_MODE=true
REACT_APP_SHOW_ERRORS=true
```

This will show detailed error information in the WordPress Connection Status indicator.

## Summary

Your React application is already perfectly configured for headless WordPress! The setup includes:

✅ **WordPress API Services** - Already implemented  
✅ **Multi-language Support** - Built-in with Hungarian/English  
✅ **Graceful Fallbacks** - Demo content when WordPress unavailable  
✅ **Modern React Architecture** - Hooks, Context, TypeScript  
✅ **Performance Optimized** - Caching, error handling  
✅ **Production Ready** - Environment configuration, monitoring  

Simply follow the WordPress backend setup steps above, configure your environment variables, and deploy both parts. Your React app will automatically start using WordPress content while maintaining all its current functionality and performance.
