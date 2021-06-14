import React, { useState, useEffect } from 'react'
import TxPendingIcon from './TxPendingIcon'

const WaitingForTxnConfirmation = (props) => {
	return (
		<div className='d-flex justify-content-center text-center' style={{ zIndex: 1000, marginTop: '-25em' }}>
			<div className='card shadow-lg' style={{ width: '40%', height: '10em' }}>
				<div className='card-body'>
					<div>{props.isPending === true ? <TxPendingIcon /> : 'Not pending'}</div>
				</div>
				<div className='card-body'>
					<div>{props.txHash === null ? 'No value' : props.txHash}</div>
				</div>
			</div>
		</div>
	)
}

export default WaitingForTxnConfirmation
