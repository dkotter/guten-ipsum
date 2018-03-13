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
	const { RangeControl, SelectControl } = wp.components;

	const serviceOptions = [
		{ value: 'bacon-ipsum', label: 'BaconIpsum.com' },
		{ value: 'baseball-ipsum', label: 'BaseballIpsum.com' },
		{ value: 'pony-ipsum', label: 'PonyIpsum.com' },
	];

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
			service: {
				type: 'string',
				default: 'bacon-ipsum',
			},
			paragraphs: {
				type: 'number',
				default: 5
			}
		},

		edit( { attributes, setAttributes, isSelected } ) {
			const { paragraphs, service } = attributes;
			const inspectorControls = isSelected && (
					<InspectorControls key="inspector">
						<SelectControl
							label={ 'Lorem Ipsum Service' }
							value={ service }
							options={ serviceOptions }
							onChange={ ( value ) => setAttributes( { service: value } ) }
						/>
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
				<RenderIpsum service={ service } paragraphs={ paragraphs } setAttributes={ setAttributes } />
			]
		},

		save() {
			// Rendering in PHP
			return null;
		},
	} );

};

export default { init };
