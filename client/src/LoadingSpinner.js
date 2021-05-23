import React from 'react'

const LoadingSpinner = () => {
	return (
		<div className='d-flex justify-content-center' id='spinner-parent'>
			<div className='spinner-border' role='status' style={{ width: '3rem', height: '3rem' }}>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	)
}

export default LoadingSpinner
