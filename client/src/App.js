import React, { Component } from 'react'
import PostContract from './contracts/Post.json'
import { create } from 'ipfs-http-client'
import { getWeb3Load, getWeb3Click } from './getWeb3'
import PublishArticleForm from './PublishArticleForm'
import ArticleFeed from './ArticleFeed'

import './App.css'

class App extends Component {
	state = {
		web3: null,
		ipfs: null,
		accounts: null,
		contract: null,
		articles: [],
		subscribedAuthors: null,
	}

	async componentDidMount() {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3Load()
			const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts()

			// Get the contract instance.
			const networkId = await web3.eth.net.getId()
			const deployedNetwork = PostContract.networks[networkId]
			const instance = new web3.eth.Contract(PostContract.abi, deployedNetwork && deployedNetwork.address)

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract: instance, ipfs }, async () => {
				await this.getLatestArticles()
			})
			await this.getSubscribedAuthors()
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`)
			console.error(error)
		}
	}

	connectWallet = async () => {
		// TODO this needs to be fixed/refactored, along with `getWeb3Load`...better flow/usability needed
		await getWeb3Click()
	}

	async getLatestArticles() {
		const latestArticles = await this.state.contract.methods.getArticles().call()
		const articles = []
		for await (const article of latestArticles) {
			const stream = await this.state.ipfs.cat(article.body)

			let ipfsCidToString = ''
			for await (const chunk of stream) {
				// chunks of data are returned as a Buffer, convert it back to a string
				chunk.map((l) => (ipfsCidToString += String.fromCharCode(l)))
			}
			article.bodyContent = ipfsCidToString

			articles.push(article)
		}

		articles.reverse()
		this.setState({ articles })
	}

	// OLD CODE -- do not need but keeping in case want to reference
	/*
	readPostFromBlockchain = async () => {
		const post = await this.state.contract.getPastEvents('PostCreated')
		const calculatedPostId = this.state.web3.utils.soliditySha3(
			post[0]['returnValues']['_author'],
			post[0]['returnValues']['_title'],
			post[0]['returnValues']['_body'],
			post[0]['returnValues']['_date']
		)
		console.log('postID from js ', calculatedPostId)
		// TODO: query events by the `calculatedPostId` so that you can show only the post the was sent, not all events 
        // let queryPostById = await this.state.contract.getPastEvents('PostCreated').filter({ _postId: calculatedPostId })
		//console.log('queryPostById: ', queryPostById)

		this.setState({
			calculatedPostId,
		})
		console.log(post)
		console.log('postID from blockchain ', post[0]['returnValues']['_postId'])

		const stream = await this.state.ipfs.cat(post[0]['returnValues']['_body'])
		let bodyIpfsHashToString = ''
		for await (const chunk of stream) {
			// chunks of data are returned as a Buffer, convert it back to a string
			chunk.map((l) => (bodyIpfsHashToString += String.fromCharCode(l)))
		}

		this.setState({
			blockchainDataAuthor: post[0]['returnValues']['_author'],
			blockchainDataTitle: post[0]['returnValues']['_title'],
			blockchainDataBodyIpfsCID: post[0]['returnValues']['_body'],
			blockchainDataBody: bodyIpfsHashToString,
			blockchainDataDate: post[0]['returnValues']['_date'],
			blockchainDataPostId: post[0]['returnValues']['_postId'],
		})
	}*/

	uploadPostToBlockchain = async (data) => {
		const { title, body } = data
		const { accounts, contract } = this.state
		const author = accounts[0]
		console.log('uploading to blockchain from author: ', author)
		const postBodyToIpfsHash = await this.addToIpfsAndGetHash(body)
		console.log(postBodyToIpfsHash)
		await contract.methods.createPost(title, postBodyToIpfsHash).send({ from: author })
	}

	addToIpfsAndGetHash = async (data) => {
		const ifpsObj = await this.state.ipfs.add(data)
		const ifpsHash = await ifpsObj.path
		console.log('ipfs uploaded file hash:')
		console.log(ifpsHash)
		return ifpsHash
	}

	subscribeToAuthor = async (author) => {
		try {
			const { accounts, contract } = await this.state
			const user = await accounts[0]
			console.log(`User ${user} trying to subscribe to author ${author}`)
			await contract.methods.subscribeToAuthor(author).send({ from: user })
			// TODO after calling, must check that it is successful; smart contract must
			// implement this logic as well. Then, (un)subscribe btn & showing user is
			// already subscribed to author can be rendered properly in UI
		} catch (err) {
			console.error(err)
		}
	}

	unsubscribeFromAuthor = async (author) => {
		try {
			const { accounts, contract } = await this.state
			const user = await accounts[0]
			console.log(`User ${user} trying to unsubscribe from author ${author}`)
			await contract.methods.unsubscribeFromAuthor(author).send({ from: user })
			// TODO after calling, must check that it is successful; smart contract must
			// implement this logic as well. Then, (un)subscribe btn & showing user is
			// already subscribed to author can be rendered properly in UI
		} catch (err) {
			console.error(err)
		}
	}

	getSubscribedAuthors = async () => {
		try {
			const { accounts, contract } = await this.state
			const user = await accounts[0]
			console.log(`User ${user} trying to get subscribed authors`)
			const authors = await contract.methods.getUserToSubscribedAuthors(user).call()
			console.log(authors)

			this.setState({ subscribedAuthors: authors })
		} catch (err) {
			console.error(err)
		}
	}

	render() {
		if (!this.state.web3) {
			return (
				<div>
					<button onClick={this.connectWallet}>Connect Wallet</button>
				</div>
			)
		}
		return (
			<div className='container-fluid'>
				<PublishArticleForm uploadPostToBlockchain={this.uploadPostToBlockchain} />
				{this.state.articles.length > 0 ? (
					<ArticleFeed
						articles={this.state.articles}
						accounts={this.state.accounts}
						subscribeToAuthor={this.subscribeToAuthor}
						subscribedAuthors={this.state.subscribedAuthors}
						unsubscribeFromAuthor={this.unsubscribeFromAuthor}
					/>
				) : (
					<div>No articles.</div>
				)}
			</div>
		)
	}
}

export default App
