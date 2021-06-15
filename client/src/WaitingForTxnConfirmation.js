import React, { useState, useEffect } from 'react'
import TxPendingIcon from './TxPendingIcon'

const WaitingForTxnConfirmation = (props) => {
	return (
		<div
			className='modal fade text-center'
			id='confirmationModal'
			tabIndex='-1'
			aria-labelledby='confirmationModalLabel'
			aria-hidden='true'
			data-backdrop='false'
		>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content shadow-lg'>
					<div className='float-end'>
						<h6 style={{ display: 'inline' }}>
							<i>
								{props.isError === false && props.txHash === null && 'Processing Transaction'}
								{props.isError === false && props.txHash != null && 'Confirmed'}
								{props.isError === true && 'Error'}
							</i>
						</h6>
						<button
							type='button'
							className='btn-close p-2 float-end'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>

					<div className='modal-body'>
						{props.isError === false && <div>{props.txHash === null ? <TxPendingIcon /> : props.txHash}</div>}
						{props.isError === true && <div>Error while processing transaction. Please try again.</div>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default WaitingForTxnConfirmation
