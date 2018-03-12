const { Component } = wp.element;

/**
 * Create our render component
 */
class RenderIpsum extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			data: []
		};
	}

	/**
	 * Get our data when the component loads
	 */
	componentDidMount() {
		this.getData();
	}

	/**
	 * Run an AJAX request to get the data and set the state
	 */
	getData() {
		const url = 'https://baconipsum.com/api/?type=meat-and-filler&paras=' + this.props.paragraphs;

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
		const content = this.state.data ? this.state.data : [];

		// If no content yet, show loading message
		if ( content.length === 0 ) {
			return "loading !";
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
