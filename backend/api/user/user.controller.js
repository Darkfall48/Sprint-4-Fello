//? Services
const socketService = require('../../services/socket.service')
const userService = require('./user.service')
const logger = require('../../services/logger.service')

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
}

//? Query - List/Filtering/Sorting/Paging
async function getUsers(req, res) {
  try {
    const filterBy = {
      txt: req.query?.txt || '',
      minBalance: +req.query?.minBalance || 0,
    }
    logger.debug('Getting Users..')
    const users = await userService.query(filterBy)
    logger.debug('Users got successfully!')
    res.json(users)
  } catch (err) {
    logger.error('Failed to get users', err)
    res.status(500).send({ err: 'Failed to get users' })
  }
}

//? Get - Read
async function getUser(req, res) {
  try {
    const userId = req.params.id
    logger.debug('Getting User..', userId)
    const user = await userService.getById(userId)
    logger.debug('User got successfully!', userId)
    res.json(user)
  } catch (err) {
    logger.error('Failed to get user', err)
    res.status(500).send({ err: 'Failed to get user' })
  }
}

//? Update - Edit
async function updateUser(req, res) {
  try {
    const user = req.body
    logger.debug('Updating User..', user._id)
    const savedUser = await userService.update(user)
    logger.debug('User updated successfully!', user._id)
    // res.json(savedUser)
    res.send(savedUser)
  } catch (err) {
    logger.error('Failed to update user', err)
    res.status(500).send({ err: 'Failed to update user' })
  }
}

//? Remove - Delete
async function deleteUser(req, res) {
  try {
    const userId = req.params.id
    logger.debug('Removing User..', userId)
    await userService.remove(userId)
    logger.debug('User removed successfully!', userId)
    res.send({ msg: 'Deleted successfully' })
  } catch (err) {
    logger.error('Failed to delete user', err)
    res.status(500).send({ err: 'Failed to delete user' })
  }
}
