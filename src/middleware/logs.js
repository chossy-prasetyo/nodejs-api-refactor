const log_request = (req, res, next) => {
	console.log(`${req.method} ${req.path}`)
	next()
}

module.exports = log_request