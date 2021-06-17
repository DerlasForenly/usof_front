import React from 'react'
import Category from './Category'

export default class TagInput extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [],
			focused: false,
			input: ''
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleInputKeyDown = this.handleInputKeyDown.bind(this)
		this.handleRemoveItem = this.handleRemoveItem.bind(this)
	}

	render() {
		return (
			<div className="list">
				{this.state.items.map((item, i) => 
					<div className="element" key={i} onClick={this.handleRemoveItem(i)}>
						<label className="category-div">{item}</label>
						{
							//this.props.setState(state => {categories: this.state.items})
						}
					</div>
				)}
				<input
					type="text"
					value={this.state.input}
					onChange={this.handleInputChange}
					onKeyDown={this.handleInputKeyDown}
					maxLength="15"
					placeholder="Categories:" />
			</div>
		)
	}

	handleInputChange(evt) {
		this.setState({ input: evt.target.value })
	}

	handleInputKeyDown(evt) {
		if ( evt.keyCode === 13 ) {
			const {value} = evt.target
			
			this.setState(state => ({
				items: [...state.items, value],
				input: ''
			}))
		}

		if ( this.state.items.length && evt.keyCode === 8 && !this.state.input.length ) {
			this.setState(state => ({
				items: state.items.slice(0, state.items.length - 1)
			}))
		}
	}

	handleRemoveItem(index) {
		return () => {
			this.setState(state => ({
				items: state.items.filter((item, i) => i !== index)
			}))
		}
	}
}