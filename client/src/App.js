import React, { Component } from 'react'
import DecentrastackContract from './contracts/Decentrastack.json'
import { create } from 'ipfs-http-client'
import { checkWeb3OnLoad, getWeb3Click } from './getWeb3'
import Sidenav from './Sidenav'
import PublishArticleForm from './PublishArticleForm'
import ArticleFeed from './ArticleFeed'
import Subscriptions from './Subscriptions'
import NotFoundErrorPage from './NotFoundErrorPage'
import NoWalletErrorPage from './NoWalletErrorPage'
import IncorrectNetworkErrorPage from './IncorrectNetworkErrorPage'
import LoadingSpinner from './LoadingSpinner'
import { Route, Switch } from 'react-router-dom'

import './App.css'

class App extends Component {
	state = {
		web3: null,
		isLoading: true,
		isError: false,
		ipfs: null,
		accounts: [],
		contract: null,
		articles: [],
		subscribedAuthors: [],
	}

	async componentDidMount() {
		this.setState({ isLoading: true, isError: false })
		try {
			// Use web3 to get the user's accounts -- check if user has previously authorized dapp
			// Also, create ipfs instance
			const web3 = await checkWeb3OnLoad()
			const accounts = await web3.eth.getAccounts()
			const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

			if (accounts.length > 0) {
				// Get network provider and web3 instance.
				// Get the contract instance.
				const networkId = await web3.eth.net.getId()
				// Check if networkId is either: local, (TODO -- Rinkeby, or Mainnet)
				const checkIsValidNetwork = this.checkIsValidNetwork(networkId)
				if (checkIsValidNetwork === false) {
					this.setState({ isError: true })
					return
				}
				const deployedNetwork = DecentrastackContract.networks[networkId]
				const instance = new web3.eth.Contract(DecentrastackContract.abi, deployedNetwork && deployedNetwork.address)

				// Set web3, accounts, contract, and ipfs to the state
				// Then, get latest articles and subscribed authors for the user & set state
				this.setState({ web3, accounts, contract: instance, ipfs }, async () => {
					const articles = await this.getLatestArticles()
					const subscribedAuthors = await this.getSubscribedAuthors()
					this.setState({ articles, subscribedAuthors, isLoading: false })
				})
			} else {
				this.setState({ isLoading: false })
			}
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`)
			console.error(error)
			this.setState({ isLoading: false, isError: true })
		}
	}

	checkIsValidNetwork = (networkId) => {
		let isValidNetwork = false
		switch (networkId) {
			case 5777:
				isValidNetwork = true
				break
			default:
				break
		}
		return isValidNetwork
	}

	connectWallet = async () => {
		try {
			const web3 = await getWeb3Click()
			const accounts = await web3.eth.getAccounts()
			this.setState({ web3, accounts })
		} catch (error) {
			alert(`Failed to load web3, accounts, or contract. Check console for details.`)
			console.error(error)
		}
	}

	getLatestArticles = async () => {
		const latestArticles = await this.state.contract.methods.getArticles().call()
		const articles = []
		for await (const article of latestArticles) {
			const stream = await this.state.ipfs.cat(article.contentIpfsHash)

			let ipfsCidToString = ''
			for await (const chunk of stream) {
				// chunks of data are returned as a Buffer, convert it back to a string
				chunk.map((l) => (ipfsCidToString += String.fromCharCode(l)))
			}
			article.content = ipfsCidToString

			articles.push(article)
		}

		articles.reverse()
		return articles
	}

	uploadArticleToBlockchain = async (data) => {
		const { title, content } = data
		const { accounts, contract } = this.state
		const author = accounts[0]
		console.log('uploading to blockchain from author: ', author)
		const contentToIpfsHash = await this.addToIpfsAndGetHash(content)
		console.log(contentToIpfsHash)
		await contract.methods.createArticle(title, contentToIpfsHash).send({ from: author })
	}

	addToIpfsAndGetHash = async (data) => {
		const ifpsObj = await this.state.ipfs.add(data)
		const ifpsHash = await ifpsObj.path
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
			const authors = await contract.methods.getUserToSubscribedAuthors(user).call()

			return authors
		} catch (err) {
			console.error(err)
		}
	}

	render() {
		return (
			<div>
				<Sidenav accounts={this.state.accounts} web3={this.state.web3} connectWallet={this.connectWallet} />
				<div className='container-fluid mt-3'>
					{this.state.isError ? (
						<IncorrectNetworkErrorPage />
					) : (
						<Switch>
							<Route
								path='/(/|feed|)/'
								render={(props) =>
									this.state.isLoading ? (
										<LoadingSpinner />
									) : this.state.accounts.length > 0 ? (
										<ArticleFeed
											{...props}
											articles={this.state.articles}
											accounts={this.state.accounts}
											subscribeToAuthor={this.subscribeToAuthor}
											subscribedAuthors={this.state.subscribedAuthors}
											unsubscribeFromAuthor={this.unsubscribeFromAuthor}
											isLoading={this.state.isLoading}
										/>
									) : (
										<NoWalletErrorPage />
									)
								}
							/>
							<Route
								path='/subscriptions'
								render={(props) =>
									this.state.isLoading ? (
										<LoadingSpinner />
									) : this.state.accounts.length > 0 ? (
										<Subscriptions
											{...props}
											accounts={this.state.accounts}
											subscribeToAuthor={this.subscribeToAuthor}
											subscribedAuthors={this.state.subscribedAuthors}
											unsubscribeFromAuthor={this.unsubscribeFromAuthor}
											isLoading={this.state.isLoading}
										/>
									) : (
										<NoWalletErrorPage />
									)
								}
							/>
							<Route
								path='/publish'
								render={(props) =>
									this.state.isLoading ? (
										<LoadingSpinner />
									) : this.state.accounts.length > 0 ? (
										<PublishArticleForm {...props} uploadArticleToBlockchain={this.uploadArticleToBlockchain} />
									) : (
										<NoWalletErrorPage />
									)
								}
							/>
							<Route component={NotFoundErrorPage} />
						</Switch>
					)}
				</div>
			</div>
		)
	}
}

export default App
