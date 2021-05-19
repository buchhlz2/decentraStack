import React from 'react'

const SubscribeButton = (props) => {
	return (
		<div>
			{props.isSubscribed ? (
				<button onClick={() => props.unsubscribeFromAuthor(props.author)}>Unsubscribe</button>
			) : (
				<button onClick={() => props.subscribeToAuthor(props.author)}>Subscribe</button>
			)}
		</div>
	)
}

export default SubscribeButton
