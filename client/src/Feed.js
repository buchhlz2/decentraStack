import React, { Component } from 'react'
import Article from './Article'
class Feed extends Component {
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
				<Article
					article={article}
					accounts={this.props.accounts}
					subscribeToAuthor={this.props.subscribeToAuthor}
					subscribedAuthors={this.props.subscribedAuthors}
					unsubscribeFromAuthor={this.props.unsubscribeFromAuthor}
					key={jsxKey}
				/>
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

export default Feed
