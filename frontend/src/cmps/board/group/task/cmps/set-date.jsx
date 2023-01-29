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

  function handleCheckboxChange() {
    setIsChecked(!isChecked)
  }

  function getShowedStatus(type = 'none') {
    switch (task?.dueDateStatus) {
      case 'soon':
        if (type === 'title')
          return 'This card is due in less than twenty-four hours.'
        return 'due soon'
      case 'late':
        if (type === 'title') return 'This card is past due.'
        return 'overdue'
      case 'done':
        if (type === 'title') return 'This card is complete.'
        return 'complete'
      default:
        if (type === 'title') return 'This card is due later.'
        return
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
          title={getShowedStatus('title')}
        >
          {utilService.formatTimeForSetDate(task?.dueDate)}
          {task?.dueDateStatus && (
            <span
              className={`task-details-main-date-btn-container-status-${task.dueDateStatus.toLowerCase()}`}
            >
              {getShowedStatus()}
            </span>
          )}
        </button>
      </div>
    </article>
  )
}
