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
            placeholder="Enter a title"
            onKeyDown={(ev) => (ev.key === 'Enter' ? ev.preventDefault() : ev)}
            defaultValue={task.title}
          />
          <div className="task-details-section-title-description">
            <h2 className="task-details-section-title-description-title">
              In the list
            </h2>
            <a
              className="task-details-section-title-description-link"
              title={group.title}
              href="#"
            >
              {' ' + group.title}
            </a>
            {task.priority === 'high' && (
              <AiOutlineEye
                title="Followed"
                className="task-details-section-title-description-icon"
              />
            )}
          </div>
        </article>
      )
      break
  }
}
