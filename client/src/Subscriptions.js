import React, { useEffect, useState } from 'react'
import SubscriptionAuthorCard from './SubscriptionAuthorCard'

const Subscriptions = (props) => {
	const [subscriptions, setSubscriptions] = useState([])

	useEffect(() => {
		let jsxKey = 0
		const subscriptions = props.subscribedAuthors.map((subscribedAuthor) => {
			jsxKey++
			return (
				<SubscriptionAuthorCard
					author={subscribedAuthor}
					subscribeToAuthor={props.subscribeToAuthor}
					subscribedAuthors={props.subscribedAuthors}
					unsubscribeFromAuthor={props.unsubscribeFromAuthor}
					isSubscribed={props.isSubscribed}
					key={jsxKey}
				/>
			)
		})
		setSubscriptions(subscriptions)
	}, [props])

	return (
		<div className='container'>
			{props.isLoading ? (
				<div className='d-flex justify-content-center' id='spinner-parent'>
					<div className='spinner-border' role='status' style={{ width: '3rem', height: '3rem' }}>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : subscriptions.length > 0 ? (
				<div>{subscriptions}</div>
			) : (
				<div>You have no subscriptions.</div>
			)}
		</div>
	)
}

export default Subscriptions
