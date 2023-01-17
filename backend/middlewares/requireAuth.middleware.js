const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')
const config = require('../config')

function requireAuth(req, res, next) {

    if (config.isGuestMode && !req?.cookies?.loginToken) {
        req.loggedinUser = { _id: '', fullname: 'Guest' }
        return next()
    }

    if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Not Authenticated')
    req.loggedinUser = loggedinUser
    next()
}

function requireAdmin(req, res, next) {
    if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    if (!loggedinUser.isAdmin) {
        logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
        res.status(403).end('Not Authorized')
        return
    }
    next()
}


// module.exports = requireAuth

module.exports = {
    requireAuth,
    requireAdmin
}
