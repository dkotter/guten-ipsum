/* global wp */

import RenderIpsum from './render-content';

/**
 * Initialize the functionality.
 */
const init = () => {

	/**
	 * Internal block libraries
	 */
	const { registerBlockType, InspectorControls } = wp.blocks;
	const { RangeControl } = wp.components;

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
			},
			paragraphs: {
				type: 'number',
				default: 5
			}
		},

		edit( { attributes, setAttributes, isSelected } ) {
			const { paragraphs } = attributes;
			const inspectorControls = isSelected && (
					<InspectorControls key="inspector">
						<RangeControl
							label={ 'Number of paragraphs' }
							value={ paragraphs }
							onChange={ ( value ) => setAttributes( { paragraphs: value } ) }
							min={ 1 }
							max={ 20 }
						/>
					</InspectorControls>
			);

			return [
				inspectorControls,
				<RenderIpsum paragraphs={ paragraphs } setAttributes={ setAttributes } />
			]
		},

		save() {
			// Rendering in PHP
			return null;
		},
	} );

};

export default { init };
