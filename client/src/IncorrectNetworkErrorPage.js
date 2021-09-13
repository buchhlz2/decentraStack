import React from 'react'

const IncorrectNetworkErrorPage = () => {
	return (
		<div className='container'>
			{/* network can be ganache or ropsten */}
			<h3 className='text-center' style={{ marginTop: '40vh' }}>
				Please make sure that you are connected to a deployed network.
			</h3>
		</div>
	)
}

export default IncorrectNetworkErrorPage
