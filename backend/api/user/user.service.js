//? Services
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
//? Data
const ObjectId = require('mongodb').ObjectId
//? Global Variables
const USERS_DB = 'users_col'

module.exports = {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
}

//? Query - List/Filtering/Sorting/Paging
async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection(USERS_DB)
    var users = await collection.find(criteria).toArray()
    users = users.map((user) => {
      delete user.password
      user.createdAt = ObjectId(user._id).getTimestamp()
      //? Returning fake fresh data
      // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
      return user
    })
    return users
  } catch (err) {
    logger.error('Cannot find users', err)
    throw err
  }
}

//? Get - Read
async function getById(userId) {
  try {
    const collection = await dbService.getCollection(USERS_DB)
    const user = await collection.findOne({ _id: ObjectId(userId) })
    delete user.password
    return user
  } catch (err) {
    logger.error(`While finding user by id: ${userId}`, err)
    throw err
  }
}

//? Get - Read
async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection(USERS_DB)
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    logger.error(`While finding user by username: ${username}`, err)
    throw err
  }
}

//? Create - Save
async function add(user) {
  const { fullname, username, password, imgUrl, mentions } = user
  try {
    // peek only updatable fields!
    const userToAdd = {
      fullname: fullname,
      username: username,
      password: password,
      imgUrl: imgUrl,
      mentions: [
        {
          id: mentions?.id,
          boardId: mentions?.boardId,
          taskId: mentions?.taskId,
        },
      ],
    }
    const collection = await dbService.getCollection(USERS_DB)
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    logger.error('Cannot add user', err)
    throw err
  }
}

//? Update - Edit
async function update(user) {
  const { _id, fullname, username, password, imgUrl, mentions } = user
  try {
    // peek only updatable properties
    const userToSave = {
      _id: ObjectId(_id), //? Needed for the returned obj
      fullname: fullname,
      username: username,
      password: password,
      imgUrl: imgUrl,
      mentions: [
        {
          id: mentions?.id,
          boardId: mentions?.boardId,
          taskId: mentions?.taskId,
        },
      ],
    }
    const collection = await dbService.getCollection(USERS_DB)
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    logger.error(`Cannot update user ${user._id}`, err)
    throw err
  }
}

//? Remove - Delete
async function remove(userId) {
  try {
    const collection = await dbService.getCollection(USERS_DB)
    await collection.deleteOne({ _id: ObjectId(userId) })
  } catch (err) {
    logger.error(`Cannot remove user ${userId}`, err)
    throw err
  }
}

//? Private Functions
function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    criteria.$or = [
      {
        username: txtCriteria,
      },
      {
        fullname: txtCriteria,
      },
    ]
  }
  return criteria
}
