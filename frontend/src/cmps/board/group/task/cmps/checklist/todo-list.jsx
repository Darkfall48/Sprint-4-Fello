import { useState } from 'react'
import { TodoEdit } from './todo-edit.jsx'
import { TodoPreview } from './todo-preview.jsx'

export function TodoList({ todos, onRemoveTodo, onEditTodo, onDoneTodo }) {
  const [istodoEditable, setIstodoEditable] = useState(false)

  function onCloseModal() {
    setIstodoEditable(!istodoEditable)
  }

  return (
    <ul className="task-details-main-checklist-todos-list">
      {todos.map((todo, index) => (
        <li
          className="task-details-main-checklist-todos-list-todo"
          onClick={() => setIstodoEditable(!istodoEditable)}
          key={index}
        >
          <input
            className="task-details-main-checklist-todos-list-todo-checkbox"
            defaultChecked={todo.isDone}
            type="checkbox"
            name="isDone"
            onClick={() => onDoneTodo(todo)}
          />

          <TodoPreview todo={todo} onDoneTodo={onDoneTodo} />

          <div className="task-details-main-checklist-todos-list-todo-btn-container">
            <button
              className="task-details-main-checklist-todos-list-todo-btn-container-remove-btn"
              onClick={() => {
                onRemoveTodo(todo.id)
              }}
            >
              X
            </button>
            {/* {istodoEditable && <TodoEdit onCloseModal={onCloseModal} todo={todo} onEditTodo={onEditTodo}/>} */}
          </div>
        </li>
      ))}
    </ul>
  )
}
