module.exports = function authenticator(req, res, next) {
    console.log('Authenticating User');
    next();
}