import React, { Component } from 'react'

class Post extends Component {
	state = {
		articles: null,
	}

	// TODO: need to figure out how to load async data
	// React is rendering the jsx below but with empty data from `article` due to <Promise>
	componentDidMount = () => {
		let jsxKey = 0
		const formatArticles = this.props.articles.map((article) => {
			jsxKey++
			return (
				<div key={jsxKey}>
					<div>Post author: {article.author}</div>
					<div>Post title: {article.title}</div>
					<div>Post body ipfs CID: {article.body}</div>
					<div className='postBody'>Post body: {article.bodyContent}</div>
					<div>Post date: {article.date}</div>
					<div>Post ID: {article.postId}</div>
					<div>---</div>
				</div>
			)
		})

		this.setState({ articles: formatArticles })
	}

	render() {
		return (
			<div>
				<h2>Feed:</h2>
				{this.state.articles === null ? <div>Loading...</div> : <div>{this.state.articles}</div>}
			</div>
		)
	}
}

export default Post
