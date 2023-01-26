import { useState } from 'react'
import { TodoEdit } from './todo-edit.jsx'
import { TodoPreview } from './todo-preview.jsx'
import { AiOutlineClose } from 'react-icons/ai'

export function TodoList({ todos, onRemoveTodo, onEditTodo, onDoneTodo, group, checklist, task }) {
  const [istodoEditable, setIstodoEditable] = useState(false)

  function onCloseModal() {
    setIstodoEditable(!istodoEditable)
  }

  return (
    <ul className="task-details-main-checklist-todos-list">
      {todos.map((todo, index) => (
        <li
          className="task-details-main-checklist-todos-list-todo"
          // onClick={() => setIstodoEditable(!istodoEditable)}
          key={index}
        >
          <input
            className="task-details-main-checklist-todos-list-todo-checkbox"
            defaultChecked={todo.isDone}
            type="checkbox"
            name="isDone"
            onClick={() => onDoneTodo(todo)}
          />

          <section className="task-details-main-checklist-todos-list-todo-title"  onClick={() => setIstodoEditable(!istodoEditable)}>
            <p className={todo.isDone ? ' done' : ''}>{todo.title}</p>
          </section>

          {/* <TodoPreview todo={todo} onDoneTodo={onDoneTodo} /> */}

          <div className="task-details-main-checklist-todos-list-todo-btn-container">
            <button
              className="task-details-main-checklist-todos-list-todo-btn-container-remove-btn"
              onClick={() => { onRemoveTodo(todo.id) }} ><AiOutlineClose /></button>
            {/* {istodoEditable && <TodoEdit onCloseModal={onCloseModal} todo={todo} onEditTodo={onEditTodo} task={task} group={group} todoId={todo.id} />} */}
          </div>
        </li>
      ))}
    </ul>
  )
}
