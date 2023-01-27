//? Icons
import { useState } from 'react'
import { GrTextAlignFull } from 'react-icons/gr'

export function SetDescription({ onUpdateTask, task }) {
  const { description } = task
  const [isDescription, setIsDescription] = useState(
    !(!description || description === '\n')
  )

  // console.log('Description:', description)
  // console.log('Is Description ?', isDescription)

  function onUpdateDescription(target) {
    onUpdateTask('description', target)
    if (!target.value || !target.value?.length) setIsDescription(false)
  }

  //? Private Components
  function DescriptionInputArea() {
    return (
      <textarea
        className="task-details-main-description-input"
        type="text"
        name="task-description"
        id="task-description"
        placeholder="Add a more detailed description.."
        defaultValue={description}
        onKeyDown={(ev) =>
          ev.key === 'Enter' ? onUpdateDescription(ev.target) : ev
        }
        onBlur={(ev) => onUpdateDescription(ev.target)}
      />
    )
  }

  switch (isDescription) {
    case true:
      return (
        <section className="task-details-main-description">
          <GrTextAlignFull className="task-details-main-description-icon" />
          <h2 className="task-details-main-description-title">Description</h2>
          <DescriptionInputArea />
        </section>
      )

    default:
      return (
        <section className="task-details-main-description">
          <GrTextAlignFull className="task-details-main-description-icon" />
          <h2 className="task-details-main-description-title">Description</h2>
          <div
            onClick={() => setIsDescription(true)}
            className="task-details-main-description-no-description-btn"
          >
            Add a more detailed description
          </div>
        </section>
      )
  }
}
