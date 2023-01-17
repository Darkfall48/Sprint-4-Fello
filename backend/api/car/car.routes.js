const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getCars, getCarById, addCar, updateCar, removeCar, addCarMsg, removeCarMsg } = require('./car.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getCars)
router.get('/:id', getCarById)
router.post('/', requireAuth, addCar)
router.put('/:id', requireAuth, updateCar)
router.delete('/:id', requireAuth, removeCar)
// router.delete('/:id', requireAuth, requireAdmin, removeCar)

router.post('/:id/msg', requireAuth, addCarMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeCarMsg)

module.exports = router