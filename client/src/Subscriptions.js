import React, { useEffect, useState } from 'react'
import SubscriptionAuthorCard from './SubscriptionAuthorCard'
import LoadingSpinner from './LoadingSpinner'

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
				<LoadingSpinner />
			) : subscriptions.length > 0 ? (
				<div>{subscriptions}</div>
			) : (
				<div>You have no subscriptions.</div>
			)}
		</div>
	)
}

export default Subscriptions
