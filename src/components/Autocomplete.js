import React, { Component, PropTypes } from 'react'
import * as _ from 'lodash'


class Autocomplete extends Component {

	constructor( props ){
		super(props)
		this.state = {
			items: [],
			editing: false
		}
	}

	static get defaultProps () {
		return {
			items: [],
			classPrefix: 'autocomplete',
			placeholder: 'What are you looking for?',
			debounceInterval: 250,
			filterFunction:  query => {
				return item => item.name.toLowerCase().indexOf(query) != -1
			},

			valueLink: {
				value: {},
				requestChange: function() {}
			}
		}
	}

	static get propTypes () {
		return {
			classPrefix: PropTypes.string,
			items: PropTypes.array.isRequired,
			placeholder: PropTypes.string,
			debounceInterval: PropTypes.oneOfType([PropTypes.string,	PropTypes.number]),
			itemRender: PropTypes.func,
			filterFunction: PropTypes.func,
			valueLink: PropTypes.shape({
				value: PropTypes.oneOfType([PropTypes.string,	PropTypes.number, PropTypes.object]),
				requestChange: React.PropTypes.func
			})
		}
	}

	componentWillMount(){
		this.handleInputChange = _.debounce(this.handleInputChange, this.props.debounceInterval)
	}


	handleSelection( item, e ){
		this.refs.searchInput.value = item.name
		this.props.valueLink.requestChange(item)
		this.setState({items: []})
	}

	handleInputChange(e){

		let searchValue = this.refs.searchInput.value
		let filterFunction = this.props.filterFunction

		if( searchValue == '' ) {

			this.setState({items: []})

		}	else if( this.props.fetch ) {
			
			let promise = this.props.fetch(searchValue)
			promise.then( results => {
				let items = results.filter(filterFunction(searchValue))
				this.setState({items: items})
			})	

		} else {
			let items = this.props.items.filter(filterFunction(searchValue))
			this.setState({items: items})
		}

	}

	render(){

		let items = this.state.items.map( (item, i) => {
			return (
				<li key={i} onClick={this.handleSelection.bind(this, item)} className={`${this.props.classPrefix}-menu-item`}>
					{this.props.itemRender(item)}
				</li>
			)
		})

		return (
			<div>
				<input
					type="text"
					className={`${this.props.classPrefix}-input`}
					placeholder={this.props.placeholder}
					ref="searchInput"
					onKeyUp={this.handleInputChange.bind(this)}
				/>

				<div className="" ref="autocomplete">
					<ul className={`${this.props.classPrefix}-menu-items`}>
						{items}
					</ul>
				</div>
			</div>
		)
	}

}

export default Autocomplete