//? Libraries
const { AsyncLocalStorage } = require('async_hooks')
//? config
const asyncLocalStorage = new AsyncLocalStorage()

// The AsyncLocalStorage singleton
module.exports = asyncLocalStorage
