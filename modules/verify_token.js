const jwt = require("jsonwebtoken");
const { get_user_by_session_id } = require("../routes/user/query/get_user");

module.exports = function verifyToken(level) {
	return async (req, res, next) => {
		//	Get the token
		if (!req.header("Authorization")) return (res.status(401).send({message: "Token needed"}));
		const token = req.header("Authorization").split(' ')[1];
		//	Verify the token
		var verified;
		try {
			verified = jwt.verify(token, process.env.TOKEN_SECRET);
		} catch (error) {
			return (res.status(400).send({message: "Invalid token"}));
		}
		//	Get the user data
		try {
			req.user = await get_user_by_session_id(verified.session_id);
			if (!req.user) return (res.status(400).send({message: "Incorrect session id"}));
		} catch (error) {
			return (res.status(error.code).send(error.message));
		}
		//	Check the user level
		if (level !== undefined) {
			if (req.user.level > level) return (res.status(403).send({message: "Forbidden"}));
		}
		next();
	}
}