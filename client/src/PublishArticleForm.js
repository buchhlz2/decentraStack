import React, { useEffect, useState } from 'react'
import WaitingForTxnConfirmation from './WaitingForTxnConfirmation'

const intialState = {
	title: '',
	content: '',
}

const PublishArticleForm = (props) => {
	const [values, setValues] = useState(intialState)
	const [isPending, setIsPending] = useState(false)
	const [isError, setIsError] = useState(false)
	const [txHash, setTxHash] = useState(null)

	useEffect(() => {})

	const handleChange = (event) => {
		const { name, value } = event.target
		setValues({
			...values,
			[name]: value,
		})
	}

	// TODO adjust logic to handle empty / undefined title or content being sumbitted, which is partically implemented
	// but doesn't give UI feedback on error. Also, fix logic on `uploadArticleToBlockchain` such that a post is only
	// uploaded to ipfs upon user accepting txn -- right now, data is uploaded to ipfs even if txn rejected by user
	const handleSubmit = async (event) => {
		setTxHash(null)
		setIsPending(false)
		setIsError(false)
		const isEmpty = (str) => !str.trim().length
		event.preventDefault()
		if (
			(values.title === undefined || isEmpty(values.title), values.content === undefined || isEmpty(values.content))
		) {
			console.log('is format error')
			setIsError(true)
			event.stopPropagation()
		} else {
			setIsPending(true)
			console.log('Data was submitted: ' + values.title + ' ' + values.content)
			const tx = await props.uploadArticleToBlockchain({
				title: values.title,
				content: values.content,
			})
			if ((await tx) != null) {
				const txHash = await tx.transactionHash
				console.log(tx)
				setTxHash(txHash)
			} else {
				console.log('is txn error')
				setIsError(true)
			}
			setIsPending(false)
		}

		// TODO don't reset form values until accepted by blockchain; add Uniswap/etherscan-type popup
		// setValues(intialState)
	}

	return (
		<div className='container'>
			<form onSubmit={handleSubmit}>
				<div className='mb-3 input-group h1'>
					<input
						type='text'
						name='title'
						value={values.title}
						onChange={handleChange}
						id='publishArticleFormTitle'
						className='form-control no-focus no-input-border'
						placeholder='Title...'
						aria-label='Title'
						required
					/>
				</div>
				<div id='publishAreaContainer'>
					<div className='mb-3 input-group h5'>
						<textarea
							type='text'
							name='content'
							value={values.content}
							onChange={handleChange}
							className='form-control no-focus no-input-border'
							id='publishTextarea'
							placeholder='Write your thoughts...'
							aria-label='Content'
							required
						/>
					</div>
					<button
						type='submit'
						className='btn btn-primary no-focus'
						style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 35 }}
						data-bs-toggle='modal'
						data-bs-target='#confirmationModal'
					>
						Publish
					</button>
				</div>
			</form>
			<WaitingForTxnConfirmation
				web3={props.web3}
				etherscanURL={props.etherscanURL}
				isError={isError}
				txHash={txHash}
			/>{' '}
			: ''
		</div>
	)
}

export default PublishArticleForm
