// src/server/utils/sessionUtils.js
const getTokenFromSession = (req) => {
	return req.session.token || null;
};

const getUserFromSession = (req) => {
	return req.session.username || null;
};

const setTokenInSession = (req, token) => {
	req.session.token = token;
};

const setUserInSession = (req, username) => {
	console.log("Setting user in session: ", username);
	req.session.username = username;
	console.log("Req session is set: ", req.session);
	req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
        }
    });
	console.log("Req session is set: ", req.session);
};

const clearSession = (req) => {
	req.session.destroy((err) => {
		if (err) {
			console.error('Error destroying session:', err);
		}
	});
};

module.exports = {
	getTokenFromSession,
	setTokenInSession,
	getUserFromSession,
	setUserInSession,
	clearSession,
};