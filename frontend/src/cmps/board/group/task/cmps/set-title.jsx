//? Icon
import { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs'
import { taskService } from '../../../../../services/board/task.service'
import { updateTask } from '../../../../../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { groupService } from '../../../../../services/board/group.service'
import { useNavigate } from 'react-router-dom'

export function SetTitle({ onUpdateTask,group, type, groupId, task, mode, closeMenu }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const navigate = useNavigate()


  const [updatedTask, setUpdatedTask] = useState(task)
  console.log('groupId', groupId)
  function onUpdateTitle({ value }) {
    onUpdateTask('title', value)
  }

  function onUpdatedQuickEditTitle(ev) {
    if (ev.key === 'Enter') onSubmitTask(ev)
    const { target } = ev
    let { name, value } = target
    setUpdatedTask((prevTask) => ({ ...prevTask, [name]: value }))
    console.log('updatedTask', updatedTask)
  }

  async function onSubmitTask(ev) {
    console.log('updatedTask', updatedTask)
    try {
      const group = await groupService.getGroupById(board, groupId)
      await updateTask(group, updatedTask)
      closeMenu()
    } catch (err) {
      console.log('Failed to add Task', err)
    }
  }


  switch (type) {
    //* Task Preview
    case 'preview':
      return (
        <article className="task-preview-title"
          onClick={ev => ev.stopPropagation()}
        >
          {mode !== 'quick-edit' && <p
                onClick={(ev) => {
                  ev.stopPropagation()
                  navigate(`/board/${board._id}/group/${group.id}/task/${task.id}`)
                }}
          >{task.title}</p>}
          {mode === 'quick-edit' &&
            <form onSubmit={onSubmitTask} onBlur={(ev) => onSubmitTask(ev)}>
              <input
                className='task-preview-quick-edit-title'
                type="text-area"
                name="title"
                value={updatedTask.title}
                onClick={ev => ev.stopPropagation()}
                onChange={onUpdatedQuickEditTitle}
                onKeyUp={onUpdatedQuickEditTitle}
              />
              {/* <button
                className="new-item-add-btn"
                onClick={() => onSubmitTask()}
              >  Save  </button> */}
            </form>
          }
        </article>
      )
      break

    default:
      //* Task Details
      return (
        <article
          className="task-details-title"
          onClick={(ev) => ev.stopPropagation()}
        >
          <BsReverseLayoutTextWindowReverse className="task-details-title-icon" />
          <textarea
            className="task-details-title-input"
            type="text"
            name="task-title"
            id="task-title"
            placeholder="Enter a name for the task.."
            onKeyDown={(ev) =>
              ev.key === 'Enter' ? onUpdateTitle(ev.target) : ev
            }
            defaultValue={task.title}
          // onChange={onUpdateTask}
          />

          <div className="task-details-title-description">
            <h2 className="task-details-title-description-title">
              In the list
            </h2>
            <a
              className="task-details-title-description-link"
              title={group.title}
              href="#"
            >
              {' ' + group.title}
            </a>
            {task.priority === 'high' && (
              <AiOutlineEye
                title="You are receiving notifications for updates on this card"
                className="task-details-title-description-icon"
              />
            )}
          </div>
        </article>
      )
      break
  }
}
