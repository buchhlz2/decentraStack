import React, { Component } from 'react'

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = { title: null, body: null }

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const value = event.target.value
		this.setState({
			...this.state,
			[event.target.name]: value,
		})
	}

	handleSubmit(event) {
		console.log('Data was submitted: ' + this.state.title + ' ' + this.state.body)
		event.preventDefault()
		this.props.postHandler({ title: this.state.title, body: this.state.body })
	}

	render() {
		return (
			<div>
				<h2>Post Form:</h2>
				<form onSubmit={this.handleSubmit}>
					<label>
						Title:
						<input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
					</label>
					<label>
						Body:
						<textarea type='text' name='body' value={this.state.body} onChange={this.handleChange} />
					</label>
					<input type='submit' value='Submit' />
				</form>
			</div>
		)
	}
}

export default Post
