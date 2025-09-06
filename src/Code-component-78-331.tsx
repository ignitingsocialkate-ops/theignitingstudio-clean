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
