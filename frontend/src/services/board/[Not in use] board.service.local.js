import { utilService } from '../util.service'
import { storageService } from '../connection/async-storage.service'
import imgUrlMember1 from '../../assets/img/members/member1.png'
import imgUrlMember2 from '../../assets/img/members/member2.png'
import imgUrlMember3 from '../../assets/img/members/member3.jpg'

const BOARD_KEY = 'boardDB'

_createBoards()

export const boardService = {
  query,
  get,
  remove,
  save,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getDefaultFilter,
  getDefaultSort,
  getImages,
  getColors,
  getEmptyTodo,
  getEmptyChecklist,
  getCoverColors,
  getLabelColors,
  getEmptyAttachment,
  getGroupById,
  swapItemBetweenLists,
  reorder,
  // getRandomBoard,
}

async function query() {
  try {
    return await storageService.query(BOARD_KEY)
  } catch (err) {
    console.log('Cannot load boards', err)
    throw err
  }
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
  // })
  // return Promise.resolve(filteredBoards)
}

async function get(boardId) {
  try {
    return await storageService.get(BOARD_KEY, boardId)
  } catch (err) {
    console.log('Cannot get board:', boardId, err)
    throw err
  }
}

async function remove(boardId) {
  try {
    return await storageService.remove(BOARD_KEY, boardId)
  } catch (err) {
    console.log('Cannot remove board:', boardId, err)
    throw err
  }
}

async function save(board) {
  try {
    if (board._id) {
      return await storageService.put(BOARD_KEY, board)
    } else {
      board._id = utilService.makeId()
      return await storageService.post(BOARD_KEY, board)
    }
  } catch (err) {
    console.log('Cannot save board', err)
    throw err
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

//make it async?
function getGroupById(board, groupId) {
  return board.groups.find((group) => group.id === groupId)
}

function getEmptyBoard() {
  return {
    // _id: utilService.makeId(),
    title: '',
    archivedAt: Date.now(),
    lastViewed: Date.now(),
    isStarred: false,
    style: {
      bgColor: '#0079bf',
      backgroundImg: '',
    },
    groups: [],
  }
}

function getEmptyGroup(groupTitle) {
  return {
    id: utilService.makeId(),
    title: groupTitle,
    archivedAt: Date.now(),
    tasks: [],
    style: {},
  }
}

function getEmptyTask(taskTitle) {
  return {
    id: utilService.makeId(),
    title: taskTitle,
    archivedAt: Date.now(),
    style: {},
    priority: 'low',
    description: '',
    comments: [],
    checklists: [],
    memberIds: [],
    labelIds: [],
    attachments: [],
    dueDate: null,
    byMember: {},
    style: {},
  }
}

function getEmptyChecklist() {
  return {
    id: utilService.makeId(5),
    title: 'Checklist',
    todos: [],
  }
}

function getEmptyTodo() {
  return {
    id: utilService.makeId(5),
    title: '',
    isDone: false,
  }
}

function getEmptyAttachment() {
  return {
    id: utilService.makeId(5),
    title: '',
    img: '',
    createdAt: Date.now(),
    comment: [],
  }
}

function getDefaultFilter() {
  return { name: '', price: '', pageIdx: '' }
}

function getDefaultSort() {
  return { name: '' }
}

function swapItemBetweenLists(
  sourceList,
  destinationList,
  sourceIdx,
  destinationIdx
) {
  const deletedItem = sourceList.tasks.splice(sourceIdx, 1)
  destinationList.tasks.push(...deletedItem)
  return reorder(
    destinationList.tasks,
    destinationList.tasks.length - 1,
    destinationIdx
  )
}

function reorder(arr, startIdx, endIdx) {
  const orderedArr = [...arr]
  const [removed] = orderedArr.splice(startIdx, 1)
  orderedArr.splice(endIdx, 0, removed)
  return orderedArr
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
      _createBoard(
        'Work Board',
        'https://images.unsplash.com/photo-1671894618012-b1f9d305a97f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
        'rgba(26,93,112,1)',
        false
      ),
      _createBoard(
        'Working On',
        'https://images.unsplash.com/photo-1673605124954-132c332de83f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        'rgba(101,148,180,1)',
        true
      ),
      _createBoard(
        'Daily Task',
        'https://images.unsplash.com/photo-1673768501816-6a565f620309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        'rgba(35,49,35,1)',
        false
      ),
      _createBoard('Project Management', '', '#509938', false),
      // _createBoard('Project Management', 'https://images.unsplash.com/photo-1539807134273-f97ed182b488?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2115&q=80'),
    ]
    utilService.saveToStorage(BOARD_KEY, boards)
  }
}

function _createBoard(title, backgroundImg, bgColor, isStarred) {
  return {
    _id: 'b' + utilService.getRandomIntInclusive(100, 900),
    title,
    isStarred,
    archivedAt: Date.now(),
    lastViewed: Date.now(),
    createdBy: {
      _id: 'u103',
      fullname: 'Keren Siebner',
      imgUrl: { imgUrlMember3 },
    },
    style: {
      bgColor,
      backgroundImg,
    },
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#7bc86c',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#f5dd29',
      },
      {
        id: 'l103',
        title: 'To Do!',
        color: '#ffaf3f',
      },
      {
        id: 'l104',
        title: 'Later',
        color: '#ef7564',
      },
      {
        id: 'l105',
        title: 'Reported',
        color: '#cd8de5',
      },
      {
        id: 'l106',
        title: 'Abandoned',
        color: '#5ba4cf',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Yael Tal',
        imgUrl: `${imgUrlMember1}`,
      },
      {
        _id: 'u102',
        fullname: 'Sidney Sebban',
        imgUrl: `${imgUrlMember2}`,
      },
      {
        _id: 'u103',
        fullname: 'Keren Siebner',
        imgUrl: `${imgUrlMember3}`,
      },
    ],
    groups: [
      {
        id: 'g101',
        title: 'I am a special Group',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c101',
            title: 'I am c101',
            priority: 'medium',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Keren Siebner',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [
              {
                id: utilService.makeId(5),
                title: 'Shared Background',
                img: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/315d250bcd06a5f6dd93dae1bd19318f/photo-1461896836934-ffe607ba8211.jpg',
                createdAt: Date.now(),
                comment: [],
              },
            ],
            comments: [],
            checklists: [
              {
                id: utilService.makeId(5),
                title: 'Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: true,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 3',
                    isDone: true,
                  },
                ],
              },
              {
                id: utilService.makeId(5),
                title: 'Another Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: false,
                  },
                ],
              },
            ],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c102',
            title: 'I am c102',
            priority: 'medium',
            description: 'I am a description',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Keren Siebner',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            checklists: [
              {
                id: utilService.makeId(5),
                title: 'Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: true,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 3',
                    isDone: true,
                  },
                ],
              },
              {
                id: utilService.makeId(5),
                title: 'Another Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: false,
                  },
                ],
              },
            ],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
        ],
        style: {},
      },
      {
        id: 'g' + utilService.getRandomIntInclusive(100, 900),
        title: 'Working on',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'build basic crud',
            priority: 'medium',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Keren Siebner',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            checklists: [
              {
                id: utilService.makeId(5),
                title: 'Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: true,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 3',
                    isDone: true,
                  },
                ],
              },
              {
                id: utilService.makeId(5),
                title: 'Another Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: false,
                  },
                ],
              },
            ],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Functional testing for app header',
            priority: 'medium',
            description: 'description',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Keren Siebner',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            checklists: [
              {
                id: utilService.makeId(5),
                title: 'Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: true,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 3',
                    isDone: true,
                  },
                ],
              },
              {
                id: utilService.makeId(5),
                title: 'Another Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: false,
                  },
                ],
              },
            ],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Add drag and drop',
            priority: 'medium',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Yael Tal',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            checklists: [],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
        ],
        style: {},
      },
      {
        id: 'g' + utilService.getRandomIntInclusive(100, 900),
        title: 'Bugs',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Check for bugs',
            priority: 'medium',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Keren Siebner',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u102',
                  fullname: 'Sidney Sebban',
                  imgUrl: { imgUrlMember2 },
                },
              },
            ],
            checklists: [
              {
                id: utilService.makeId(5),
                title: 'Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: true,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 3',
                    isDone: true,
                  },
                ],
              },
              {
                id: utilService.makeId(5),
                title: 'Another Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: false,
                  },
                ],
              },
            ],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
        ],
        style: {},
      },
      {
        id: 'g' + utilService.getRandomIntInclusive(100, 900),
        title: 'Testing',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'System Activities',
            priority: 'high',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Yael Tal',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            checklists: [],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Rules',
            priority: 'medium',
            description: 'description',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Sidney Sebban',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u102',
                  fullname: 'Sidney Sebban',
                  imgUrl: { imgUrlMember2 },
                },
              },
              {
                id: 'ZdPnm',
                txt: "don't forget to add what we talked about today",
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u102',
                  fullname: 'Keren Siebner',
                  imgUrl: { imgUrlMember2 },
                },
              },
            ],
            checklists: [
              {
                id: utilService.makeId(5),
                title: 'Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },

                  {
                    id: utilService.makeId(5),
                    title: 'To Do 3',
                    isDone: true,
                  },
                ],
              },
              {
                id: utilService.makeId(5),
                title: 'Another Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
        ],
        style: {},
      },
      {
        id: 'g' + utilService.getRandomIntInclusive(100, 900),
        title: 'Done',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Apply socket service',
            priority: 'high',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Yael Tal',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            checklists: [],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Data base implementation',
            priority: 'high',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Yael Tal',
              imgUrl: { imgUrlMember1 },
            },
            comments: [],
            checklists: [],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Add user authentication',
            priority: 'high',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Sidney Sebban',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [
              {
                id: utilService.makeId(5),
                txt: "don't forget to check",
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u102',
                  fullname: 'Yael Tal',
                  imgUrl: { imgUrlMember2 },
                },
              },
            ],
            checklists: [
              {
                id: utilService.makeId(5),
                title: 'Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },

                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: true,
                  },
                ],
              },
              {
                id: utilService.makeId(5),
                title: 'Another Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Add node.js modules',
            priority: 'high',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Yael Tal',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            checklists: [],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
        ],
        style: {},
      },
      {
        id: 'g' + utilService.getRandomIntInclusive(100, 900),
        title: 'QA',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Automation tests',
            priority: 'high',
            description: 'make a checklist',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Keren Siebner',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u102',
                  fullname: 'Yael tal',
                  imgUrl: { imgUrlMember2 },
                },
              },
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u102',
                  fullname: 'Sidney Sebban',
                  imgUrl: { imgUrlMember2 },
                },
              },
            ],
            checklists: [],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Finish making more customization options',
            priority: 'low',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Yael Tal',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            checklists: [],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
        ],
      },
      {
        id: 'g' + utilService.getRandomIntInclusive(100, 900),
        title: 'Ready for production',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'Create a database with mongo',
            priority: 'high',
            description: 'Database needs to be implemented using MongoDB',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Keren Siebner',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u102',
                  fullname: 'Sidney Sebban',
                  imgUrl: { imgUrlMember2 },
                },
              },
            ],
            checklists: [
              {
                id: utilService.makeId(5),
                title: 'Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: true,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 3',
                    isDone: true,
                  },
                ],
              },
              {
                id: utilService.makeId(5),
                title: 'Another Checklist',
                todos: [
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 1',
                    isDone: false,
                  },
                  {
                    id: utilService.makeId(5),
                    title: 'To Do 2',
                    isDone: false,
                  },
                ],
              },
            ],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'bug search',
            priority: 'low',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Yael Tal',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [],
            checklists: [],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
          {
            id: 'c' + utilService.getRandomIntInclusive(100, 900),
            title: 'make a login system',
            priority: 'low',
            description: '',
            memberIds: utilService.getRandomMembers(),
            labelIds: utilService.getRandomLabels(),
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal123',
              fullname: 'Yael Tal',
              imgUrl: { imgUrlMember1 },
            },
            attachments: [],
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u102',
                  fullname: 'Sidney Sebban',
                  imgUrl: { imgUrlMember2 },
                },
              },
              {
                id: 'ZdPnm',
                txt: "don't forget to add what we talked about today",
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u102',
                  fullname: 'Keren Siebner',
                  imgUrl: { imgUrlMember2 },
                },
              },
            ],
            checklists: [],
            style: {
              bgColor:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenColor()
                  : '',
              bgImg:
                utilService.getRandomIntInclusive(1, 4) <= 2
                  ? utilService.getRandomChosenImg()
                  : '',
            },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u102',
          fullname: 'Sidney Sebban',
          imgUrl: imgUrlMember2,
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
      {
        id: 'a102',
        txt: 'Updated task name',
        createdAt: 154515,
        byMember: {
          _id: 'u102',
          fullname: 'Sidney Sebban',
          imgUrl: imgUrlMember2,
        },
        task: {
          id: 'c101',
          title: 'Update Task Name!',
        },
      },
      {
        id: 'a103',
        txt: 'Changed cover',
        createdAt: 154515,
        byMember: {
          _id: 'u102',
          fullname: 'Sidney Sebban',
          imgUrl: imgUrlMember2,
        },
        task: {
          id: 'c102',
          title: 'Change task cover to blue',
        },
      },
    ],
    cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
  }
}

function _createGroups() {
  return [
    _createGroup('Working on'),
    _createGroup('Bugs'),
    _createGroup('Testing'),
    _createGroup('Done'),
  ]
}

function _createGroup(title) {
  return {
    id: 'g' + utilService.getRandomIntInclusive(100, 900),
    title,
    archivedAt: 1589983468418,
    tasks: [
      {
        id: 'c' + utilService.getRandomIntInclusive(100, 900),
        title: 'build basic crud',
        priority: 'high',
        description: '',
        memberIds: utilService.getRandomMembers(),
        labelIds: utilService.getRandomLabels(),
        dueDate: 16156215211,
        byMember: {
          _id: 'u101',
          username: 'Tal123',
          fullname: 'Yael Tal',
          imgUrl: { imgUrlMember1 },
        },
        style: {
          bgColor:
            utilService.getRandomIntInclusive(1, 4) <= 2
              ? utilService.getRandomChosenColor()
              : '',
          bgImg:
            utilService.getRandomIntInclusive(1, 4) <= 2
              ? utilService.getRandomChosenImg()
              : '',
        },
      },
      {
        id: 'c' + utilService.getRandomIntInclusive(100, 900),
        title: 'build basic crud',
        priority: 'high',
        description: 'description',
        memberIds: utilService.getRandomMembers(),
        labelIds: utilService.getRandomLabels(),
        dueDate: 16156215211,
        byMember: {
          _id: 'u101',
          username: 'Tal123',
          fullname: 'Yael Tal',
          imgUrl: { imgUrlMember1 },
        },
        style: {
          bgColor:
            utilService.getRandomIntInclusive(1, 4) <= 2
              ? utilService.getRandomChosenColor()
              : '',
          bgImg:
            utilService.getRandomIntInclusive(1, 4) <= 2
              ? utilService.getRandomChosenImg()
              : '',
        },
      },
    ],
    style: {},
  }
}

function _createTasks() {
  return [
    _createTask('Build basic crud'),
    _createTask('Adding npm packages'),
    _createTask('Create backend'),
    // _createTask(utilService.makeLorem(10)),
  ]
}

function _createTask(title) {
  return {
    id: 'c' + utilService.getRandomIntInclusive(100, 900),
    title,
    priority: 'high',
    description: 'description',
    comments: [
      {
        id: 'ZdPnm',
        txt: 'also @yaronb please CR this',
        createdAt: 1590999817436,
        byMember: {
          _id: 'u102',
          fullname: 'Sidney Sebban',
          imgUrl: { imgUrlMember2 },
        },
      },
      {
        id: 'fvsdg',
        txt: 'also @yaronb please CR this',
        createdAt: 1590999817436,
        byMember: {
          _id: 'u102',
          fullname: 'Keren Siebner',
          imgUrl: { imgUrlMember2 },
        },
      },
      {
        id: 'gds26',
        txt: 'never mind',
        createdAt: 1590999817436,
        byMember: {
          _id: 'u102',
          fullname: 'Keren Siebner',
          imgUrl: { imgUrlMember2 },
        },
      },
    ],
    checklists: [
      {
        id: utilService.makeId(5),
        title: 'Checklist',
        todos: [
          {
            id: utilService.makeId(5),
            title: 'To Do 1',
            isDone: false,
          },
          {
            id: utilService.makeId(5),
            title: 'To Do 2',
            isDone: true,
          },
          {
            id: utilService.makeId(5),
            title: 'To Do 3',
            isDone: true,
          },
        ],
      },
      {
        id: utilService.makeId(5),
        title: 'Another Checklist',
        todos: [
          {
            id: utilService.makeId(5),
            title: 'To Do 1',
            isDone: false,
          },
          {
            id: utilService.makeId(5),
            title: 'To Do 2',
            isDone: false,
          },
        ],
      },
    ],
    memberIds: utilService.getRandomMembers(),
    labelIds: utilService.getRandomLabels(),
    dueDate: 16156215211,
    byMember: {
      _id: 'u101',
      username: 'Tal123',
      fullname: 'Yael Tal',
      imgUrl: { imgUrlMember1 },
    },
    style: {
      bgColor:
        utilService.getRandomIntInclusive(1, 4) <= 2
          ? utilService.getRandomChosenColor()
          : '',
      bgImg:
        utilService.getRandomIntInclusive(1, 4) <= 2
          ? utilService.getRandomChosenImg()
          : '',
    },
  }
}

function getImages() {
  return [
    'https://images.unsplash.com/photo-1671894618012-b1f9d305a97f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    'https://images.unsplash.com/photo-1673768501816-6a565f620309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1673605124954-132c332de83f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    // 'https://images.unsplash.com/photo-1673660199123-b793cdee4980?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1539807134273-f97ed182b488?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2115&q=80',
    // 'https://images.unsplash.com/photo-1673715852601-987ac8f3b9ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  ]
}

function getColors() {
  return ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e']
  // return ['#5ba4cf', '#f5dd29', '#7bc86c', '#ef7564', '#cd8de5']
}

function getCoverColors() {
  return [
    '#7BC86C',
    '#F5DD29',
    '#FFAF3F',
    '#EF7564',
    '#CD8DE5',
    '#5BA4CF',
    '#29CCE5',
    '#6DECA9',
    '#FF8ED4',
    '#172B4D',
  ]
}

function getLabelColors() {
  return [
    '#B7DDB0',
    '#F5EA92',
    '#FAD29C',
    '#EFB3AB',
    '#DFC0EB',
    '#7BC86C',
    '#F5DD29',
    '#FFAF3F',
    '#EF7564',
    '#CD8DE5',
    '#5AAC44',
    '#E6C60D',
    '#E79217',
    '#CF513D',
    '#A86CC1',
    '#8BBDD9',
    '#8FDFEB',
    '#B3F1D0',
    '#F9C2E4',
    '#172b4d',
    '#5BA4CF',
    '#29CCE5',
    '#6DECA9',
    '#FF8ED4',
    '#344563',
    '#026AA7',
    '#00AECC',
    '#4ED583',
    '#e568af',
    '#505f79',
  ]
}
