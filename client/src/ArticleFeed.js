import React, { Component } from 'react'
import ArticleCard from './ArticleCard'

class ArticleFeed extends Component {
	state = {
		articles: null,
	}

	componentDidMount = () => {
		let jsxKey = 0
		const formatArticles = this.props.articles.map((article) => {
			jsxKey++
			return (
				<ArticleCard
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
			<div className='container'>
				{this.state.articles ? (
					<div className='spinner-border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				) : (
					<div>{this.state.articles}</div>
				)}
			</div>
		)
	}
}

export default ArticleFeed
