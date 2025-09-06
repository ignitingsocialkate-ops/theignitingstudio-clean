<?php
// Add this to your WordPress theme's functions.php file

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

// Enable CORS for your React app
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('init','add_cors_http_header');

// Expose custom fields in REST API
add_filter('rest_prepare_portfolio', function($response, $post) {
    $response->data['acf'] = array(
        'project_url' => get_post_meta($post->ID, 'project_url', true),
        'client_name' => get_post_meta($post->ID, 'client_name', true),
        'project_type' => get_post_meta($post->ID, 'project_type', true),
        'technologies' => explode(',', get_post_meta($post->ID, 'technologies', true))
    );
    return $response;
}, 10, 2);

add_filter('rest_prepare_services', function($response, $post) {
    $response->data['acf'] = array(
        'service_price' => get_post_meta($post->ID, 'service_price', true),
        'service_duration' => get_post_meta($post->ID, 'service_duration', true),
        'service_features' => explode("\n", get_post_meta($post->ID, 'service_features', true))
    );
    return $response;
}, 10, 2);
?>