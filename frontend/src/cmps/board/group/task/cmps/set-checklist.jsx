import { useRef, useState } from 'react'
import { BsCheck2Square } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { updateTask } from '../../../../../store/actions/board.actions'
import { TodoAdd } from './checklist/todo-add'
import { TodoList } from './checklist/todo-list'

export function SetChecklist({ task, checklist, group }) {
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditOn, setIsEditOn] = useState(false)
  const [editChecklist, onEditChecklist] = useState(checklist)

  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  function onRemoveTodo(todoId) {
    const { todos } = checklist
    const idx = todos.findIndex((todo) => todo.id === todoId)
    todos.splice(idx, 1)

    updateTask(group, task)
  }

  function onDoneTodo(todo) {
    todo.isDone = !todo.isDone
    updateTask(group, task)
  }

  function getUserProgress() {
    const { todos } = checklist
    if (!todos.length) return 0
    if (todos.length) {
      let doneTodos = todos.filter((todo) => todo.isDone === true)
      let toPrecentage = Math.ceil((doneTodos.length / todos.length) * 100)
      return toPrecentage
    }
  }

  function handleChange({ target }) {
    let { value, name: field } = target
    onEditChecklist((prevTitle) => {
      return { ...prevTitle, [field]: value }
    })
  }

  function onChangeTitle(ev) {
    if (ev._reactName === 'onSubmit') {
      ev.preventDefault()
      checklist.title = editChecklist.title
      updateTask(group, task)
      setIsEditOn(!isEditOn)
    }

    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
    if (ev.key === 'Enter' || ev.type === 'blur') {
      ev.preventDefault()
      checklist.title = editChecklist.title
      updateTask(group, task)
      setIsEditOn(!isEditOn)
    }
  }

  function onRemoveChecklist(checklistId) {
    const { checklists } = task
    const idx = checklists.findIndex(
      (checklist) => checklist.id === checklistId
    )
    checklists.splice(idx, 1)
    updateTask(group, task)
  }

  return (
    <section className="task-details-main-checklist">
      <div className="task-details-main-checklist-header">
        <BsCheck2Square className="task-details-main-checklist-header-icon" />
        {!isEditOn && (
          <div className="task-details-main-checklist-header-container">
            <h3
              ref={contentRef}
              onClick={() => setIsEditOn(!isEditOn)}
              className="task-details-main-checklist-header-container-title"
            >
              {checklist.title}
            </h3>
            <button
              className="task-details-main-checklist-header-container-remove-btn"
              onClick={() => onRemoveChecklist(checklist.id)}
            >
              Delete
            </button>
          </div>
        )}

        {isEditOn && (
          <form
            onSubmit={(ev) => onChangeTitle(ev)}
            onKeyDown={(ev) => onChangeTitle(ev)}
            className="task-details-main-checklist-header-input"
          >
            <textarea
              className="task-details-main-checklist-header-input-title"
              name="title"
              id="title"
              cols="30"
              rows="10"
              placeholder={checklist.title}
              value={editChecklist.title}
              onChange={handleChange}
            ></textarea>

            <div className="task-details-main-checklist-header-input-btn-container">
              <button className="task-details-main-checklist-header-input-btn-container-save-btn">
                Save
              </button>
              <a
                className="task-details-main-checklist-header-input-btn-container-cancel-btn"
                onClick={() => setIsEditOn(!isEditOn)}
              >
                <AiOutlineClose />
              </a>
            </div>
          </form>
        )}
      </div>

      <div className="task-details-main-checklist-progress-bar">
        <span className="task-details-main-checklist-progress-bar-percentage">
          {getUserProgress() + '%'}
        </span>
        <div className="task-details-main-checklist-progress-bar-advancement">
          <div
            className="task-details-main-checklist-progress-bar-advancement-transition"
            style={{
              height: 'inherit',
              width: getUserProgress() + '%',
              background: getUserProgress() === 100 ? '#61bd4f' : '#5ba4cf',
            }}
          ></div>
        </div>
      </div>

      <TodoList
        todos={checklist.todos}
        onRemoveTodo={onRemoveTodo}
        onDoneTodo={onDoneTodo}
        task={task}
        group={group}
      />

      {!isModalOpen && (
        <button
          className="task-details-main-checklist-add-todo-btn"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Add an item
        </button>
      )}

      {isModalOpen && (
        <TodoAdd
          task={task}
          group={group}
          checklist={checklist}
          onCloseModal={onCloseModal}
        />
      )}
    </section>
  )
}
