const PostContract = artifacts.require('./Post.sol')

module.exports = function (deployer) {
	deployer.deploy(PostContract)
}
