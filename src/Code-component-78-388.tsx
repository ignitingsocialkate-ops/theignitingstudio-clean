# WordPress Theme Setup Guide

## 1. Theme Folder Structure

Upload these files to your WordPress hosting at `/wp-content/themes/igniting-studio/`:

```
wp-content/themes/igniting-studio/
├── style.css (theme header)
├── functions.php (main PHP functions)
├── index.php (main template)
├── header.php
├── footer.php
├── single.php (blog post template)
├── page.php (page template)
├── archive-portfolio.php (portfolio archive)
├── single-portfolio.php (portfolio single)
├── archive-services.php (services archive)
├── single-services.php (services single)
└── assets/
    ├── css/
    │   └── main.css (compiled from your React CSS)
    └── js/
        └── main.js (compiled from your React components)
```

## 2. Required PHP Files

### style.css (Theme Header)
```css
/*
Theme Name: The Igniting Studio
Description: Modern React-powered WordPress theme
Version: 1.0
Author: The Igniting Studio
*/

/* Your compiled CSS goes here */
```

### functions.php
Copy the PHP code from `wordpress-theme-conversion.php`

### index.php (Main Template)
```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div id="root">
        <!-- Your React app will mount here -->
        <div class="loading">Loading...</div>
    </div>
    <?php wp_footer(); ?>
</body>
</html>
```

### header.php
```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
```

### footer.php
```php
    <?php wp_footer(); ?>
</body>
</html>
```

## 3. Converting React Components to Work in WordPress

Your React components need small modifications to work with WordPress data:

### Updated WordPress API Service
```javascript
// Instead of environment variables, use WordPress localized data
const wpData = window.wpData || {};

class WordPressThemeAPI {
    constructor() {
        this.apiUrl = wpData.apiUrl || '/wp-json/wp/v2';
        this.nonce = wpData.nonce;
    }
    
    async fetchAPI(endpoint) {
        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            headers: {
                'X-WP-Nonce': this.nonce
            }
        });
        return response.json();
    }
    
    // Your existing methods...
}
```

## 4. Deployment Steps

### Step A: Export from Figma Make
1. Export your project files from Figma Make
2. Extract the ZIP file

### Step B: Prepare Theme Files
1. Create the folder structure above
2. Copy your CSS to `assets/css/main.css`
3. Compile your React components into `assets/js/main.js`
4. Add the PHP files

### Step C: Upload to WordPress
1. Upload the theme folder via FTP or hosting file manager
2. Go to WordPress Admin → Appearance → Themes
3. Activate "The Igniting Studio" theme

### Step D: Configure WordPress
1. Install required plugins:
   - Contact Form 7
   - Polylang (for Hungarian/English)
2. Create your content:
   - Portfolio items
   - Services
   - Blog posts

## 5. Content Creation in WordPress

### Create Portfolio Items:
1. Go to Portfolio → Add New
2. Fill in:
   - Title: "Frank Bordoni Recipes"
   - Content: Project description
   - Featured Image: Project screenshot
   - Custom Fields: Project URL, Client Name, etc.

### Create Services:
1. Go to Services → Add New
2. Fill in:
   - Title: "Social Media Management"
   - Content: Service description
   - Custom Fields: Price, Duration, Features

### Create Blog Posts:
1. Go to Posts → Add New
2. Create your blog content
3. Set featured images
4. Mark some as "Featured" if desired

## 6. Multi-language Setup (Polylang)

### Install Polylang:
1. Install Polylang plugin
2. Go to Languages → Languages
3. Add English and Hungarian
4. Set URL structure (example: `/en/` and `/hu/`)

### Translate Content:
1. Edit any post/page
2. Use Polylang meta box to create translations
3. Your React app will automatically detect language from URL

## 7. Testing Your Setup

### Check These URLs:
- `yoursite.com/` - Homepage
- `yoursite.com/portfolio/` - Portfolio archive
- `yoursite.com/services/` - Services archive
- `yoursite.com/blog/` - Blog archive
- `yoursite.com/hu/` - Hungarian homepage

### Verify WordPress API:
- `yoursite.com/wp-json/wp/v2/portfolio`
- `yoursite.com/wp-json/wp/v2/services`
- `yoursite.com/wp-json/wp/v2/posts`

## 8. Alternative: Keep Your Figma Make App + WordPress Backend

If theme conversion seems complex, you can:

### Option A: Deploy React App to Subdomain
1. Export from Figma Make
2. Deploy to Vercel/Netlify at `app.theignitingstudio.com`
3. Keep WordPress at `admin.theignitingstudio.com`
4. Point main domain to React app

### Option B: Use WordPress Plugin for React
1. Install a plugin like "ReactPress"
2. Upload your React build files
3. Configure the plugin to serve your React app

## 9. Quick Start Checklist

- [ ] Export code from Figma Make
- [ ] Create WordPress theme structure
- [ ] Upload theme files to hosting
- [ ] Activate theme in WordPress
- [ ] Install required plugins
- [ ] Create portfolio/services content
- [ ] Set up multi-language
- [ ] Test all pages and API endpoints
- [ ] Configure contact forms
- [ ] Set up social media links

Your site will work exactly like it does in Figma Make, but powered by WordPress content management!