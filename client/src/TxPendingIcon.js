import React from 'react'

const TxPendingIcon = () => {
	return (
		<div className='d-flex justify-content-center'>
			<div className='spinner' role='status'>
				<div className='bounce1'></div>
				<div className='bounce2'></div>
				<div className='bounce3'></div>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	)
}

export default TxPendingIcon
