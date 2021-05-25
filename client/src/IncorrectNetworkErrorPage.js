import React from 'react'

const IncorrectNetworkErrorPage = () => {
	return (
		<div className='container'>
			{/* TODO network can be ganache, rinkeby, or mainnet */}
			<h3 className='text-center' style={{ marginTop: '40vh' }}>
				Please make sure your current network is Ganache.
			</h3>
		</div>
	)
}

export default IncorrectNetworkErrorPage
