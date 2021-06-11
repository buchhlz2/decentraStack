import React, { useState, useEffect } from 'react'

const WaitingForTxnConfirmation = (props) => {
	const [txnHsh, setTxnHash] = useState(null)

	return (
		<div
			className='position-absolute text-center'
			style={{ zIndex: 1000, top: '40vh', backgroundColor: 'purple', width: '40vw' }}
		>
			<div className='card mb-3 shadow-lg'>
				<div className='card-body'>
					<div>{props.isPending === true ? 'Pending' : 'Not pending'}</div>
				</div>
				<div className='card-body'>
					<div>{props.txnHash === null ? 'No value' : props.txnHash}</div>
				</div>
			</div>
		</div>
	)
}

export default WaitingForTxnConfirmation
