//? Icon
import { AiOutlinePlus } from 'react-icons/ai'
import { BsBrightnessAltHigh } from 'react-icons/bs'
import { Modal } from '../../../../app/modal'

export function SetLabels({
  type,
  board,
  group,
  task,
  filteredLabels,
  handleLabelClick,
  setModalOpen,
  modalOpen,
  onCloseModal,
  onEditLabels,
}) {
  const labels = board?.labels
  const { labelIds } = task

  switch (type) {
    //* Task Preview
    case 'preview-simple':
      if (!labelIds || !labelIds.length)
        return <article className="task-preview-simple-no-labels"></article>
      return (
        <article className="task-preview-simple-labels">
          {labelIds.map((labelId) => {
            const label = labels.find((label) => label.id === labelId)
            return (
              <span
                className="task-preview-simple-labels-label"
                key={label?.id}
                style={{ backgroundColor: label?.color }}
                title={label?.title ? label?.title : 'None'}
                onClick={(ev) => {
                  ev.stopPropagation()
                  handleLabelClick()
                }}
              ></span>
            )
          })}
        </article>
      )
      break

    case 'preview-detailed':
      if (!labelIds || !labelIds?.length)
        return <article className="task-preview-detailed-labels"></article>
      return (
        <article className="task-preview-detailed-labels">
          <div className="task-preview-detailed-labels-container">
            {labelIds.map((labelId, idx) => {
              const label = labels?.find((label) => label.id === labelId)
              return (
                <span
                  className="task-preview-detailed-labels-container-label"
                  key={labelId}
                  style={{ backgroundColor: label?.color + '66' }}
                  title={label?.title ? label?.title : ''}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    handleLabelClick()
                  }}
                >
                  <div
                    className="task-preview-detailed-labels-container-circle"
                    style={{ backgroundColor: label?.color }}
                    key={idx + 1}
                  ></div>
                  <span
                    className="task-preview-detailed-labels-container-title"
                    key={idx + 2}
                  >
                    {label?.title}
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
            {labelIds.map((labelId, idx) => {
              const label = labels?.find((label) => label.id === labelId)
              return (
                <span
                  className="task-details-main-labels-container-label"
                  key={labelId + idx}
                  style={{ backgroundColor: label?.color + '66' }}
                  title={label?.title ? label?.title : ''}
                >
                  <div
                    className="task-details-main-labels-container-circle"
                    style={{ backgroundColor: label?.color }}
                  ></div>
                  <span className="task-details-main-labels-container-title">
                    {label?.title}
                  </span>
                </span>
              )
            })}
            <button
              className="task-details-main-labels-add-btn"
              title="Add Label"
              onClick={() => {
                setModalOpen('labels')
              }}
            >
              <AiOutlinePlus />
            </button>
            {modalOpen === 'labels' && (
              <Modal
                type="task-labels"
                modalTitle="Labels"
                onCloseModal={onCloseModal}
                task={task}
                group={group}
                board={board}
                onEditLabels={onEditLabels}
              />
            )}
          </div>
        </article>
      )
      break
  }
}
