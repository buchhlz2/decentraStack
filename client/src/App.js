import React, { Component } from 'react'
import DecentrastackContract from './contracts/Decentrastack.json'
import { create } from 'ipfs-http-client'
import { checkWeb3OnLoad, getWeb3Click } from './getWeb3'
import Sidenav from './Sidenav'
import PublishArticleForm from './PublishArticleForm'
import ArticleFeed from './ArticleFeed'
import Subscriptions from './Subscriptions'
import Collection from './Collection'
import NotFoundErrorPage from './NotFoundErrorPage'
import NoWalletErrorPage from './NoWalletErrorPage'
import IncorrectNetworkErrorPage from './IncorrectNetworkErrorPage'
import LoadingSpinner from './LoadingSpinner'
import { Route, Switch } from 'react-router-dom'

import './App.css'

/**
 * @dev Application allows users to interact with ethereum (testnet) network
 * users can publish, subscribe/unsubscribe to/from others, and view their published articles.
 */
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

	/**
	 * @dev Upon mounting, check if web3 & connected accounts exist, otherwise, set to error.
	 * If web3 connected properly, set state for web3, ipfs (decentralized article / NFT hosting),
	 * and connected accounts. Then, load the latest articles & subscribed authors.
	 */
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

	/**
	 * @dev Confirms if network is part of valid set
	 * @param networkId `getWeb3` function will pass current web3 network ID
	 */
	checkIsValidNetwork = (networkId) => {
		let isValidNetwork = false
		switch (networkId) {
			case 3:
				isValidNetwork = true
				break
			case 5777:
				isValidNetwork = true
				break
			default:
				break
		}
		return isValidNetwork
	}

	/**
	 * @dev Connect to the web3 user's wallet; to be used upon click, not page loads
	 */
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

	/**
	 * @dev Retrieve the latest articles posted; then, convert ipfs hash to original data
	 */
	getLatestArticles = async () => {
		const { contract, ipfs } = this.state
		const latestArticles = await contract.methods.getArticles().call()
		const articles = []
		for await (const article of latestArticles) {
			// Use `ipfs.cat` to convert hash to original text
			const stream = await ipfs.cat(article.contentIpfsHash)

			let ipfsCidToString = ''
			for await (const chunk of stream) {
				// Chunks of data are returned as a Buffer, convert it back to a string
				chunk.map((l) => (ipfsCidToString += String.fromCharCode(l)))
			}
			article.content = ipfsCidToString

			// Call ERC721 `tokenURI` using @param articleId (smart contract value: uint256 _tokenId)
			const tokenURI = await contract.methods.tokenURI(article.articleId).call()
			article.tokenURI = tokenURI

			articles.push(article)
		}

		// @dev Reverse to have most recent articles in front of array
		articles.reverse()
		return articles
	}

	/**
	 * @dev Uploads user's article to Ethereum blockchain & ipfs
	 */
	uploadArticleToBlockchain = async (data) => {
		const { title, content } = data
		const { accounts, contract } = this.state
		const author = accounts[0]

		const contentToIpfsHash = await this.addToIpfsAndGetHash(content)
		await contract.methods.createArticle(title, contentToIpfsHash).send({ from: author })
	}

	/**
	 * @dev Add to ipfs & retrive the associated hash
	 * @param data Article content / body only (e.g., author, title, date, etc. are NOT uploaded)
	 * @returns ipfs 'Qm...' hash
	 */
	addToIpfsAndGetHash = async (data) => {
		const ifpsObj = await this.state.ipfs.add(data)
		const ifpsHash = await ifpsObj.path
		return ifpsHash
	}

	/**
	 * @dev Subscribe to an author
	 * @param author Ethereum address of the publishing article's author
	 */
	subscribeToAuthor = async (author) => {
		try {
			const { accounts, contract } = await this.state
			const user = await accounts[0]

			await contract.methods.subscribeToAuthor(author).send({ from: user })
		} catch (err) {
			console.error(err)
		}
	}

	/**
	 * @dev Unsubscribe from an author
	 * @param author Ethereum address of the publishing article's author
	 */
	unsubscribeFromAuthor = async (author) => {
		try {
			const { accounts, contract } = await this.state
			const user = await accounts[0]

			await contract.methods.unsubscribeFromAuthor(author).send({ from: user })
		} catch (err) {
			console.error(err)
		}
	}

	/**
	 * @dev Retrieve the authors in which a user has already subscribed to
	 */
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

	/**
	 * @dev App consists of a sidebar nav that contains the main `ArticleFeed`, author `Subscriptions`,
	 * a `PublishArticleForm`, and `Collection` to display authored content. If the state is currently
	 * loading, then a `LoadingSpinner` is displayed; if there's an error, then either the `NoWalletError`,
	 * `NotFoundErrorPage`, or `IncorrectNetworkErrorPage` page is shown.
	 */
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
											web3={this.state.web3}
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
							<Route
								path='/collection'
								render={(props) =>
									this.state.isLoading ? (
										<LoadingSpinner />
									) : this.state.accounts.length > 0 ? (
										<Collection
											{...props}
											articles={this.state.articles}
											accounts={this.state.accounts}
											subscribeToAuthor={this.subscribeToAuthor}
											subscribedAuthors={this.state.subscribedAuthors}
											unsubscribeFromAuthor={this.unsubscribeFromAuthor}
											isLoading={this.state.isLoading}
											web3={this.state.web3}
										/>
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
