import React from 'react'
import ReactDOM from 'react-dom'

import Autocomplete from './components/Autocomplete'
import AutocompleteItem from './components/AutocompleteItem'

import './styles/base.less'

const data = [
  {abbr: 'AL', name: 'Alabama'},
  {abbr: 'AK', name: 'Alaska'},
  {abbr: 'AZ', name: 'Arizona'},
  {abbr: 'AR', name: 'Arkansas'},
  {abbr: 'CA', name: 'California'},
  {abbr: 'CO', name: 'Colorado'},
  {abbr: 'CT', name: 'Connecticut'},
  {abbr: 'DE', name: 'Delaware'},
  {abbr: 'FL', name: 'Florida'},
  {abbr: 'GA', name: 'Georgia'},
  {abbr: 'HI', name: 'Hawaii'},
  {abbr: 'ID', name: 'Idaho'},
  {abbr: 'IL', name: 'Illinois'},
  {abbr: 'IN', name: 'Indiana'},
  {abbr: 'IA', name: 'Iowa'},
  {abbr: 'KS', name: 'Kansas'},
  {abbr: 'KY', name: 'Kentucky'},
  {abbr: 'LA', name: 'Louisiana'},
  {abbr: 'ME', name: 'Maine'},
  {abbr: 'MD', name: 'Maryland'},
  {abbr: 'MA', name: 'Massachusetts'},
  {abbr: 'MI', name: 'Michigan'},
  {abbr: 'MN', name: 'Minnesota'},
  {abbr: 'MS', name: 'Mississippi'},
  {abbr: 'MO', name: 'Missouri'},
  {abbr: 'MT', name: 'Montana'},
  {abbr: 'NE', name: 'Nebraska'},
  {abbr: 'NV', name: 'Nevada'},
  {abbr: 'NH', name: 'New Hampshire'},
  {abbr: 'NJ', name: 'New Jersey'},
  {abbr: 'NM', name: 'New Mexico'},
  {abbr: 'NY', name: 'New York'},
  {abbr: 'NC', name: 'North Carolina'},
  {abbr: 'ND', name: 'North Dakota'},
  {abbr: 'OH', name: 'Ohio'},
  {abbr: 'OK', name: 'Oklahoma'},
  {abbr: 'OR', name: 'Oregon'},
  {abbr: 'PA', name: 'Pennsylvania'},
  {abbr: 'RI', name: 'Rhode Island'},
  {abbr: 'SC', name: 'South Carolina'},
  {abbr: 'SD', name: 'South Dakota'},
  {abbr: 'TN', name: 'Tennessee'},
  {abbr: 'TX', name: 'Texas'},
  {abbr: 'UT', name: 'Utah'},
  {abbr: 'VT', name: 'Vermont'},
  {abbr: 'VA', name: 'Virginia'},
  {abbr: 'WA', name: 'Washington'},
  {abbr: 'WV', name: 'West Virginia'},
  {abbr: 'WI', name: 'Wisconsin'},
  {abbr: 'WY', name: 'Wyoming'}
]



class Example extends React.Component {

	state = {
		autocomplete: {}
	};

	valueLink = (key) => {
		return {
			value: this.state[key],
			requestChange: this.handleChange.bind(this, key)
		}
	};

	handleChange( key, value ) {
		this.setState({[key]: value})
	}

	render() {
		console.log(this.state)
		return (
			<div className="container">
				<div className="row">
					<div id="autocomplete" className="center-block">
						<Autocomplete 
							placeholder="Searching for a US state?"
							valueLink={this.valueLink('autocomplete')} 
							fetch={(search) => new Promise(resolve => setTimeout(() => resolve(data), 1000))}
							itemRender={(item) => <AutocompleteItem item={item} />}
						/>
					</div>					
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Example />, document.getElementById('root'))