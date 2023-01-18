import { utilService } from '../util.service'
import { storageService } from '../connection/async-storage.service'

const pageSize = 5
const BOARD_KEY = 'boardDB'
const labels = ['label1', 'label2', 'label3', 'label4', 'label5', 'label6']

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
  getDemoGroups,
}

function query() {
  return Promise.resolve(storageService.query(BOARD_KEY))
  // function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
  //   console.log(filterBy)
  // return storageService.query(BOARD_KEY)
  //      .then((boards) => {
  //     let filteredBoards = boards
  //     if (filterBy.name) {
  //       const regex = new RegExp(filterBy.name, 'i')
  //       filteredBoards = filteredBoards.filter((board) => regex.test(board.name))
  //     }
  //     if (sortBy.name > 0) {
  //       filteredBoards = filteredBoards.sort((a, b) =>
  //         a.name.localeCompare(b.name)
  //       )
  //     }
  //     if (sortBy.name < 0) {
  //       filteredBoards = filteredBoards.sort((a, b) =>
  //         a.name.localeCompare(b.name)
  //       )
  //     }
  //     // Paging
  //     // const totalPages = Math.ceil(boards.length / pageSize)
  //     if (filterBy.pageIdx !== undefined) {
  //       const startIdx = filterBy.pageIdx * pageSize
  //       filteredBoards = filteredBoards.slice(startIdx, pageSize + startIdx)
  //     }
  // })
  // return Promise.resolve(filteredBoards)
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

// function _createBoard() {
//   const board = {
//     "title": "Robot dev proj",
//     "createdAt": 1589983468418,

//   }
//   board._id = utilService.makeId()
//   console.log('Board Created:', board)
//   return board
// }

function getEmptyBoard() {
  return {
    _id: utilService.makeId(),
    title: '',
    createdAt: Date.now(),
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

function _createBoards() {
  let boards = utilService.loadFromStorage(BOARD_KEY)
  if (!boards || !boards.length) {
    const boards = [
      _createBoard('Robot Board'),
      _createBoard('Alien Board'),
      _createBoard('Cat Board'),
      _createBoard('Dog Board'),
    ]
    utilService.saveToStorage(BOARD_KEY, boards)
  }
}

function _createBoard(title) {
  return [
    {
      _id: 'b' + utilService.getRandomIntInclusive(100, 900),
      title,
      isStarred: utilService.getRandomIntInclusive(1, 4) >= 2 ? true : false,
      archivedAt: Date.now(),
      createdBy: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
      },
      labels: [
        {
          id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
      ],
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl: 'https://www.google.com',
        },
      ],
      groups: _createGroups(),
      activities: [
        {
          id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
          },
          task: {
            id: 'c101',
            title: 'Replace Logo',
          },
        },
      ],
      cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
    },
  ]
}

function _createGroups() {
  return [
    _createGroup('Group 1'),
    _createGroup('Group 2'),
    _createGroup('Group 3'),
    _createGroup('Group 4'),
  ]
}

function _createGroup(title) {
  return [
    {
      id: 'g' + utilService.getRandomIntInclusive(100, 900),
      title,
      archivedAt: 1589983468418,
      tasks: _createTasks(),
      style: {},
    },
  ]
}

function _createTasks() {
  return [
    _createTask(utilService.makeLorem(6)),
    _createTask(utilService.makeLorem(8)),
    _createTask(utilService.makeLorem(4)),
    _createTask(utilService.makeLorem(10)),
  ]
}

function _createTask(title) {
  return [
    {
      id: 'c' + utilService.getRandomIntInclusive(100, 900),
      title,
    },
  ]
}

function getDemoGroups() {
  return [
    {
      id: 'g101',
      title: 'To do',
      archivedAt: 1589983468418,
      tasks: [
        {
          id: 'c101',
          title: 'Replace logo',
        },
        {
          id: 'c102',
          title: 'Add Samples',
        },
      ],
      style: {},
    },
    {
      id: 'g102',
      title: 'Done',
      tasks: [
        {
          id: 'c103',
          title: 'Do that',
          archivedAt: 1589983468418,
        },
        {
          id: 'c104',
          title: 'Help me',
          status: 'in-progress',
          description: 'description',
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#26de81',
          },
        },
      ],
      style: {},
    },
  ]
}
