import React, { useState } from 'react'

const SubscribeButton = (props) => {
	return (
		<div>
			{props.isSubscribed ? (
				// TODO add `unsubscribeFromAuthor` method and pass down here
				<button onClick={() => props.subscribeToAuthor(props.author)}>Unsubscribe</button>
			) : (
				<button onClick={() => props.subscribeToAuthor(props.author)}>Subscribe</button>
			)}
		</div>
	)
}

export default SubscribeButton
