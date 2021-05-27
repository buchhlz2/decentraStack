import React, { useState, useEffect } from 'react'
import ArticleCard from './ArticleCard'
import LoadingSpinner from './LoadingSpinner'

const ArticleFeed = (props) => {
	const [articles, setArticles] = useState(null)
	const [isLoadingArticles, setIsLoadingArticles] = useState(true)

	useEffect(() => {
		setIsLoadingArticles(true)
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
					web3={props.web3}
				/>
			)
		})
		setArticles(formatArticles)
		setIsLoadingArticles(false)
	}, [props])

	return (
		<div className='container'>
			{isLoadingArticles ? (
				<LoadingSpinner />
			) : props.articles.length > 0 ? (
				<div>{articles}</div>
			) : (
				<div>There are no new articles in your feed.</div>
			)}
		</div>
	)
}

export default ArticleFeed
