import { useState, useEffect } from 'react'
import { taskService } from '../../../../../services/board/task.service'
import { utilService } from '../../../../../services/util.service'

export function SetDate({ task, onUpdateTask }) {
  const [isChecked, setIsChecked] = useState(task?.dueDateStatus === 'done')

  useEffect(() => {
    if (isChecked) {
      onUpdateTask('dueDateStatus', 'done')
    } else {
      determineDueDateStatus()
    }
  }, [isChecked, task?.dueDate])

  function handleCheckboxChange() {
    setIsChecked(!isChecked)
  }

  function determineDueDateStatus() {
    const now = new Date()
    const dueDate = new Date(task?.dueDate)
    const difference = dueDate - now
    const hoursDifference = difference / 1000 / 60 / 60
    if (dueDate < now) {
      onUpdateTask('dueDateStatus', 'late')
    } else if (hoursDifference < 24) {
      onUpdateTask('dueDateStatus', 'soon')
    } else {
      onUpdateTask('dueDateStatus', 'later')
    }
  }

  return (
    <article className="task-details-main-date">
      <h2 className="task-details-main-date-title">Due date</h2>
      <div className="task-details-main-date-btn-container">
        <input
          className="task-details-main-date-btn-container-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <button
          className="task-details-main-date-btn-container-date-btn"
          title={taskService.setShowedDueDateStatus('title', task)}
        >
          {utilService.formatTimeForSetDate(task?.dueDate)}
          {task?.dueDateStatus && (
            <span
              className={`task-details-main-date-btn-container-status-${task?.dueDateStatus.toLowerCase()}`}
            >
              {taskService.setShowedDueDateStatus('', task)}
            </span>
          )}
        </button>
      </div>
    </article>
  )
}
