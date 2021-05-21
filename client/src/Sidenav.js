import React, { useState, useEffect } from 'react'
import WalletButton from './WalletButton'

import logo from './img/logo.png'

const style = {
    normal: {
        background: 'purple',
        color: '#ffffff'
    },
    hover: {
        background: 'red'
    }
}
const Sidenav = (props) => {
    const [hover, setHover] = useState(false);

	return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary flex-md-nowrap p-2 shadow fixed-left ">
            <a className='navbar-brand col-sm-3 col-md-2 p-2' href='#'>
				<img src={logo} width='30' height='30' className='d-inline-block align-top p-1' alt='' />
				decentraStack
			</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse container mt-3" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Feed</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Publish</a>
                    </li>
                </ul>
                <ul className="navbar-nav mt-4">
                    <li><hr/></li>
                </ul>
                <WalletButton accounts={props.accounts} web3={props.web3} connectWallet={props.connectWallet} />
            </div>
        </nav>
	)
}

export default Sidenav
