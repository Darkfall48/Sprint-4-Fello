import { useState } from 'react'
import { useRef } from 'react'
import { taskService } from '../../../../../services/board/task.service'
import { utilService } from '../../../../../services/util.service'
import { Loader } from '../../../../helpers/loader'

export function SetActivities({ board, taskId }) {
  console.log('!Board', board)
  console.log('!Task', taskId)

  const [activities, setActivities] = useState(
    taskService.getActivitiesByTaskId(board, taskId)
  )

  // const member = taskService.getMemberById(board, 'u102')
  // console.log('Activities', activities)
  // console.log('Member', member)

  if (!activities || !activities.length)
    return (
      <section className="task-details-main-activities">
        <h2 className="task-details-main-activities-title">Activity</h2>
      </section>
    )
  return (
    <section className="task-details-main-activities">
      <h2 className="task-details-main-activities-title">Activity</h2>
      <section className="task-details-main-activities-container">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="task-details-main-activities-container-activity"
          >
            <div
              className="task-details-main-activities-container-activity-member-img"
              style={{
                background: activity?.getMember?.imgUrl
                  ? activity?.getMember?.imgUrl //! Not Working
                  : 'lightblue',
              }}
            >
              {!activity?.getMember?.imgUrl && (
                <span>
                  {taskService.getMemberInitials(activity?.byMember?.fullname)}
                </span>
              )}
            </div>
            <p className="task-details-main-activities-container-activity-txt-container">
              <span className="task-details-main-activities-container-activity-txt-container-member-name">
                {activity.byMember.fullname}
              </span>
              has
              <span className="task-details-main-activities-container-activity-txt-container-title">
                {activity.txt}
              </span>
              in task
              <span className="task-details-main-activities-container-activity-txt-container-task-title">
                {activity.task.title}
              </span>
            </p>
          </article>
        ))}
      </section>
    </section>
  )
}
