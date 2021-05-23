import React, { useEffect, useState } from 'react'
import SubscriptionAuthorCard from './SubscriptionAuthorCard'
import LoadingSpinner from './LoadingSpinner'

const Subscriptions = (props) => {
	const [subscriptions, setSubscriptions] = useState([])
	const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(true)

	useEffect(() => {
		setIsLoadingSubscriptions(true)
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
		setIsLoadingSubscriptions(false)
	}, [props])

	return (
		<div className='container'>
			{isLoadingSubscriptions ? (
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
