import React, { useEffect, useState } from 'react'
import WaitingForTxnConfirmation from './WaitingForTxnConfirmation'

const intialState = {
	title: '',
	content: '',
}

const PublishArticleForm = (props) => {
	const [values, setValues] = useState(intialState)
	const [isError, setIsError] = useState(false)
	const [txHash, setTxHash] = useState(null)

	const handleChange = (event) => {
		const { name, value } = event.target
		setValues({
			...values,
			[name]: value,
		})
	}

	const handleSubmit = async (event) => {
		setTxHash(null)
		setIsError(false)
		const isEmpty = (str) => !str.trim().length
		event.preventDefault()
		if (
			(values.title === undefined || isEmpty(values.title), values.content === undefined || isEmpty(values.content))
		) {
			setIsError(true)
			event.stopPropagation()
		} else {
			console.log('Data was submitted: ' + values.title + ' ' + values.content)
			const tx = await props.uploadArticleToBlockchain({
				title: values.title,
				content: values.content,
			})
			if ((await tx) != null) {
				const txHash = await tx.transactionHash
				setTxHash(txHash)
			} else {
				setIsError(true)
			}
		}
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
