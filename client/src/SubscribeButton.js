import React from 'react'

const SubscribeButton = (props) => {
	return (
		<div>
			{props.isSubscribed ? (
				<button className='btn btn-secondary btn-sm' onClick={() => props.unsubscribeFromAuthor(props.author)}>
					Unsubscribe
				</button>
			) : (
				<button className='btn btn-secondary btn-sm' onClick={() => props.subscribeToAuthor(props.author)}>
					Subscribe
				</button>
			)}
		</div>
	)
}

export default SubscribeButton
