import React, { useState } from 'react'

const SubscribeButton = (props) => {
	return (
		<div>
			<button onClick={() => props.subscribeToAuthor(props.author)}>Subscribe</button>
		</div>
	)
}

export default SubscribeButton
