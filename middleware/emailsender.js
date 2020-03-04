module.exports = function sendEmail(req, res, next) {
    console.log('Sending email');
    next();
}