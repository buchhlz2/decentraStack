import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import WalletButton from './WalletButton'

import logo from './img/logo.png'

const Sidenav = (props) => {
	const { pathname } = useLocation()

	return (
		<nav className='navbar navbar-expand-md navbar-dark bg-primary flex-md-nowrap p-2 shadow fixed-left '>
			<a className='navbar-brand col-sm-3 col-md-2 p-2' href='#'>
				<img src={logo} width='30' height='30' className='d-inline-block align-top p-1' alt='' />
				decentraStack
			</a>
			<button
				className='navbar-toggler'
				type='button'
				data-bs-toggle='collapse'
				data-bs-target='#navbarSupportedContent'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>

			<div className='collapse navbar-collapse mt-3' id='navbarSupportedContent'>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<NavLink to='/feed' className='nav-link' isActive={() => ['/', '/feed'].includes(pathname)} href='#'>
							Feed
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='/subscriptions' className='nav-link' href='#'>
							Subscriptions
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='/publish' className='nav-link' href='#'>
							Publish
						</NavLink>
					</li>
				</ul>
				<ul className='navbar-nav mt-4'>
					<li>
						<hr />
					</li>
				</ul>
				<WalletButton accounts={props.accounts} web3={props.web3} connectWallet={props.connectWallet} />
			</div>
		</nav>
	)
}

export default Sidenav
