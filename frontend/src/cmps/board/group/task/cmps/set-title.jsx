//? Icon
import { AiOutlineEye } from 'react-icons/ai'

export function SetTitle({ type, group, task }) {
  switch (type) {
    //* Task Preview
    case 'preview':
      return (
        <article className="task-preview-title">
          <p>{task.title}</p>
        </article>
      )
      break

    default:
      //* Task Details
      return (
        <article className="task-details-section-title">
          <textarea
            className="task-details-section-title-input"
            type="text"
            name="task-title"
            id="task-title"
            defaultValue={task.title}
          />
          <div className="task-details-section-title-description">
            <h2 className="task-details-section-title-description-title">
              In the list
            </h2>
            <a className="task-details-section-title-description-link" href="#">
              {' ' + group.title}
            </a>
            <AiOutlineEye
              title="Followed"
              className="task-details-section-title-description-icon"
            />
          </div>
        </article>
      )
      break
  }
}
