import { useState } from 'react'
import { TodoEdit } from './todo-edit'

export function TodoPreview({ todo, task, group }) {
  const [istodoEditable, setIstodoEditable] = useState(false)

  function onCloseModal() {
    setIstodoEditable(!istodoEditable)
  }

  return (
    <section className="task-details-main-checklist-todos-list-todo-title">
      {!istodoEditable && (
        <p
          onClick={() => setIstodoEditable(!istodoEditable)}
          className={todo.isDone ? ' done' : ''}
        >
          {todo.title}
        </p>
      )}
      {istodoEditable && (
        <TodoEdit
          onCloseModal={onCloseModal}
          todo={todo}
          task={task}
          group={group}
        />
      )}
    </section>
  )
}
