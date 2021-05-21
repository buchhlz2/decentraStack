import React from 'react'
import logo from './img/logo.png'

const WalletButton = (props) => {
	return (
		<div className='container-fluid mt-4'>
			<ul className='navbar-nav px-3'>
				{props.web3 ? (
					<a href='#' className='btn btn-secondary btn-sm'>
						<small>
							<b>Wallet</b> {props.accounts[0].slice(0, 8)}...
						</small>
					</a>
				) : (
					<a href='#' className='btn btn-secondary btn-sm' role='button' onClick={props.connectWallet}>
						<small>Connect Wallet</small>
					</a>
				)}
			</ul>
		</div>
	)
}

export default WalletButton
