import React, { useState, useEffect } from 'react'
import SubscribeButton from './SubscribeButton'

const ArticleCard = (props) => {
	const [isSubscribed, setIsSubscribed] = useState(false)

	useEffect(() => {
		if (props.subscribedAuthors.includes(props.article.author)) {
			setIsSubscribed(true)
		}
	}, [props.subscribedAuthors, props.article.author])

	// TODO create onClick logic for `View on etherscan` link to call smart contract,
	// get article via `{props.article.postId}`. Implementation could be much into the future
	// when the article is an NFT, for exmaple.
	const datetime = Number(props.article.date)
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	const convertedDatetime = new Date(datetime * 1000).toLocaleDateString('en', options)

	return (
		<div className='card mb-3'>
			<div className='card-body'>
				<h5 className='card-title'>{props.article.title}</h5>
				<h6 className='card-subtitle mb-2 text-muted'>By {props.article.author}</h6>
				<div className='card-text'>
					<p>{props.article.bodyContent}</p>
				</div>
				<div className='card-footer mb-2'>
					<ul className='list-inline my-auto pb-2'>
						<li className='list-inline-item mr-5'>{convertedDatetime}</li>
						<li className='list-inline-item mr-5'>&#8226;</li>
						<li className='list-inline-item mr-5'>
							<a
								href={`https://ipfs.infura.io/ipfs/${props.article.body}`}
								className='card-link'
								target='_blank'
								rel='noopener noreferrer'
							>
								View on ipfs
							</a>
						</li>
						<li className='list-inline-item mr-5'>&#8226;</li>

						<li className='list-inline-item mr-5'>
							<a href='#' className='card-link' target='_blank' rel='noopener noreferrer'>
								View on etherscan
							</a>
						</li>
						<li className='list-inline-item mr-5 pull-right' style={{ float: 'right' }}>
							{props.accounts[0] === props.article.author ? (
								''
							) : (
								<SubscribeButton
									author={props.article.author}
									subscribeToAuthor={props.subscribeToAuthor}
									unsubscribeFromAuthor={props.unsubscribeFromAuthor}
									subscribedAuthors={props.subscribedAuthors}
									isSubscribed={isSubscribed}
								/>
							)}
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ArticleCard
