const DecentrastackContract = artifacts.require('./Decentrastack.sol')
const ArticleNFTContract = artifacts.require('./ArticleNFT.sol')

module.exports = function (deployer) {
	deployer.deploy(ArticleNFTContract)
	deployer.link(ArticleNFTContract, DecentrastackContract)
	deployer.deploy(DecentrastackContract)
}
