export const taskService = {
  countTodos,
  countIsDone,
  getMemberById,
  getMemberInitials,
  getActivitiesByTaskId,
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
