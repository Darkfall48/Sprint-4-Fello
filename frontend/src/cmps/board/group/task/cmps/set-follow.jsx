//? Icons
import { AiOutlineEye } from 'react-icons/ai'
import { BsCheck } from 'react-icons/bs'

export function SetFollow({ onUpdateTask, task }) {
  function onUpdateFollow(value) {
    onUpdateTask('priority', value)
  }

  function SetFollowBtn() {
    switch (task.priority) {
      case 'high':
        return (
          <button
            className="task-details-main-follow-btn"
            title="Watch to get notifications for updates on this card"
            onClick={() => {
              onUpdateFollow('low')
            }}
          >
            <AiOutlineEye /> Watch
          </button>
        )

      default:
        return (
          <button
            className="task-details-main-follow-btn followed"
            title="You are receiving notifications for updates on this card (click to stop watching)"
            onClick={() => {
              onUpdateFollow('high')
            }}
          >
            <AiOutlineEye /> <span>Watching</span>
            <div className="task-details-main-follow-btn-check">
              <BsCheck />
            </div>
          </button>
        )
    }
  }

  return (
    <article className="task-details-main-follow">
      <h2 className="task-details-main-follow-title">Notification</h2>
      <SetFollowBtn />
    </article>
  )
}
