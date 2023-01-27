import { useEffect, useRef, useState } from 'react'
import { taskService } from '../../../../../../services/board/task.service'
import { updateTask } from '../../../../../../store/actions/board.actions'

export function TodoAdd({ group, task, checklist, onCloseModal }) {
  const [todoToAdd, setTodoToAdd] = useState(taskService.getEmptyTodo())
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  function handleChange({ target }) {
    let { value, name: field } = target
    setTodoToAdd((prevTodo) => {
      return { ...prevTodo, [field]: value }
    })
  }

  function onAddTodo(ev) {
    if (inputRef.current.value === '') return
    const { todos } = checklist

    if (ev._reactName === 'onSubmit') {
      ev.preventDefault()
      todos.push(todoToAdd)
      updateTask(group, task)
      inputRef.current.value = ''
      setTodoToAdd('')
    }

    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
    if (ev.key === 'Enter' || ev.type === 'blur') {
      ev.preventDefault()
      todos.push(todoToAdd)
      updateTask(group, task)
      inputRef.current.value = ''
      setTodoToAdd('')
    }

  }

  return (
    <form
      onSubmit={(ev) => onAddTodo(ev)}
      onKeyDown={(ev) => onAddTodo(ev)}
      className="task-details-main-checklist-add-todo-input"
    >
      <textarea
        name="title"
        id="title"
        cols="30"
        rows="10"
        placeholder="Add an item"
        value={todoToAdd.title}
        onChange={handleChange}
        ref={inputRef}
        // onBlur={() => onCloseModal()}
        style={{
          overflow: 'hidden',
          overflowWrap: 'break-word',
          height: '56px',
        }}
      ></textarea>

      <div className="todo-btns">
        <button className="todo-btn">Add</button>
        <button className="cancel-btn" onClick={() => onCloseModal()}>
          Cancel
        </button>
      </div>
    </form>
  )
}
