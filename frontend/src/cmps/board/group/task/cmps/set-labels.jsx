//? Icon
import { AiOutlinePlus } from 'react-icons/ai'

export function SetLabels({ type, board, task }) {
  const labels = board.labels
  const { labelIds } = task
  switch (type) {
    //* Task Preview
    case 'preview':
      if (!labelIds || !labelIds.length)
        return <article className="task-preview-no-labels"></article>
      return (
        <article className="task-preview-labels">
          {labelIds.map((labelId) => {
            const label = labels.find((label) => label.id === labelId)
            return (
              <span
                className="task-preview-label"
                key={label.id}
                style={{ backgroundColor: label.color }}
                title={label.title ? label.title : 'None'}
              ></span>
            )
          })}
        </article>
      )
      break

    default:
      //* Task Details
      if (!labelIds || !labelIds.length)
        return <article className="task-details-section-labels"></article>
      return (
        <article className="task-details-section-labels">
          <h2 className="task-details-section-labels-title">Labels</h2>
          <div className="task-details-section-labels-container">
            {labelIds.map((labelId) => {
              const label = labels.find((label) => label.id === labelId)
              return (
                <span
                  className="task-details-section-labels-container-label"
                  key={label.id}
                  style={{ backgroundColor: label.color + '66' }}
                  title={label.title ? label.title : ''}
                >
                  <div
                    className="task-details-section-labels-container-circle"
                    style={{ backgroundColor: label.color }}
                  ></div>
                  <span className="task-details-section-labels-container-title">
                    {label.title ? label.title : 'None'}
                  </span>
                </span>
              )
            })}
            <button
              className="task-details-section-labels-add-btn"
              title="Add Label"
            >
              <AiOutlinePlus />
            </button>
          </div>
        </article>
      )
      break
  }
}
