import React, { useState, useEffect } from 'react'
import SubscribeButton from './SubscribeButton'

const Article = (props) => {
	const [isSubscribed, setIsSubscribed] = useState(false)

	useEffect(() => {
		if (props.subscribedAuthors.includes(props.article.author)) {
			setIsSubscribed(true)
		}
	}, [props.subscribedAuthors, props.article.author])

	return (
		<div>
			<ul>
				<li>Title: {props.article.title}</li>
				<li>Author: {props.article.author}</li>
				<li>ipfs ID: {props.article.body}</li>
				<li>Post blockchain ID: {props.article.postId}</li>
				<li>Date: {props.article.date}</li>
				<li>...</li>
			</ul>
			<div className='postBody'>
				<p>{props.article.bodyContent}</p>
			</div>
			{props.accounts[0] === props.article.author ? (
				<div></div>
			) : (
				<SubscribeButton
					author={props.article.author}
					subscribeToAuthor={props.subscribeToAuthor}
					unsubscribeFromAuthor={props.unsubscribeFromAuthor}
					subscribedAuthors={props.subscribedAuthors}
					isSubscribed={isSubscribed}
				/>
			)}

			<div>---</div>
		</div>
	)
}

export default Article
