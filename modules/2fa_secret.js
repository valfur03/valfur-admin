const tfa = require("node-2fa");

function new_secret() {
	// Generate the secret
	const name = "TFA Cloner";
	const secret = tfa.generateSecret({name: name});
	console.log(secret);
	return (secret)
}

module.exports = { new_secret };