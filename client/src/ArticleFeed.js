import React, { useState, useEffect } from 'react'
import ArticleCard from './ArticleCard'
import LoadingSpinner from './LoadingSpinner'

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
			{props.articles.length > 0 ? <div>{articles}</div> : <div>There are no new articles in your feed.</div>}
		</div>
	)
}

export default ArticleFeed
