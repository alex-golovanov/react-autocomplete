import React, { Component, PropTypes } from 'react'

class AutocompleteItem extends Component {

	static get defaultProps () {
		return {
			classPrefix: 'autocomplete',
		}
	}

	static get propTypes () {
		return {
			classPrefix: PropTypes.string,
		}
	}

	render(){
		let item = this.props.item

		return (
			<a className={`${this.props.classPrefix}-menu-item-link`}>{item.name}</a>
		)
	}

}

export default AutocompleteItem