import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

const { Component } = wp.element;

/**
 * Create our render component
 */
class RenderIpsum extends Component {
	constructor( props ) {
		super( props );

		this.state = { data: _get( this.props, 'data', [] ) };
	}

	/**
	 * Get our data when the component loads
	 */
	componentDidMount() {
		this.getData();
	}

	/**
	 * When the props of a component changes, update our data.
	 *
	 * @param prevProps
	 * @param prevState
	 */
	componentDidUpdate( prevProps, prevState ) {
		if ( ! _isEqual( _get( prevProps, 'paragraphs' ), _get( this.props, 'paragraphs' ) ) ) {
			this.setState( { data: [] } );
			this.getData();
		}

		if ( ! _isEqual( _get( prevProps, 'service' ), _get( this.props, 'service' ) ) ) {
			this.setState( { data: [] } );
			this.getData();
		}
	}

	/**
	 * Run an AJAX request to get the data and set the state
	 */
	getData() {
		const service = this.props.service;
		let url       = '';

		switch ( service ) {
			case 'bacon-ipsum':
				url = 'https://baconipsum.com/api/?type=meat-and-filler&paras=' + this.props.paragraphs;
				break;
			case 'baseball-ipsum':
				url = 'http://baseballipsum.apphb.com/api/?paras=' + this.props.paragraphs;
				break;
			case 'pony-ipsum':
				url = 'http://ponyipsum.com/api/?type=pony-and-filler&paras=' + this.props.paragraphs;
				break;
		}

		$.ajax( { url: url, type: 'GET' } ).done( ( data ) => {
			// Save the data to our state
			if ( data && data.length > 0 ) {
				this.setState( { data } );
			}
		} );
	}

	/**
	 * Render out our content.
	 *
	 * @return {*}
	 */
	render() {
		const content = _get( this.state, 'data', [] );

		// If no content yet, show loading message
		if ( content.length === 0 ) {
			return 'loading !';
		}

		// Set the attributes, so we can use in our save function
		this.props.setAttributes( { content: content } );

		// Return our markup
		return [
			content.map( ( p ) => {
				return <p>{p}</p>
			} )
		];
	};
}

export default RenderIpsum;
