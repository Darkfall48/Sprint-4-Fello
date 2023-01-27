//? Services
const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
//? Data
const ObjectId = require('mongodb').ObjectId
//? Global Variables
const BOARDS_DB = 'boards_col'
// const PAGE_SIZE = 10

module.exports = {
  query,
  getById,
  add,
  update,
  remove,
  // addBoardMsg,
  // removeBoardMsg,
}

//? Query - List/Filtering/Sorting/Paging
async function query(query) {
  try {
    //? DONE: FILTERING/SORTING/PAGING
    const sortCriteria = _buildSortCriteria(query)
    const filterCriteria = _buildFilterCriteria(query)
    const collection = await dbService.getCollection(BOARDS_DB)
    let boards = await collection
      .find(filterCriteria)
      .sort(sortCriteria)
      .toArray()

    return _setPage(query, boards)
  } catch (err) {
    logger.error('Cannot find boards', err)
    throw err
  }
}

//? Create - Save
async function add(board) {
  try {
    const collection = await dbService.getCollection(BOARDS_DB)
    await collection.insertOne(board)
    return board
  } catch (err) {
    logger.error('Cannot insert board', err)
    throw err
  }
}

//? Update - Edit
async function update(board) {
  // console.log('board.groups',board.groups[0].tasks)
  try {
    const {
      title,
      archivedAt,
      createdAt,
      createdBy,
      labels,
      style,
      members,
      groups,
      activities,
      isStarred,
    } = board
    const boardToSave = {
      title,
      archivedAt,
      createdAt,
      createdBy,
      labels,
      style,
      members,
      groups,
      activities,
      isStarred,
    }
    const collection = await dbService.getCollection(BOARDS_DB)
    await collection.updateOne(
      { _id: ObjectId(board._id) },
      { $set: boardToSave }
    )
    return board
  } catch (err) {
    logger.error(`Cannot update board ${boardId}`, err)
    throw err
  }
}

//? Get - Read
async function getById(boardId) {
  try {
    const collection = await dbService.getCollection(BOARDS_DB)
    const board = collection.findOne({ _id: ObjectId(boardId) })
    // TODO: Return error if boardId is not found
    return board
  } catch (err) {
    logger.error(`While finding board ${boardId}:`, err)
    throw err
  }
}

//? Remove - Delete
async function remove(boardId) {
  try {
    const collection = await dbService.getCollection(BOARDS_DB)
    await collection.deleteOne({ _id: ObjectId(boardId) })
    // TODO: Return error if boardId is not found
    return boardId
  } catch (err) {
    logger.error(`Cannot remove board ${boardId}`, err)
    throw err
  }
}

//? Private Functions - Query - List/Filtering/Sorting/Paging

function _buildFilterCriteria(filterBy) {
  const {
    title,
    archivedAt,
    createdAt,
    createdBy,
    labels,
    style,
    members,
    groups,
    activities,
  } = filterBy
  let criteria = {}
  if (title) criteria.name = { $regex: title ? title : '', $options: 'i' }
  if (labels?.length) criteria.labels = { $all: labels.split(',') }
  if (members?.length) criteria.members = { $all: members.split(',') }
  return criteria
}

function _buildSortCriteria(filterBy) {
  const { sortBy, sortValue } = filterBy
  return { [sortBy ? sortBy : 'createdAt']: sortValue ? 1 : -1 }
}

function _setPage(filterBy, boards) {
  const { pageSize, pageIdx } = filterBy
  if (!pageSize) return boards
  let startIdx = null
  if (pageIdx !== undefined) startIdx = pageIdx * +pageSize
  return boards.slice(startIdx, +pageSize + startIdx)
}
