import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { updateTask } from '../../../../../../store/actions/board.actions'

export function TodoEdit({ onCloseModal, group, task, todo }) {
  const [editTodo, onEditTodo] = useState(todo)
  const [isEditOn, setIsEditOn] = useState(false)

    function handleChange({ target }) {
        let { value, name: field } = target
        onEditTodo((prevTitle) => {
            return { ...prevTitle, [field]: value }
        })
    }

  function onChangeTitle(ev) {
    if (ev._reactName === 'onSubmit') {
      ev.preventDefault()
      todo.title = editTodo.title
      updateTask(group, task)
      setIsEditOn(!isEditOn)
      onCloseModal()
    }

    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
    if (ev.key === 'Enter' || ev.type === 'blur') {
      ev.preventDefault()
      todo.title = editTodo.title
      updateTask(group, task)
      setIsEditOn(!isEditOn)
      onCloseModal()
    }
  }

  return (
    <section className="todo-edit-section">
      <form
        onSubmit={(ev) => onChangeTitle(ev)}
        onKeyDown={(ev) => onChangeTitle(ev)}
        className="task-details-main-checklist-title-input"
      >
        <textarea
          name="title"
          id="title"
          cols="30"
          rows="10"
          value={editTodo.title}
          onChange={handleChange}
          style={{
            overflow: 'hidden',
            overflowWrap: 'break-word',
            height: '56px',
            minwidth: 100 + '%',
            resize: 'none',
          }}
        ></textarea>

        <div className="todo-btns">
          <button className="todo-btn save">Save</button>
          <button className="cancel-btn" onClick={() => onCloseModal()}>
            <AiOutlineClose />
          </button>
        </div>
      </form>
    </section>
  )
}
