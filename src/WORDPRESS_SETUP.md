# WordPress Headless CMS Setup Guide

## 🎯 Overview

This guide walks you through setting up WordPress as a headless CMS for your React site. Your beautiful animations and modern design will remain intact while WordPress manages your content.

## 🚀 Quick Start

1. **Copy environment variables**
   ```bash
   cp env.example .env
   ```

2. **Update your WordPress URL**
   ```bash
   # Edit .env file
   REACT_APP_WP_API_URL=https://admin.theignitingstudio.com
   ```

3. **Your site is now WordPress-powered!** 🎉

## 📋 WordPress Configuration

### Required WordPress Plugins

Install these plugins on your WordPress site:

```
✅ Contact Form 7 (for contact forms)
✅ Contact Form 7 REST API Extension
✅ Advanced Custom Fields (ACF) Pro (for custom fields)
✅ WordPress REST API Extensions (optional, for more features)
```

### Custom Post Types Setup

Add this code to your WordPress theme's `functions.php`:

```php
<?php
// Register Portfolio Custom Post Type
function create_portfolio_post_type() {
    register_post_type('portfolio',
        array(
            'labels' => array(
                'name' => 'Portfolio',
                'singular_name' => 'Portfolio Item',
                'add_new' => 'Add New Project',
                'add_new_item' => 'Add New Portfolio Item',
                'edit_item' => 'Edit Portfolio Item',
                'new_item' => 'New Portfolio Item',
                'view_item' => 'View Portfolio Item',
                'search_items' => 'Search Portfolio',
                'not_found' => 'No portfolio items found',
                'not_found_in_trash' => 'No portfolio items found in Trash'
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true, // Important for REST API
            'rest_base' => 'portfolio',
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
            'menu_icon' => 'dashicons-portfolio',
            'rewrite' => array('slug' => 'portfolio')
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
                'singular_name' => 'Service',
                'add_new' => 'Add New Service',
                'add_new_item' => 'Add New Service',
                'edit_item' => 'Edit Service',
                'new_item' => 'New Service',
                'view_item' => 'View Service',
                'search_items' => 'Search Services',
                'not_found' => 'No services found',
                'not_found_in_trash' => 'No services found in Trash'
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true,
            'rest_base' => 'services',
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
            'menu_icon' => 'dashicons-admin-tools',
            'rewrite' => array('slug' => 'services')
        )
    );
}
add_action('init', 'create_services_post_type');

// Enable ACF fields in REST API
add_filter('rest_prepare_portfolio', 'add_acf_to_rest_api', 10, 3);
add_filter('rest_prepare_services', 'add_acf_to_rest_api', 10, 3);
add_filter('rest_prepare_page', 'add_acf_to_rest_api', 10, 3);

function add_acf_to_rest_api($response, $post, $request) {
    if (function_exists('get_fields')) {
        $response->data['acf'] = get_fields($post->ID);
    }
    return $response;
}

// Add featured media URL to REST API
add_action('rest_api_init', 'add_featured_media_url');
function add_featured_media_url() {
    register_rest_field(array('post', 'page', 'portfolio', 'services'),
        'featured_media_url',
        array(
            'get_callback' => 'get_featured_media_url',
            'update_callback' => null,
            'schema' => array(
                'description' => 'Featured media URL',
                'type' => 'string',
                'format' => 'uri',
            ),
        )
    );
}

function get_featured_media_url($object, $field_name, $request) {
    $media_id = $object['featured_media'];
    if ($media_id) {
        return wp_get_attachment_image_url($media_id, 'full');
    }
    return '';
}
?>
```

### Advanced Custom Fields Setup

Create these field groups in ACF:

#### Portfolio Items Field Group
```
Field Group: Portfolio Details
Location: Post Type = Portfolio

Fields:
- project_type (Select): Social Media, Website Creation, Content Creation, Business Intelligence
- client_name (Text)
- project_date (Date Picker)
- project_url (URL)
- featured (True/False) - Mark as featured project
- gallery (Gallery) - Project images
- technologies (Repeater)
  - technology (Text)
- testimonial (Group)
  - quote (Textarea)
  - author (Text)
  - position (Text)
- bi_details (Group) - For Business Intelligence projects
  - overview (Textarea)
  - process (Textarea)
  - tools (Repeater)
    - tool (Text)
  - results (Textarea)
```

#### Services Field Group
```
Field Group: Service Details  
Location: Post Type = Services

Fields:
- service_price (Text)
- service_duration (Text)
- service_features (Repeater)
  - feature (Text)
- service_includes (Repeater)
  - include (Text)
- cta_text (Text)
- cta_url (URL)
```

## 🔧 Component Integration

### Replace Existing Components

Your existing components will be automatically replaced with WordPress-powered versions:

```typescript
// Before (Static data)
import { Portfolio } from './components/Portfolio';

// After (WordPress data)  
import { WordPressPortfolio } from './components/WordPressPortfolio';
```

### Available WordPress Components

```typescript
// Portfolio (already integrated)
<WordPressPortfolio />

// Contact Forms
<WordPressContactForm 
  formId={1} 
  title="Get In Touch"
  description="Ready to start your project?"
/>

// Services (create your own based on WordPressPortfolio pattern)
<WordPressServices />

// Pages
<WordPressPage slug="about" />
```

## 📊 Content Management

### Adding Portfolio Items

1. Go to WordPress Admin → Portfolio → Add New
2. Fill in the title, content, and excerpt
3. Set a featured image
4. Configure ACF fields:
   - **Project Type**: Choose service category
   - **Client Name**: Client or project name
   - **Project URL**: Link to live site (optional)
   - **Featured**: Check for hero/featured display
   - **Gallery**: Add project screenshots
   - **Testimonial**: Client feedback (optional)

### Managing Services

1. Go to WordPress Admin → Services → Add New
2. Fill in service details
3. Configure ACF fields for pricing, features, etc.

## 🌐 API Endpoints

Your WordPress site exposes these REST API endpoints:

```
GET /wp-json/wp/v2/portfolio     - All portfolio items
GET /wp-json/wp/v2/services      - All services  
GET /wp-json/wp/v2/pages         - All pages
GET /wp-json/wp/v2/posts         - All blog posts
GET /wp-json/wp/v2/media         - All media files
```

## 🔒 Security & Performance

### Enable CORS (if needed)

Add to your WordPress `functions.php`:

```php
// Enable CORS for your React domain
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://theignitingstudio.com');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});
```

### Caching

The React app automatically caches WordPress data for 5 minutes. You can adjust this in your environment variables:

```bash
REACT_APP_CACHE_DURATION=300000  # 5 minutes in milliseconds
```

## 🚨 Troubleshooting

### Common Issues

**WordPress API not accessible**
```bash
# Check if REST API is enabled
curl https://admin.theignitingstudio.com/wp-json/wp/v2/
```

**Custom post types not showing**  
- Ensure `show_in_rest => true` in post type registration
- Check if custom fields are properly exposed to REST API

**Images not loading**
- Verify featured images are set in WordPress
- Check CORS settings if loading from different domain

**Contact forms not working**
- Install Contact Form 7 REST API Extension
- Verify form ID matches your WordPress setup

## 📱 Development vs Production

### Development Mode
- Shows debug information
- Uses fallback data if WordPress unavailable
- Displays cache statistics

### Production Mode
- Clean user experience
- Graceful error handling
- Optimized caching

## 🎉 Next Steps

1. **Set up WordPress**: Install plugins and configure custom post types
2. **Add content**: Create your first portfolio items and services
3. **Test integration**: Verify data flows from WordPress to React
4. **Deploy**: Your headless CMS is ready!

## 💡 Tips

- **Content Strategy**: Plan your content structure before building
- **SEO**: Consider adding Yoast SEO plugin for better SEO management
- **Backups**: Set up regular WordPress backups
- **Security**: Keep WordPress and plugins updated
- **Performance**: Consider WordPress caching plugins like WP Rocket

Your React site now has the power of WordPress content management while maintaining its modern, animated user experience! 🚀