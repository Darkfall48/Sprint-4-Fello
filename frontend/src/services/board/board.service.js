import { utilService } from '../util.service'
import { storageService } from '../connection/async-storage.service'

const pageSize = 5
const BOARD_KEY = 'boardDB'
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]
_createBoards()

export const boardService = {
  query,
  get,
  remove,
  save,
  getEmptyBoard,
  getDefaultFilter,
  getDefaultSort,
  getRandomBoard,
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
  console.log(filterBy)
  return storageService.query(BOARD_KEY).then((boards) => {
    let filteredBoards = boards
    if (filterBy.name) {
      const regex = new RegExp(filterBy.name, 'i')
      filteredBoards = filteredBoards.filter((board) => regex.test(board.name))
    }
    if (sortBy.name > 0) {
      filteredBoards = filteredBoards.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }
    if (sortBy.name < 0) {
      filteredBoards = filteredBoards.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }
    // Paging
    // const totalPages = Math.ceil(boards.length / pageSize)
    if (filterBy.pageIdx !== undefined) {
      const startIdx = filterBy.pageIdx * pageSize
      filteredBoards = filteredBoards.slice(startIdx, pageSize + startIdx)
    }
    return Promise.resolve(filteredBoards)
  })
}

function get(boardId) {
  return storageService.get(BOARD_KEY, boardId)
}

function remove(boardId) {
  return storageService.remove(BOARD_KEY, boardId)
}

function save(board) {
  if (board._id) {
    return storageService.put(BOARD_KEY, board)
  } else {
    return storageService.post(BOARD_KEY, board)
  }
}

function _createBoards() {
  let boards = utilService.loadFromStorage(BOARD_KEY)
  if (!boards || !boards.length) {
    boards = []
    boards.push(_createBoard('board1'))
    boards.push(_createBoard('board2'))
    boards.push(_createBoard('board3'))
    utilService.saveToStorage(BOARD_KEY, boards)
  }
}

function _createBoard(name) {
  const board = getRandomBoard()
  board._id = utilService.makeId()
  board.name = name
  console.log('Board Created:', board)
  return board
}

function getEmptyBoard() {
  return { name: '', price: '', labels: [], createdAt: null }
}

function getDefaultFilter() {
  return { name: '', price: '', pageIdx: '' }
}

function getDefaultSort() {
  return { name: '' }
}

function getRandomBoard() {
  const board = getEmptyBoard()
  board.name = 'Random ' + utilService.getRandomIntInclusive(4000, 8000)
  board.price = utilService.getRandomIntInclusive(1, 500)
  board.labels = labels
  board.createdAt = Date.now()
  board.inStock = utilService.getRandomIntInclusive(1, 4) >= 2 ? true : false
  return board
}
