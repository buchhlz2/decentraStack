import React from 'react'

const IncorrectNetworkErrorPage = () => {
	return (
		<div className='container'>
			{/* TODO network can be ganache or ropsten; mainnet in future(?) */}
			<h3 className='text-center' style={{ marginTop: '40vh' }}>
				Please make sure you are connected to a deployed network.
			</h3>
		</div>
	)
}

export default IncorrectNetworkErrorPage
