const DecentrastackContract = artifacts.require('./Decentrastack.sol')

module.exports = function (deployer) {
	deployer.deploy(DecentrastackContract)
}
