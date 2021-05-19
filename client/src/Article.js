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
				<li>Post author: {props.article.author}</li>
				<li>Post title: {props.article.title}</li>
				<li>Post body ipfs CID: {props.article.body}</li>
				<li className='postBody'>Post body: {props.article.bodyContent}</li>
				<li>Post date: {props.article.date}</li>
				<li>Post ID: {props.article.postId}</li>
			</ul>
			<SubscribeButton
				author={props.article.author}
				subscribeToAuthor={props.subscribeToAuthor}
				subscribedAuthors={props.subscribedAuthors}
				isSubscribed={isSubscribed}
			/>
			<div>---</div>
		</div>
	)
}

export default Article
