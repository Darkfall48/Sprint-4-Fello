import { utilService } from '../util.service'

export const taskService = {
  countTodos,
  countIsDone,
  getMemberById,
  getMemberInitials,
  getActivitiesByTaskId,
  getEmptyTask,
  getEmptyTodo,
  getEmptyChecklist,
  getEmptyAttachment,
  getCoverColors,
  getLabelColors,
}

function countTodos(task) {
  const { checklists } = task
  return checklists.reduce(
    (count, checklist) => count + checklist.todos.length,
    0
  )
}

function countIsDone(task) {
  let count = task.checklists
    .map((checklist) => checklist.todos)
    .flat()
    .filter((todo) => todo.isDone).length
  return count
}

function getMemberById(board, memberId) {
  return board?.members?.filter((member) => member?._id === memberId)
}

function getMemberInitials(fullname = 'John Smith') {
  const [first, ...rest] = fullname.split(' ')
  return `${first[0]}${rest.map((name) => name[0]).join(' ')}`
}

function getActivitiesByTaskId(board, taskId) {
  return board?.activities?.filter((activity) => activity?.task?.id === taskId)
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
    dueDateStatus: null,
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
