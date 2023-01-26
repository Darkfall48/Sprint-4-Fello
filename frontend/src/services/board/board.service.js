//? Services
import { utilService } from '../util.service'
import { httpService } from '../connection/http.service'
//? Private Variables
const BASE_URL = 'board/'

export const boardService = {
  query,
  get,
  save,
  remove,
  getDefaultFilter,
  getDefaultSort,
  getDefaultPage,
  getFromSearchParams,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
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
}

//? Query - List/Filtering/Sorting/Paging
async function query({
  filter = getDefaultFilter(),
  sort = getDefaultSort(),
  page = getDefaultPage(),
} = {}) {
  // console.log('Filter:', filter)
  // console.log('Sort:', sort)
  // console.log('Page', page)
  // Getting the values
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
  } = filter
  const { sortBy, sortValue } = sort
  const { pageSize, pageIdx } = page

  // Preparing the query params string
  const filterParams = `title=${title}&labels=${labels}`
  const sortParams = `sortBy=${sortBy}&sortValue=${sortValue}`
  const pageParams = `pageSize=${pageSize}&pageIdx=${pageIdx}`

  const queryParams = '?' + filterParams + '&' + sortParams + '&' + pageParams
  try {
    // return await httpService.get(BASE_URL + queryParams).then((res) => res)
    return await httpService.get(BASE_URL).then((res) => res)
  } catch (err) {
    console.log('Cannot find boards', err)
    throw err
  }
}

//? Get - Read
async function get(boardId) {
  try {
    return await httpService.get(BASE_URL + boardId)
  } catch (err) {
    console.log('Cannot find board', err)
    throw err
  }
}

//? Create / Update - Save
async function save(board) {
  const { _id: boardId } = board
  try {
    if (boardId) return await httpService.put(BASE_URL + boardId, board)
    return await httpService.post(BASE_URL, board)
  } catch (err) {
    console.log('Cannot update/create board', boardId, ':', err)
    throw err
  }
}

//? Remove - Delete
async function remove(boardId) {
  try {
    return await httpService.delete(BASE_URL + boardId)
  } catch (err) {
    console.log('Cannot remove board', boardId, ':', err)
    throw err
  }
}

function getDefaultFilter() {
  return { name: '', maxPrice: '', inStock: '', labels: '' }
}

function getDefaultSort() {
  return { sortBy: '', sortValue: '' }
}

function getDefaultPage() {
  return { pageSize: '', pageIdx: '' }
}

function getFromSearchParams(searchParams) {
  const filter = { ...getDefaultFilter() }
  const sort = { ...getDefaultSort() }
  const page = { ...getDefaultPage() }

  for (const field in filter) {
    filter[field] = searchParams.get(field) || ''
  }
  for (const field in sort) {
    sort[field] = searchParams.get(field) || ''
  }
  for (const field in page) {
    page[field] = searchParams.get(field) || ''
  }
  return { filter, sort, page }
}

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
