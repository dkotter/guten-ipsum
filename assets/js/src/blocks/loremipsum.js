/* global wp, lodash */

import { get } from 'lodash';
import RenderIpsum from './render-content';

/**
 * Initialize the functionality.
 */
const init = () => {

	/**
	 * Internal block libraries
	 */
	const { registerBlockType } = wp.blocks;

	/**
	 * Register our block
	 */
	registerBlockType( 'gti/loremipsum', {
		title: 'Lorem Ipsum Content',
		icon: 'edit',
		category: 'widgets',

		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			}
		},

		edit( { setAttributes } ) {
			return (
				<RenderIpsum setAttributes={ setAttributes } />
			)
		},

		save( { attributes, className } ) {
			// Rendering in PHP
			return null;
		},
	} );

};

export default { init };
