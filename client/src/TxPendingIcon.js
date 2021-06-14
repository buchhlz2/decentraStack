import React from 'react'

const TxPendingIcon = () => {
	return (
		<div className='d-flex justify-content-center'>
			<div className='spinner-grow' role='status' style={{ width: '2rem', height: '2rem' }}>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	)
}

export default TxPendingIcon
