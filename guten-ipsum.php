<?php
/*
Plugin Name: Guten Ipsum
Description: Lorem Ipsum Gutenberg Block
Author: Darin Kotter
Author URI: https://darinkotter.com
Version: 0.1.0
License: GPL2+
*/

/**
 * Register our block
 *
 * @return void
 */
function gti_register_blocks() {
	wp_register_script(
		'blocks',
		plugins_url( 'assets/js/dist/blocks.bundle.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
	);

	register_block_type( 'gti/loremipsum', array(
		'editor_script'   => 'blocks',
		'render_callback' => 'gti_render_callback'
	) );
}
add_action( 'init', 'gti_register_blocks' );

/**
 * Render the block for the front end.
 *
 * TODO: Have this render all in JS, so we don't
 * have this extra HTTP request.
 *
 * @param array $attributes Block attributes
 * @return string
 */
function gti_render_callback( $attributes ) {
	$output   = '';
	$response = wp_remote_request( 'https://baconipsum.com/api/?type=meat-and-filler' );

	if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
		return $output;
	}

	$body    = wp_remote_retrieve_body( $response );
	$content = json_decode( $body );

	foreach ( $content as $p ) {
		$output .= "<p>{$p}</p>";
	}

	return wp_kses_post( $output );
}
