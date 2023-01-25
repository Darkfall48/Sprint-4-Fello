//? Icon
import { AiOutlinePlus } from 'react-icons/ai'
import { BsBrightnessAltHigh } from 'react-icons/bs'

export function SetLabels({ type, board, task, filteredLabels }) {
  const labels = board?.labels
  const { labelIds } = task

  switch (type) {
    //* Task Preview
    case 'preview-simple':
      if (!labelIds || !labelIds.length)
        return <article className="task-preview-no-labels"></article>
      return (
        <article className="task-preview-labels">
          {labelIds.map((labelId) => {
            const label = labels.find((label) => label.id === labelId)
            return (
              <span
                className="task-preview-labels-label"
                key={label?.id}
                style={{ backgroundColor: label?.color }}
                title={label?.title ? label?.title : 'None'}
              ></span>
            )
          })}
        </article>
      )
      break

    case 'preview-detailed':
      if (!labelIds || !labelIds?.length)
        return <article className="task-details-main-labels"></article>
      return (
        <article className="task-details-main-labels">
          <h2 className="task-details-main-labels-title">Labels</h2>
          <div className="task-details-main-labels-container">
            {labelIds.map((labelId) => {
              const label = labels?.find((label) => label.id === labelId)
              return (
                <span
                  className="task-details-main-labels-container-label"
                  key={labelId}
                  style={{ backgroundColor: label?.color + '66' }}
                  title={label?.title ? label?.title : ''}
                >
                  <div
                    className="task-details-main-labels-container-circle"
                    style={{ backgroundColor: label?.color }}
                  ></div>
                  <span className="task-details-main-labels-container-title">
                    {label?.title ? label?.title : 'None'}
                  </span>
                </span>
              )
            })}
          </div>
        </article>
      )
      break

    default:
      //* Task Details
      if (!labelIds || !labelIds?.length)
        return <article className="task-details-main-labels"></article>
      return (
        <article className="task-details-main-labels">
          <h2 className="task-details-main-labels-title">Labels</h2>
          <div className="task-details-main-labels-container">
            {labelIds.map((labelId) => {
              const label = labels?.find((label) => label.id === labelId)
              return (
                <span
                  className="task-details-main-labels-container-label"
                  key={labelId}
                  style={{ backgroundColor: label?.color + '66' }}
                  title={label?.title ? label?.title : ''}
                >
                  <div
                    className="task-details-main-labels-container-circle"
                    style={{ backgroundColor: label?.color }}
                  ></div>
                  <span className="task-details-main-labels-container-title">
                    {label?.title ? label?.title : 'None'}
                  </span>
                </span>
              )
            })}
            <button
              className="task-details-main-labels-add-btn"
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
