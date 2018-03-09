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

	register_block_type( 'gti/hello-world', array(
		'editor_script' => 'blocks',
	) );
}
add_action( 'init', 'gti_register_blocks' );
