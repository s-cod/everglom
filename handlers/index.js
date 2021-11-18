const bodyParser = require('./body-parser')
const errors = require('./errors')
const passportInit = require('./passport-jwt')

module.exports = [bodyParser, errors, passportInit]
