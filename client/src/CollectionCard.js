import React, { useState, useEffect } from 'react'

const CollectionCard = (props) => {
	const datetime = Number(props.article.date)
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	const convertedDatetime = new Date(datetime * 1000).toLocaleDateString('en', options)

	return (
		<div className='card mb-3'>
			<div className='card-body'>
				<h5 className='card-title'>{props.article.title}</h5>
				<h6 className='card-subtitle mb-2 text-muted'>By {props.article.author}</h6>
				<div className='card-text'>
					<p>{props.article.content}</p>
				</div>
				<div className='card-footer mb-2'>
					<ul className='list-inline my-auto pb-2'>
						<li className='list-inline-item mr-5'>{convertedDatetime}</li>
						<li className='list-inline-item mr-5'>&#8226;</li>
						<li className='list-inline-item mr-5'>
							<a href={`${props.article.tokenURI}`} className='card-link' target='_blank' rel='noopener noreferrer'>
								View NFT URI
							</a>
						</li>
						{/* <li className='list-inline-item mr-5'>&#8226;</li>
						<li className='list-inline-item mr-5'>
							<a href={`https://etherscan.io/tx/${nftBlockchainTxId}`} className='card-link' target='_blank' rel='noopener noreferrer'>
								View on etherscan
							</a>
						</li> */}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default CollectionCard
