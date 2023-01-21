export const taskService = {
  countTodos,
  countIsDone,
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
