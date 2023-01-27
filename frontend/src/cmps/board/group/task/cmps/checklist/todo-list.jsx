import { TodoPreview } from './todo-preview.jsx'
import { AiOutlineClose } from 'react-icons/ai'

export function TodoList({ todos, onRemoveTodo, onDoneTodo, group, task }) {

  return (
    <ul className="task-details-main-checklist-todos-list">
      {todos.map((todo, index) => (
        <li
          className="task-details-main-checklist-todos-list-todo"
          key={index}
        >
          <input
            className="task-details-main-checklist-todos-list-todo-checkbox"
            defaultChecked={todo.isDone}
            type="checkbox"
            name="isDone"
            onClick={() => onDoneTodo(todo)}
          />

          <TodoPreview todo={todo} onDoneTodo={onDoneTodo} task={task} group={group} />

          <div className="task-details-main-checklist-todos-list-todo-btn-container">
           { <button
              className="task-details-main-checklist-todos-list-todo-btn-container-remove-btn"
              onClick={() => { onRemoveTodo(todo.id) }} ><AiOutlineClose /></button>}
          </div>
        </li>
      ))}
    </ul>
  )
}
