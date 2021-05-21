import React, { useState, useEffect } from 'react'
import ArticleCard from './ArticleCard'

const ArticleFeed = (props) => {
	const [articles, setArticles] = useState(null)

	useEffect(() => {
		let jsxKey = 0
		const formatArticles = props.articles.map((article) => {
			jsxKey++
			return (
				<ArticleCard
					article={article}
					accounts={props.accounts}
					subscribeToAuthor={props.subscribeToAuthor}
					subscribedAuthors={props.subscribedAuthors}
					unsubscribeFromAuthor={props.unsubscribeFromAuthor}
					key={jsxKey}
				/>
			)
		})
		setArticles(formatArticles)
	}, [props])

	return (
		<div className='container'>
			{props.isLoading ? (
				<div className='d-flex justify-content-center' id='spinner-parent'>
					<div className='spinner-border' role='status' style={{ width: '3rem', height: '3rem' }}>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : (
				<div>{articles}</div>
			)}
		</div>
	)
}

export default ArticleFeed
