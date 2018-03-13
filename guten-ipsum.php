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
		array( 'wp-blocks', 'wp-element' ),
		'0.1.0'
	);

	register_block_type( 'gti/loremipsum', array(
		'attributes'      => array(
			'paragraphs'  => array(
				'type'    => 'number',
				'default' => 5,
			),
			'service'     => array(
				'type'    => 'string',
				'default' => 'bacon-ipsum',
			)
		),
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
	$service    = $attributes['service'] ?: 'bacon-ipsum';
	$paragraphs = $attributes['paragraphs'] ?: 5;
	$url        = '';

	switch ( $service ) {
		case 'bacon-ipsum':
			$url = 'https://baconipsum.com/api/?type=meat-and-filler&paras=' . absint( $paragraphs );
			break;
		case 'baseball-ipsum':
			$url = 'http://baseballipsum.apphb.com/api/?paras=' . absint( $paragraphs );
			break;
		case 'pony-ipsum':
			$url = 'http://ponyipsum.com/api/?type=pony-and-filler&paras=' . absint( $paragraphs );
			break;
	}

	$cache_key = md5( $url );
	$output    = get_transient( $cache_key );

	if ( empty( $output ) ) {
		$response = wp_remote_request( $url );

		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return $output;
		}

		$body    = wp_remote_retrieve_body( $response );
		$content = json_decode( $body );

		foreach ( $content as $p ) {
			$output .= "<p>{$p}</p>";
		}

		set_transient( $cache_key, $output, DAY_IN_SECONDS );
	}

	return wp_kses_post( $output );
}
