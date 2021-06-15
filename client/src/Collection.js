import React, { useState, useEffect } from 'react'
import CollectionCard from './CollectionCard'
import LoadingSpinner from './LoadingSpinner'

const Collection = (props) => {
	const [articles, setArticles] = useState(null)
	const [isLoadingArticles, setIsLoadingArticles] = useState(true)

	useEffect(() => {
		setIsLoadingArticles(true)
		let jsxKey = 0
		const ownedArticles = props.articles.filter((article) => article.author === props.accounts[0])
		const formatArticles = ownedArticles.map((article) => {
			jsxKey++
			return (
				<CollectionCard
					article={article}
					accounts={props.accounts}
					key={jsxKey}
					web3={props.web3}
					contract={props.contract}
					etherscanURL={props.etherscanURL}
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
			) : articles.length > 0 ? (
				<div>{articles}</div>
			) : (
				<div>
					You do not own any{' '}
					<span className='text-primary '>
						<strong>decentraStack</strong>
					</span>{' '}
					NFTs.
				</div>
			)}
		</div>
	)
}

export default Collection
