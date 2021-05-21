import React, { useState, useEffect } from 'react'
import SubscribeButton from './SubscribeButton'

const SubscriptionAuthorCard = (props) => {
	const [isSubscribed, setIsSubscribed] = useState(false)

	useEffect(() => {
		if (props.subscribedAuthors.includes(props.author)) {
			setIsSubscribed(true)
		}
	}, [props])

	return (
		<div className='card mb-3'>
			<div className='card-body'>
				<h5 className='card-title'>{props.author}</h5>
				<SubscribeButton
					author={props.author}
					subscribeToAuthor={props.subscribeToAuthor}
					unsubscribeFromAuthor={props.unsubscribeFromAuthor}
					isSubscribed={isSubscribed}
				/>
			</div>
		</div>
	)
}

export default SubscriptionAuthorCard
