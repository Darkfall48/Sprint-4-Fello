//? Libraries
const express = require('express')
//? Controller
const { login, signup, logout } = require('./auth.controller')
//? Config
const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

module.exports = router
