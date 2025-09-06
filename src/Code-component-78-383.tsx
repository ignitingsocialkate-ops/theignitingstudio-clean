<?php
/**
 * Theme Name: The Igniting Studio
 * Description: Modern React-powered WordPress theme for The Igniting Studio
 * Version: 1.0
 * Author: The Igniting Studio
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class IgnitingStudioTheme {
    
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_action('after_setup_theme', array($this, 'theme_setup'));
        add_action('init', array($this, 'register_custom_post_types'));
        add_action('init', array($this, 'register_custom_fields'));
        add_filter('rest_pre_serve_request', array($this, 'enable_cors'), 10, 4);
    }
    
    /**
     * Enqueue theme assets (CSS/JS from React build)
     */
    public function enqueue_assets() {
        // Main stylesheet (compiled from React)
        wp_enqueue_style(
            'igniting-studio-main',
            get_template_directory_uri() . '/assets/css/main.css',
            array(),
            '1.0.0'
        );
        
        // Main JavaScript (compiled from React)
        wp_enqueue_script(
            'igniting-studio-main',
            get_template_directory_uri() . '/assets/js/main.js',
            array(),
            '1.0.0',
            true
        );
        
        // Localize script for WordPress data
        wp_localize_script('igniting-studio-main', 'wpData', array(
            'apiUrl' => home_url('/wp-json/wp/v2/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'currentLanguage' => get_locale(),
            'homeUrl' => home_url(),
            'themeUrl' => get_template_directory_uri(),
            'contactFormId' => get_option('igniting_studio_contact_form_id', 1),
            'settings' => $this->get_theme_settings()
        ));
    }
    
    /**
     * Theme setup
     */
    public function theme_setup() {
        // Add theme support
        add_theme_support('post-thumbnails');
        add_theme_support('title-tag');
        add_theme_support('custom-logo');
        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));
        
        // Register menus
        register_nav_menus(array(
            'primary' => __('Primary Menu'),
            'footer' => __('Footer Menu'),
        ));
    }
    
    /**
     * Register Custom Post Types
     */
    public function register_custom_post_types() {
        // Portfolio Post Type
        register_post_type('portfolio', array(
            'labels' => array(
                'name' => 'Portfolio Items',
                'singular_name' => 'Portfolio Item'
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
            'rewrite' => array('slug' => 'portfolio'),
        ));
        
        // Services Post Type
        register_post_type('services', array(
            'labels' => array(
                'name' => 'Services',
                'singular_name' => 'Service'
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
            'rewrite' => array('slug' => 'services'),
        ));
    }
    
    /**
     * Register Custom Fields (ACF alternative)
     */
    public function register_custom_fields() {
        // This would integrate with ACF if available
        // Or you can use WordPress custom fields
        
        // Add meta boxes for portfolio
        add_action('add_meta_boxes', function() {
            add_meta_box(
                'portfolio_details',
                'Portfolio Details',
                array($this, 'portfolio_meta_box'),
                'portfolio',
                'normal',
                'high'
            );
            
            add_meta_box(
                'service_details',
                'Service Details', 
                array($this, 'service_meta_box'),
                'services',
                'normal',
                'high'
            );
        });
        
        // Save meta box data
        add_action('save_post', array($this, 'save_custom_fields'));
    }
    
    /**
     * Portfolio Meta Box
     */
    public function portfolio_meta_box($post) {
        wp_nonce_field('portfolio_meta_box', 'portfolio_meta_box_nonce');
        
        $project_url = get_post_meta($post->ID, 'project_url', true);
        $client_name = get_post_meta($post->ID, 'client_name', true);
        $project_type = get_post_meta($post->ID, 'project_type', true);
        $technologies = get_post_meta($post->ID, 'technologies', true);
        
        ?>
        <table class="form-table">
            <tr>
                <th><label for="project_url">Project URL</label></th>
                <td><input type="url" id="project_url" name="project_url" value="<?php echo esc_attr($project_url); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="client_name">Client Name</label></th>
                <td><input type="text" id="client_name" name="client_name" value="<?php echo esc_attr($client_name); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="project_type">Project Type</label></th>
                <td><input type="text" id="project_type" name="project_type" value="<?php echo esc_attr($project_type); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="technologies">Technologies (comma-separated)</label></th>
                <td><textarea id="technologies" name="technologies" rows="3" class="large-text"><?php echo esc_textarea($technologies); ?></textarea></td>
            </tr>
        </table>
        <?php
    }
    
    /**
     * Service Meta Box
     */
    public function service_meta_box($post) {
        wp_nonce_field('service_meta_box', 'service_meta_box_nonce');
        
        $price = get_post_meta($post->ID, 'service_price', true);
        $duration = get_post_meta($post->ID, 'service_duration', true);
        $features = get_post_meta($post->ID, 'service_features', true);
        
        ?>
        <table class="form-table">
            <tr>
                <th><label for="service_price">Price</label></th>
                <td><input type="text" id="service_price" name="service_price" value="<?php echo esc_attr($price); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="service_duration">Duration</label></th>
                <td><input type="text" id="service_duration" name="service_duration" value="<?php echo esc_attr($duration); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="service_features">Features (one per line)</label></th>
                <td><textarea id="service_features" name="service_features" rows="5" class="large-text"><?php echo esc_textarea($features); ?></textarea></td>
            </tr>
        </table>
        <?php
    }
    
    /**
     * Save Custom Fields
     */
    public function save_custom_fields($post_id) {
        // Skip if this is an autosave
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        
        // Skip if user doesn't have permission
        if (!current_user_can('edit_post', $post_id)) return;
        
        // Portfolio fields
        if (isset($_POST['portfolio_meta_box_nonce']) && wp_verify_nonce($_POST['portfolio_meta_box_nonce'], 'portfolio_meta_box')) {
            if (isset($_POST['project_url'])) update_post_meta($post_id, 'project_url', sanitize_url($_POST['project_url']));
            if (isset($_POST['client_name'])) update_post_meta($post_id, 'client_name', sanitize_text_field($_POST['client_name']));
            if (isset($_POST['project_type'])) update_post_meta($post_id, 'project_type', sanitize_text_field($_POST['project_type']));
            if (isset($_POST['technologies'])) update_post_meta($post_id, 'technologies', sanitize_textarea_field($_POST['technologies']));
        }
        
        // Service fields
        if (isset($_POST['service_meta_box_nonce']) && wp_verify_nonce($_POST['service_meta_box_nonce'], 'service_meta_box')) {
            if (isset($_POST['service_price'])) update_post_meta($post_id, 'service_price', sanitize_text_field($_POST['service_price']));
            if (isset($_POST['service_duration'])) update_post_meta($post_id, 'service_duration', sanitize_text_field($_POST['service_duration']));
            if (isset($_POST['service_features'])) update_post_meta($post_id, 'service_features', sanitize_textarea_field($_POST['service_features']));
        }
    }
    
    /**
     * Enable CORS for API
     */
    public function enable_cors($served, $result, $request, $server) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $served;
    }
    
    /**
     * Get theme settings for JavaScript
     */
    private function get_theme_settings() {
        return array(
            'siteName' => get_bloginfo('name'),
            'siteDescription' => get_bloginfo('description'),
            'contactEmail' => get_option('admin_email'),
            'socialMedia' => array(
                'facebook' => get_option('igniting_studio_facebook'),
                'instagram' => get_option('igniting_studio_instagram'),
                'linkedin' => get_option('igniting_studio_linkedin'),
            ),
        );
    }
}

// Initialize the theme
new IgnitingStudioTheme();

// REST API Extensions
add_action('rest_api_init', function() {
    // Add custom fields to REST API responses
    register_rest_field('portfolio', 'acf', array(
        'get_callback' => function($post) {
            return array(
                'project_url' => get_post_meta($post['id'], 'project_url', true),
                'client_name' => get_post_meta($post['id'], 'client_name', true),
                'project_type' => get_post_meta($post['id'], 'project_type', true),
                'technologies' => explode(',', get_post_meta($post['id'], 'technologies', true)),
            );
        }
    ));
    
    register_rest_field('services', 'acf', array(
        'get_callback' => function($post) {
            return array(
                'service_price' => get_post_meta($post['id'], 'service_price', true),
                'service_duration' => get_post_meta($post['id'], 'service_duration', true),
                'service_features' => explode("\n", get_post_meta($post['id'], 'service_features', true)),
            );
        }
    ));
});

?>