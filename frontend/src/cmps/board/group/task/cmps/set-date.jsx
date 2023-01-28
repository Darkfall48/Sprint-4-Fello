import { useState, useEffect } from 'react'
import { utilService } from '../../../../../services/util.service'

export function SetDate({ task, onUpdateTask }) {
  const [isChecked, setIsChecked] = useState(task?.dueDateStatus === 'done')

  useEffect(() => {
    if (isChecked) {
      onUpdateTask('dueDateStatus', 'done')
    } else {
      determineDueDateStatus()
    }
  }, [isChecked])

  function determineDueDateStatus() {
    const now = new Date()
    const soon = new Date()
    soon.setDate(now.getDate() + 7)
    const dueDate = new Date(task?.dueDate)
    if (dueDate < now) {
      onUpdateTask('dueDateStatus', 'late')
    } else if (dueDate > soon) {
      onUpdateTask('dueDateStatus', 'soon')
    }
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked)
  }

  return (
    <article className="task-details-main-date">
      <h2 className="task-details-main-date-title">Due Date</h2>
      <div className="task-details-main-date-btn-container">
        <input
          className="task-details-main-date-btn-container-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <button
          className="task-details-main-date-btn-container-date-btn"
          title={
            task?.dueDateStatus === 'done'
              ? 'Task is done'
              : task?.dueDateStatus === 'late'
              ? 'Task is late'
              : task?.dueDateStatus === 'soon'
              ? 'Task is soon'
              : 'No status'
          }
        >
          {utilService.formatTime(task?.dueDate)}
          {task?.dueDateStatus && (
            <span
              className={`task-details-main-date-btn-container-status-${task.dueDateStatus.toLowerCase()}`}
            >
              {task?.dueDateStatus}
            </span>
          )}
        </button>
      </div>
    </article>
  )
}
