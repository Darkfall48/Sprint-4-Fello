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
  // getRandomBoard,
  getDemoGroups
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
    boards.push(_createBoard() )
    utilService.saveToStorage(BOARD_KEY, boards)
  }
}

function _createBoard() {
  const board = {
    "title": "Robot dev proj",
    "createdAt": 1589983468418,

  }
  board._id = utilService.makeId()
  console.log('Board Created:', board)
  return board
}

function getEmptyBoard() {
  return {
    "_id": utilService.makeId(),
    "title": '',
    "createdAt": Date.now(),
  }
}

function getDefaultFilter() {
  return { name: '', price: '', pageIdx: '' }
}

function getDefaultSort() {
  return { name: '' }
}

// function getRandomBoard() {
//   const board = getEmptyBoard()
//   board.name = 'Random ' + utilService.getRandomIntInclusive(4000, 8000)
//   board.price = utilService.getRandomIntInclusive(1, 500)
//   board.labels = labels
//   board.createdAt = Date.now()
//   board.inStock = utilService.getRandomIntInclusive(1, 4) >= 2 ? true : false
//   return board
// }

function getDemoGroups(){
  return [
    {
        id: "g101",
        title: "To do",
        archivedAt: 1589983468418,
        tasks: [
            {
                id: "c101",
                title: "Replace logo"
            },
            {
                id: "c102",
                title: "Add Samples"
            }
        ],
        style: {}
    },
    {
        id: "g102",
        title: "Done",
        tasks: [
            {
                id: "c103",
                title: "Do that",
                archivedAt: 1589983468418
            },
            {
                id: "c104",
                title: "Help me",
                status: "in-progress",
                description: "description",
                comments: [
                    {
                        id: "ZdPnm",
                        txt: "also @yaronb please CR this",
                        createdAt: 1590999817436.0,
                        byMember: {
                            _id: "u101",
                            fullname: "Tal Tarablus",
                            imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    }
                ],
                checklists: [
                    {
                        id: "YEhmF",
                        title: "Checklist",
                        todos: [
                            {
                                id: "212jX",
                                title: "To Do 1",
                                isDone: false
                            }
                        ]
                    }
                ],
                memberIds: [
                    "u101"
                ],
                labelIds: [
                    "l101",
                    "l102"
                ],
                createdAt: 1590999730348,
                dueDate: 16156215211,
                byMember: {
                    _id: "u101",
                    username: "Tal",
                    fullname: "Tal Tarablus",
                    imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                },
                style: {
                    bgColor: "#26de81"
                }
            }
        ],
        style: {}
    }
]
}