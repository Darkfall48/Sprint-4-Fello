var config

if (process.env.NODE_ENV === 'production') {
  config = require('./prod')
} else {
  config = require('./dev')
}
config.isGuestMode = true
console.log('config', config)

module.exports = config
