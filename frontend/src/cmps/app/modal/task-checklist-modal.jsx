import { useRef, useState } from 'react'
import { boardService } from '../../../services/board/board.service'
import { updateTask } from '../../../store/actions/board.actions'

export function TaskChecklistModal({ board, onCloseModal, group, task }) {
  const [checklistToAdd, setChecklistToAdd] = useState(
    boardService.getEmptyChecklist()
  )
  const inputRef = useRef(null)

  function handleChange({ target }) {
    let { value, name: field } = target
    setChecklistToAdd((prevTodo) => {
      return { ...prevTodo, [field]: value }
    })
  }

  function onAddChecklist(ev) {
    ev.preventDefault()
    if (inputRef.current.value === '') return

    task.checklists.push(checklistToAdd)
    updateTask(group, task)
    onCloseModal()
    inputRef.current.value = ''
  }

  return (
    <div className="task-checklist">
      <p>Title</p>
      <form onSubmit={(ev) => onAddChecklist(ev)}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Checklist"
          value={checklistToAdd.title}
          onChange={handleChange}
          ref={inputRef}
        />
      </form>
      <p>Copy items from...</p>
      <select name="copy-items-from" className="copy-items-from">
        <option value="none">(none)</option>
        {board.groups.map((group) => {
          group.tasks.map((task) => {
            return (
              <optgroup key={task.id} label={task.title}>
                {/* {task?.checklists?.map(checklist => {
                        return <option key={checklist.id} value={checklist.title}>{checklist.title}</option>
                    })} */}
              </optgroup>
            )
          })
        })}
      </select>
      <button onClick={(ev) => onAddChecklist(ev)}>Add</button>
    </div>
  )
}
